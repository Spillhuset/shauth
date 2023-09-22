import handleAuthentication from "./handlers/handleAuthentication";
import handleDebug from "./handlers/handleDebug";
import handleLinkedRoles from "./handlers/handleLinkedRoles";
import handleInit from "./handlers/init";
import logResponse from "./utils/logResponse";

addEventListener("fetch", event => {
  // test environment
  try {
    /* eslint-disable @typescript-eslint/no-unused-expressions */
    DISCORD_ID;
    DISCORD_PUBLIC_KEY;
    DISCORD_SECRET;
    DISCORD_TOKEN;
    DISCORD_OAUTH_REDIRECT_URI;
    DISCORD_GUILD_ID;
    ROLE_CREW;
    ROLE_KEY;
    ROLE_ADVISER;
    ROLE_LEADER;
    ROLE_EVENT_MEMBER;
    ROLE_EVENT_LEADER;
    ROLE_PR_MEMBER;
    ROLE_PR_LEADER;
    ROLE_STREAMING_MEMBER;
    ROLE_STREAMING_LEADER;
    ROLE_HR;
    ROLE_SYSTEMS;
    ROLE_BOARD_MEMBER;
    ROLE_BOARD_LEADER;
    SYSTEM_SHINFO_KEY;
    SYSTEM_SHQUEUE_KEY;
    /* eslint-enable @typescript-eslint/no-unused-expressions */
  } catch (err) {
    return event.respondWith(logResponse(new Response("Invalid environment variables", { status: 500 })));
  }

  const { method } = event.request;
  const url = new URL(event.request.url);

  // owner triggers
  if (method === "GET" && url.pathname === "/init") return event.respondWith(handleInit().then(logResponse));

  // public
  if (url.pathname === "/") return event.respondWith(handleAuthentication(event.request).then(logResponse));
  if (url.pathname === "/discord-callback/linked-role") return event.respondWith(handleLinkedRoles());
  if (url.pathname === "/debug") return event.respondWith(handleDebug(event.request));
});
