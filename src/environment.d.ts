import type { Snowflake } from "discord-api-types/globals";

// command: `wrangler secret put <variable>`

declare global {
  // general for auth
  declare const DISCORD_ID: Snowflake;
  declare const DISCORD_PUBLIC_KEY: string;
  declare const DISCORD_SECRET: string;
  declare const DISCORD_TOKEN: string;
  declare const DISCORD_OAUTH_REDIRECT_URI: string;
  declare const DISCORD_GUILD_ID: Snowflake;

  // guild roles
  declare const ROLE_CREW: Snowflake;
  declare const ROLE_KEY: Snowflake;
  declare const ROLE_ADVISER: Snowflake;
  declare const ROLE_LEADER: Snowflake;
  declare const ROLE_EVENT_MEMBER: Snowflake;
  declare const ROLE_EVENT_LEADER: Snowflake;
  declare const ROLE_PR_MEMBER: Snowflake;
  declare const ROLE_PR_LEADER: Snowflake;
  declare const ROLE_STREAMING_MEMBER: Snowflake;
  declare const ROLE_STREAMING_LEADER: Snowflake;
  declare const ROLE_HR: Snowflake;
  declare const ROLE_SYSTEMS: Snowflake;
  declare const ROLE_BOARD_MEMBER: Snowflake;
  declare const ROLE_BOARD_LEADER: Snowflake;

  // system encryption keys
  declare const SYSTEM_SHINFO_KEY: string;
  declare const SYSTEM_SHQUEUE_KEY: string;
}
