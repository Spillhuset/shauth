import type { System } from ".";

export default {
  name: "localhost",
  callbackUri: "http://localhost:1337/auth",
  encryptionKey: "localhost",
} satisfies System;
