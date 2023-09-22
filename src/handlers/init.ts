import { RouteBases, Routes } from "discord-api-types/v10";
import roleMetadata from "../data/roleMetadata";

export default async function handleInit(): Promise<Response> {
  const response = await fetch(RouteBases.api + Routes.applicationRoleConnectionMetadata(DISCORD_ID), {
    method: "PUT",
    body: JSON.stringify(roleMetadata),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bot ${DISCORD_TOKEN}`,
    },
  });

  if (response.ok) return new Response("Initialized", { status: 200 });
  return new Response("Failed to initialize", { status: 500 });
}
