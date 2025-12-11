// src/commands/view.ts
import { App, MarkdownView, Notice } from "obsidian";
import { nearClient } from "src/near-kit/new";
//
// =================================================================

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
	// const
	const contractId = fileCache.frontmatter.contractId;
	const methodName = fileCache.frontmatter.methodName;
	const args = fileCache.frontmatter.args;
	const editor = app.workspace.getActiveViewOfType(MarkdownView)?.editor;
	if (editor) {
		if (contractId) {
			if (methodName) {
				const near_view_const = await nearClient().view(
					contractId,
					methodName,
				);
				console.log("========= NEAR KIT: VIEW METHOD =========");
				console.log("=========================================");
				console.log(near_view_const);
				console.log("=========================================");
				// Add timestamp and wrap result in code block, handling undefined case
				const timestamp = new Date().toISOString();
				const resultString = near_view_const !== undefined ? `#### ${timestamp}\n\`\`\`json\n${JSON.stringify(near_view_const, null, 2)}\n\`\`\`` : `#### ${timestamp}\nNo data returned`;
				const endPosition = { line: editor.lineCount(), ch: 0 };
				editor.replaceRange("\n" + resultString, endPosition);
			} else {
				new Notice("No methodName found");
			}
		} else {
			new Notice("No contractId found");
		}
	} else {
		new Notice("No active editor found");
	}
};
// ========================================================================
