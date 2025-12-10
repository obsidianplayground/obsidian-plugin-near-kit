import { Plugin } from "obsidian";
// commands
import { command_network_toggle } from "./commands/network_toggle";
import { command_sign_in } from "./commands/requestSignIn";
// ===============================================
// ================= NEAR_KIT_PLUGIN =================
export default class NEAR_KIT_PLUGIN extends Plugin {
	// onload
	async onload() {
		//
		// network_toggle
		this.addCommand({
			id: "network_toggle",
			name: "TOGGLE NETWORK (mainnet/testnet)",
			callback: () => {
				command_network_toggle();
			},
		});
		//
		// sign_in
		this.addCommand({
			id: "sign_in",
			name: "SIGN IN",
			callback: () => {
				command_sign_in();
			},
		});
	} // onload closing
} // NEAR_PLUGIN closing
