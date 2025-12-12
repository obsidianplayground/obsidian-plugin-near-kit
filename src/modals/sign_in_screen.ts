import { App, Modal, Setting } from "obsidian";
import { 
  NETWORK_STORAGE_KEY_CONST,
  TESTNET_ACCOUNT_ID_STORAGE_KEY_CONST,
  TESTNET_PRIVATE_KEY_STORAGE_KEY_CONST,
  MAINNET_ACCOUNT_ID_STORAGE_KEY_CONST,
  MAINNET_PRIVATE_KEY_STORAGE_KEY_CONST
} from "../near-kit/new";

export class SignInScreenModal extends Modal {
  onSignIn: () => void;

  constructor(app: App, onSignIn: () => void) {
    super(app);
    this.onSignIn = onSignIn;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl('h2', { text: 'NEAR Account Configuration' });

    // Network selection
    new Setting(contentEl)
      .setName('Network')
      .setDesc('Select the network to use')
      .addDropdown(dropdown => 
        dropdown
          .addOption('testnet', 'Testnet')
          .addOption('mainnet', 'Mainnet')
          .setValue(localStorage.getItem(NETWORK_STORAGE_KEY_CONST) || 'testnet')
          .onChange(value => {
            localStorage.setItem(NETWORK_STORAGE_KEY_CONST, value);
          })
      );

    // Testnet Account ID
    new Setting(contentEl)
      .setName('Testnet Account ID')
      .setDesc('Enter your testnet account ID (optional)')
      .addText(text => 
        text
          .setPlaceholder('account.testnet')
          .setValue(localStorage.getItem(TESTNET_ACCOUNT_ID_STORAGE_KEY_CONST) || '')
          .onChange(value => {
            if (value.trim() !== '') {
              localStorage.setItem(TESTNET_ACCOUNT_ID_STORAGE_KEY_CONST, value.trim());
            } else {
              localStorage.removeItem(TESTNET_ACCOUNT_ID_STORAGE_KEY_CONST);
            }
          })
      );

    // Testnet Private Key
    new Setting(contentEl)
      .setName('Testnet Private Key')
      .setDesc('Enter your testnet private key (optional)')
      .addText(text => 
        text
          .setPlaceholder('ed25519:xxx')
          .setValue(localStorage.getItem(TESTNET_PRIVATE_KEY_STORAGE_KEY_CONST) || '')
          .onChange(value => {
            if (value.trim() !== '') {
              localStorage.setItem(TESTNET_PRIVATE_KEY_STORAGE_KEY_CONST, value.trim());
            } else {
              localStorage.removeItem(TESTNET_PRIVATE_KEY_STORAGE_KEY_CONST);
            }
          })
      );

    // Mainnet Account ID
    new Setting(contentEl)
      .setName('Mainnet Account ID')
      .setDesc('Enter your mainnet account ID (optional)')
      .addText(text => 
        text
          .setPlaceholder('account.near')
          .setValue(localStorage.getItem(MAINNET_ACCOUNT_ID_STORAGE_KEY_CONST) || '')
          .onChange(value => {
            if (value.trim() !== '') {
              localStorage.setItem(MAINNET_ACCOUNT_ID_STORAGE_KEY_CONST, value.trim());
            } else {
              localStorage.removeItem(MAINNET_ACCOUNT_ID_STORAGE_KEY_CONST);
            }
          })
      );

    // Mainnet Private Key
    new Setting(contentEl)
      .setName('Mainnet Private Key')
      .setDesc('Enter your mainnet private key (optional)')
      .addText(text => 
        text
          .setPlaceholder('ed25519:xxx')
          .setValue(localStorage.getItem(MAINNET_PRIVATE_KEY_STORAGE_KEY_CONST) || '')
          .onChange(value => {
            if (value.trim() !== '') {
              localStorage.setItem(MAINNET_PRIVATE_KEY_STORAGE_KEY_CONST, value.trim());
            } else {
              localStorage.removeItem(MAINNET_PRIVATE_KEY_STORAGE_KEY_CONST);
            }
          })
      );

    // Sign In button
    new Setting(contentEl)
      .addButton(button => 
        button
          .setButtonText('Save Configuration')
          .setCta()
          .onClick(() => {
            this.onSignIn();
            this.close();
          })
      );
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}