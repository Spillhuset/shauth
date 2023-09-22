/* eslint-disable camelcase */
import type { APIGuildMember, APIUser, RESTGetAPICurrentUserApplicationRoleConnectionResult, RESTGetAPIGuildMemberResult, RESTGetAPIOAuth2CurrentAuthorizationResult, Snowflake } from "discord-api-types/v10";
import { OAuth2Routes, OAuth2Scopes, RouteBases, Routes } from "discord-api-types/v10";
import type systems from "../systems";

export function getOAuthUrl(system?: keyof typeof systems): string {
  const url = new URL(OAuth2Routes.authorizationURL);
  url.searchParams.set("client_id", DISCORD_ID);
  url.searchParams.set("redirect_uri", DISCORD_OAUTH_REDIRECT_URI);
  url.searchParams.set("response_type", "code");
  if (system) url.searchParams.set("state", system);
  url.searchParams.set("scope", [
    OAuth2Scopes.Identify,
    OAuth2Scopes.RoleConnectionsWrite,
  ].join(" "));
  url.searchParams.set("prompt", "none");
  return url.toString();
}

export async function getOAuthAccessToken(code: string): Promise<string> {
  const response = await fetch(OAuth2Routes.tokenURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: DISCORD_ID,
      client_secret: DISCORD_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: DISCORD_OAUTH_REDIRECT_URI,
      scope: [
        OAuth2Scopes.Identify,
        OAuth2Scopes.RoleConnectionsWrite,
      ].join(" "),
    }),
  });

  if (!response.ok) throw new Error("Invalid response");

  const { access_token } = await response.json<{ access_token: string }>();
  return access_token;
}

export async function getUserData(accessToken: string): Promise<APIUser> {
  const response = await fetch(RouteBases.api + Routes.oauth2CurrentAuthorization(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error("Invalid response");

  const { user } = await response.json<RESTGetAPIOAuth2CurrentAuthorizationResult>();

  return user!;
}

export async function getMemberData(userId: Snowflake): Promise<APIGuildMember> {
  const response = await fetch(RouteBases.api + Routes.guildMember(DISCORD_GUILD_ID, userId), {
    headers: {
      Authorization: `Bot ${DISCORD_TOKEN}`,
    },
  });

  if (!response.ok) throw new Error("Invalid response");

  return response.json<RESTGetAPIGuildMemberResult>();
}

export async function updateMetadata(accessToken: string, userFlags: number, system: keyof typeof systems): Promise<void> {
  const dateInNorwegianTime = new Date();
  dateInNorwegianTime.setHours(dateInNorwegianTime.getHours() + 2);

  const year = dateInNorwegianTime.getFullYear();
  const month = dateInNorwegianTime.getMonth() + 1;
  const day = dateInNorwegianTime.getDate();

  const getResponse = await fetch(RouteBases.api + Routes.userApplicationRoleConnection(DISCORD_ID), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  let previousMetadata = {};
  if (getResponse.ok) {
    const { metadata } = await getResponse.json<RESTGetAPICurrentUserApplicationRoleConnectionResult>();
    previousMetadata = metadata;
  }

  const response = await fetch(RouteBases.api + Routes.userApplicationRoleConnection(DISCORD_ID), {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      platform_name: "Spillhuset Authentication",
      platform_username: `🏳️ ${userFlags} • last logins:`,
      metadata: {
        ...previousMetadata,
        [system]: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      },
    }),
  });

  if (!response.ok) throw new Error("Invalid response");
}
