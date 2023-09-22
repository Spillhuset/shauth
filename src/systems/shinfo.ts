import type { System } from ".";

export default {
  name: "shinfo.but-it-actually.works",
  callbackUri: "https://shinfo.but-it-actually.works/auth",
  encryptionKey: SYSTEM_SHINFO_KEY,
} satisfies System;
