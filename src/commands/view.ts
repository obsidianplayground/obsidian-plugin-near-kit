// src/commands/view.ts
import { App, MarkdownView, Notice } from "obsidian";
import { nearClient } from "src/near-kit/new";
import { extractNearContractData, validateNearContractData, ArgsType } from "src/near-kit/frontmatter_utils";

// =================================================================
// ======================== command_near_view ========================
export const command_near_view = async (app: App) => {
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
		// Call the view method with processed args
		const near_view_const = await nearClient().view(
			contractData.contractId!,
			contractData.methodName!,
			contractData.args as ArgsType
		);

		console.log("========= NEAR KIT: VIEW METHOD =========");
		console.log(contractData.contractId);
		console.log(contractData.methodName);
		console.log(contractData.args);
		console.log("=========================================");
		console.log(near_view_const);
		console.log("=========================================");

		// Add timestamp and wrap result in code block, handling undefined case
		const timestamp = new Date().toLocaleString();
		const resultString = near_view_const !== undefined ? `#### ${timestamp}\n\`\`\`json\n${JSON.stringify(near_view_const, null, 2)}\n\`\`\`` : `#### ${timestamp}\nNo data returned`;
		const endPosition = { line: editor.lineCount(), ch: 0 };
		editor.replaceRange("\n" + resultString, endPosition);
	} catch (error) {
		console.error("Error calling NEAR view method:", error);
		new Notice(`Error calling view method: ${error.message}`);
	}
};
// ========================================================================
