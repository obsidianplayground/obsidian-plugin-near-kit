import { Near } from "near-kit"
import type { PrivateKey } from "near-kit"
//
//
export const NETWORK_STORAGE_KEY_CONST = "network_id"; // used for network toggle
// testnet
export const TESTNET_ACCOUNT_ID_STORAGE_KEY_CONST = "testnet_account_id";
export const TESTNET_PRIVATE_KEY_STORAGE_KEY_CONST = "testnet_private_key";
// mainnet
export const MAINNET_ACCOUNT_ID_STORAGE_KEY_CONST = "mainnet_account_id";
export const MAINNET_PRIVATE_KEY_STORAGE_KEY_CONST = "mainnet_private_key";
//
// MY_BACKEND_ENV
// export const MY_BACKEND_NEAR_networkId: "mainnet" | "testnet" | "localnet" | "betanet" | { rpcUrl: string; networkId: string; } = (localStorage.getItem(NETWORK_STORAGE_KEY_CONST) as "mainnet" | "testnet" | "localnet" | "betanet") || "testnet";
// testnet
export const TESTNET_MY_BACKEND_NEAR_accountId: string | undefined = localStorage.getItem(TESTNET_ACCOUNT_ID_STORAGE_KEY_CONST) || undefined;
export const TESTNET_MY_BACKEND_NEAR_privateKey: PrivateKey | undefined = localStorage.getItem(TESTNET_PRIVATE_KEY_STORAGE_KEY_CONST) as PrivateKey | undefined;
// mainnet
export const MAINNET_MY_BACKEND_NEAR_accountId: string | undefined = localStorage.getItem(MAINNET_ACCOUNT_ID_STORAGE_KEY_CONST) || undefined;
export const MAINNET_MY_BACKEND_NEAR_privateKey: PrivateKey | undefined = localStorage.getItem(MAINNET_PRIVATE_KEY_STORAGE_KEY_CONST) as PrivateKey | undefined;
//
// Multiple clients with different configurations
export const near_testnetClient = new Near({
  network: "testnet",
  privateKey: TESTNET_MY_BACKEND_NEAR_privateKey,
  defaultSignerId: TESTNET_MY_BACKEND_NEAR_accountId,
})
export const near_mainnetClient = new Near({
  network: "mainnet",
  privateKey: MAINNET_MY_BACKEND_NEAR_privateKey,
  defaultSignerId: MAINNET_MY_BACKEND_NEAR_accountId,
})
//
//
//
//
function getStoredNetworkId(): "mainnet" | "testnet" {
  const raw = localStorage.getItem(NETWORK_STORAGE_KEY_CONST);
  const value = (raw || "mainnet").trim().toLowerCase();
  return value === "testnet" ? "testnet" : "mainnet";
}
//
export function nearClient() {
  const networkId = getStoredNetworkId();
  const client =
    networkId === "testnet" ? near_testnetClient : near_mainnetClient;

  console.log("[nearClient] networkId:", networkId);
  console.log(
    "[nearClient] client:",
    networkId === "testnet" ? "near_testnetClient" : "near_mainnetClient",
  );

  return client;
}