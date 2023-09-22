/* eslint-disable camelcase */
import type { APIApplicationRoleConnectionMetadata } from "discord-api-types/v10";
import { ApplicationRoleConnectionMetadataType } from "discord-api-types/v10";
import systems from "../systems";

export default [
  ...Object.keys(systems).map(system => ({
    type: ApplicationRoleConnectionMetadataType.DatetimeGreaterThanOrEqual,
    name: systems[system as keyof typeof systems].name,
    key: system,
    description: `The last time this user logged in to the ${systems[system as keyof typeof systems].name} system`,
  })),
] satisfies APIApplicationRoleConnectionMetadata[];
