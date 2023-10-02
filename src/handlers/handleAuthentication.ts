import { sign } from "@tsndr/cloudflare-worker-jwt";
import systems from "../systems";
import { getMemberData, getOAuthAccessToken, getOAuthUrl, getUserData, updateMetadata } from "../utils/discord";
import { getUserFlags } from "../utils/userFlags";

export default async function handleAuthentication(request: FetchEvent["request"]): Promise<Response> {
  const url = new URL(request.url);
  const system = url.searchParams.get("state") as keyof typeof systems;
  if (!Object.keys(systems).includes(system)) return new Response("Invalid system", { status: 400 });

  const code = url.searchParams.get("code");
  if (!code) return Response.redirect(getOAuthUrl(system));

  const accessToken = await getOAuthAccessToken(code);
  const user = await getUserData(accessToken);
  const member = await getMemberData(user.id).catch(() => null);
  if (!member) return new Response("Invalid user (not crew member)", { status: 401 });

  const userFlags = getUserFlags(member.roles);

  await updateMetadata(accessToken, userFlags, system);

  const redirectUrl = new URL(systems[system].callbackUri);
  redirectUrl.searchParams.set("shauth", await sign({
    exp: Date.now() + 1000 * 60,
    id: user.id,
    name: member.nick ?? user.global_name ?? user.username,
    userFlags,
  }, systems[system].encryptionKey));
  return Response.redirect(redirectUrl.toString(), 302);
}
