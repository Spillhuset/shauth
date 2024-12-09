import debug from "./debug";
import localhost from "./localhost";
import shinfo from "./shinfo";
import shqueue from "./shqueue";

export interface System {
  callbackUri: string;
  encryptionKey: string;
  name: string;
}

export default { debug, localhost, shinfo, shqueue } satisfies Record<string, System>;
