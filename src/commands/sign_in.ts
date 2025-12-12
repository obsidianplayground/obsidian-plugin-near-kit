// src/commands/sign_in.ts
import { App } from "obsidian";
import { SignInScreenModal } from "../modals/sign_in_screen";

//
// =================================================================
// ======================== command_sign_in ========================
export const command_sign_in = (app: App) => {
  new SignInScreenModal(app, () => {
    // Callback function when sign in is complete
    console.log("Configuration saved successfully");
  }).open();
};
// ========================================================================