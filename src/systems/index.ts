import debug from "./debug";
import localhost from "./localhost";
import shinfo from "./shinfo";
import shqueue from "./shqueue";

export interface System {
  name: string;
  callbackUri: string;
  encryptionKey: string;
}

export default { debug, localhost, shinfo, shqueue } satisfies Record<string, System>;
