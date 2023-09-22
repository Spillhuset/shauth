import type { Snowflake } from "discord-api-types/globals";


/* eslint-disable no-bitwise */
export enum UserFlags {
  Crew = 1 << 0,
  Key = 1 << 1,
  Adviser = 1 << 2,
  Leader = 1 << 3,
  EventMember = 1 << 4,
  EventLeader = 1 << 5,
  PRMember = 1 << 6,
  PRLeader = 1 << 7,
  StreamingMember = 1 << 8,
  StreamingLeader = 1 << 9,
  HR = 1 << 10,
  Systems = 1 << 11,
  BoardMember = 1 << 12,
  BoardLeader = 1 << 13,
}

export function getUserFlags(roles: Snowflake[]): number {
  let flags = 0;
  if (roles.includes(ROLE_CREW)) flags |= UserFlags.Crew;
  if (roles.includes(ROLE_KEY)) flags |= UserFlags.Key;
  if (roles.includes(ROLE_ADVISER)) flags |= UserFlags.Adviser;
  if (roles.includes(ROLE_LEADER)) flags |= UserFlags.Leader;
  if (roles.includes(ROLE_EVENT_MEMBER)) flags |= UserFlags.EventMember;
  if (roles.includes(ROLE_EVENT_LEADER)) flags |= UserFlags.EventLeader;
  if (roles.includes(ROLE_PR_MEMBER)) flags |= UserFlags.PRMember;
  if (roles.includes(ROLE_PR_LEADER)) flags |= UserFlags.PRLeader;
  if (roles.includes(ROLE_STREAMING_MEMBER)) flags |= UserFlags.StreamingMember;
  if (roles.includes(ROLE_STREAMING_LEADER)) flags |= UserFlags.StreamingLeader;
  if (roles.includes(ROLE_HR)) flags |= UserFlags.HR;
  if (roles.includes(ROLE_SYSTEMS)) flags |= UserFlags.Systems;
  if (roles.includes(ROLE_BOARD_MEMBER)) flags |= UserFlags.BoardMember;
  if (roles.includes(ROLE_BOARD_LEADER)) flags |= UserFlags.BoardLeader;
  return flags;
}
