// src/commands/network_toggle.ts
import { Notice } from 'obsidian';
import { NETWORK_STORAGE_KEY_CONST } from "../near-kit/new";
// ========================================================================
// ======================== command_network_toggle ========================
export const command_network_toggle = () => {
	console.log('NETWORK TOGGLE COMMAND USED');
	let NETWORK_ID = "mainnet";
	const savedNetwork = localStorage.getItem("network_id") || "mainnet";
    NETWORK_ID = savedNetwork;
	const newNetwork = NETWORK_ID === "mainnet" ? "testnet" : "mainnet";
    NETWORK_ID = newNetwork;
    localStorage.setItem(NETWORK_STORAGE_KEY_CONST, newNetwork);
    console.info(newNetwork)
	new Notice(newNetwork);
};
// ========================================================================
