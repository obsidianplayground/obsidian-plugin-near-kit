import { Plugin } from "obsidian";
// commands
import { command_network_toggle } from "./commands/network_toggle";
import { command_sign_in } from "./commands/sign_in";
import { command_near_view } from "./commands/view";
import { command_near_call } from "./commands/call";
import { command_sign_out } from "./commands/sign_out";
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
		//
		// sign_out
		this.addCommand({
			id: "sign_out",
			name: "SIGN OUT",
			callback: () => {
				command_sign_out();
			},
		});
		//
		// view
		this.addCommand({
			id: "view",
			name: "VIEW METHOD",
			callback: () => {
				command_near_view(this.app);
			},
		});
		//
		// call
		this.addCommand({
			id: "call",
			name: "CALL METHOD",
			callback: () => {
				command_near_call(this.app);
			},
		});
	} // onload closing
} // NEAR_PLUGIN closing
