import type { System } from ".";

export default {
  name: "kø.spillhuset.app",
  callbackUri: "https://kø.spillhuset.app/auth",
  encryptionKey: SYSTEM_SHQUEUE_KEY,
} satisfies System;
