// src/commands/call.ts
import { App, MarkdownView, Notice } from "obsidian";
import { nearClient } from "src/near-kit/new";
import { extractNearContractData, validateNearContractData, ArgsType } from "src/near-kit/frontmatter_utils";

// =================================================================
// ======================== command_near_call ========================
export const command_near_call = async (app: App) => {
	const activeFile = app.workspace.getActiveFile();
	if (!activeFile) {
		new Notice("No active file found");
		return;
	}

	const fileCache = app.metadataCache.getFileCache(activeFile);
	if (!fileCache || !fileCache.frontmatter) {
		const editor = app.workspace.getActiveViewOfType(MarkdownView)?.editor;
		if (editor) {
			const currentPosition = editor.getCursor();
			editor.replaceRange("TX data not fount\n", currentPosition);
		}
		new Notice("No frontmatter found in current file");
		return;
	}

	const editor = app.workspace.getActiveViewOfType(MarkdownView)?.editor;
	if (!editor) {
		new Notice("No active editor found");
		return;
	}

	// Extract and validate contract data from frontmatter
	let contractData;
	try {
		contractData = extractNearContractData(fileCache.frontmatter);
	} catch (error) {
		new Notice(error.message);
		return;
	}

	const validation = validateNearContractData(contractData);
	if (!validation.isValid) {
		validation.errors.forEach(error => new Notice(error));
		return;
	}

	try {
		// Call the contract method with args and options
		const near_call_result = await nearClient().call(
			contractData.contractId!,
			contractData.methodName!,
			contractData.args as ArgsType,
			contractData.options // Pass the options parameter
		);

		console.log("========= NEAR KIT: CALL METHOD =========");
		console.log(contractData.contractId);
		console.log(contractData.methodName);
		console.log(contractData.args);
		console.log("Options:", contractData.options);
		console.log("=========================================");
		console.log(near_call_result);
		console.log("=========================================");

		// Add timestamp and wrap result in code block, handling undefined case
		const timestamp = new Date().toLocaleString();
		const resultString = near_call_result !== undefined ? `#### ${timestamp}\n\`\`\`json\n${JSON.stringify(near_call_result, null, 2)}\n\`\`\`` : `#### ${timestamp}\nNo data returned`;
		const endPosition = { line: editor.lineCount(), ch: 0 };
		editor.replaceRange("\n" + resultString, endPosition);
	} catch (error) {
		console.error("Error calling NEAR contract method:", error);
		new Notice(`Error calling contract method: ${error.message}`);
	}
};
// ========================================================================