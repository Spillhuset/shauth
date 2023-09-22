import { getOAuthUrl } from "../utils/discord";

export default function handleLinkedRoles(): Response {
  return Response.redirect(getOAuthUrl());
}
