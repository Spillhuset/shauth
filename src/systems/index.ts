import debug from "./debug";
import shinfo from "./shinfo";
import shqueue from "./shqueue";

export interface System {
  name: string;
  callbackUri: string;
  encryptionKey: string;
}

export default { debug, shinfo, shqueue } satisfies Record<string, System>;
