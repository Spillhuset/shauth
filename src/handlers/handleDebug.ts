import { decode } from "@tsndr/cloudflare-worker-jwt";

export default function handleDebug(request: FetchEvent["request"]): Response {
  const url = new URL(request.url);
  const token = url.searchParams.get("shauth");
  if (!token) return new Response("Invalid token", { status: 400 });

  const data = decode(token);
  return Response.json(data);
}
