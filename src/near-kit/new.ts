import { Near } from "near-kit"
import type { PrivateKey } from "near-kit"
//
//
export const NETWORK_STORAGE_KEY_CONST = "network_id"; // used for network toggle
export const ACCOUNT_ID_STORAGE_KEY_CONST = "account_id";
export const PRIVATE_KEY_STORAGE_KEY_CONST = "private_key";
//
// MY_BACKEND_ENV
export const MY_BACKEND_NEAR_networkId: "mainnet" | "testnet" | "localnet" | "betanet" | { rpcUrl: string; networkId: string; } = (localStorage.getItem(NETWORK_STORAGE_KEY_CONST) as "mainnet" | "testnet" | "localnet" | "betanet") || "testnet";
export const MY_BACKEND_NEAR_accountId: string | undefined = localStorage.getItem(ACCOUNT_ID_STORAGE_KEY_CONST) || undefined;
//
// Handle private key format (with or without ed25519: prefix)
export const MY_BACKEND_NEAR_privateKey: PrivateKey | undefined = localStorage.getItem(PRIVATE_KEY_STORAGE_KEY_CONST) as PrivateKey | undefined;
//
// Initialize for backend/scripts
export const near = new Near({
  network: MY_BACKEND_NEAR_networkId,
  privateKey: MY_BACKEND_NEAR_privateKey,
  defaultSignerId: MY_BACKEND_NEAR_accountId,
})