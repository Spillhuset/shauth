import type { System } from ".";

export default {
  name: "Debug",
  callbackUri: "https://oauth.spillhuset.app/debug",
  encryptionKey: "debug",
} satisfies System;
