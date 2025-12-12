// src/commands/sign_out.ts
import {
  NETWORK_STORAGE_KEY_CONST,
  TESTNET_ACCOUNT_ID_STORAGE_KEY_CONST,
  TESTNET_PRIVATE_KEY_STORAGE_KEY_CONST,
  MAINNET_ACCOUNT_ID_STORAGE_KEY_CONST,
  MAINNET_PRIVATE_KEY_STORAGE_KEY_CONST
} from "../near-kit/new";

//
// =================================================================
// ======================== command_sign_out ========================
export const command_sign_out = () => {
  // Clear all NEAR configuration from localStorage
  localStorage.removeItem(NETWORK_STORAGE_KEY_CONST);
  localStorage.removeItem(TESTNET_ACCOUNT_ID_STORAGE_KEY_CONST);
  localStorage.removeItem(TESTNET_PRIVATE_KEY_STORAGE_KEY_CONST);
  localStorage.removeItem(MAINNET_ACCOUNT_ID_STORAGE_KEY_CONST);
  localStorage.removeItem(MAINNET_PRIVATE_KEY_STORAGE_KEY_CONST);

  console.log("NEAR configuration cleared from localStorage");
};
// ========================================================================