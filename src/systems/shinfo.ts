import type { System } from ".";

export default {
  name: "infoskjerm.spillhuset.app",
  callbackUri: "https://infoskjerm.spillhuset.app/auth",
  encryptionKey: SYSTEM_SHINFO_KEY,
} satisfies System;
