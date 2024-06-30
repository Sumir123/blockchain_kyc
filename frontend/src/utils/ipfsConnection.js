import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { THIRD_WORLD_CLIENT_ID } from "./constants";

export function makeStorageClient() {
  return new ThirdwebStorage({
    clientId: `${THIRD_WORLD_CLIENT_ID}`,
  });
}
