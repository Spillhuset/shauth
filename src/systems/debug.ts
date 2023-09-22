import type { System } from ".";

export default {
  name: "Debug",
  callbackUri: "https://shauth.but-it-actually.works/debug",
  encryptionKey: "debug",
} satisfies System;
