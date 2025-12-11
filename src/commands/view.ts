// src/commands/view.ts
import { App, MarkdownView, Notice } from 'obsidian';
import { nearClient } from 'src/near-kit/new';
//
// =================================================================

// =================================================================
// ======================== command_near_view ========================
export const command_near_view = async (app: App) => {
	const activeFile = app.workspace.getActiveFile();
	if (!activeFile) {
		new Notice('No active file found');
		return;
	}

	const fileCache = app.metadataCache.getFileCache(activeFile);
	if (!fileCache || !fileCache.frontmatter) {
		const editor = app.workspace.getActiveViewOfType(MarkdownView)?.editor;
		if (editor) {
			const currentPosition = editor.getCursor();
			editor.replaceRange('TX data not fount\n', currentPosition);
		}
		new Notice('No frontmatter found in current file');
		return;
	}
	// const
	const contractId = fileCache.frontmatter.contractId;
	const methodName = fileCache.frontmatter.methodName;
	const args = fileCache.frontmatter.args;
	const options = fileCache.frontmatter.options;
	const editor = app.workspace.getActiveViewOfType(MarkdownView)?.editor;
	if (editor) {
		if (contractId) {
			if (methodName) {
				const currentPosition = editor.getCursor();
				editor.replaceRange(`Hello ${name}\n`, currentPosition);
				new Notice(`Name property: ${name}`);
			}
		} else {
			const currentPosition = editor.getCursor();
			editor.replaceRange('Hello Name not found\n', currentPosition);
			new Notice('Name property not found in frontmatter');
		}
	} else {
		new Notice('No active editor found');
	}
	
};
// ========================================================================