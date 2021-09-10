import { ExtensionContext, StatusBarAlignment, window } from "vscode";
import {
  COMMITY_MAIN_CMD,
  NO_CONFIG_ACTIONS_CREATE,
  NO_CONFIG_ACTIONS_DEFAULT,
  NO_CONFIG_MESSAGE,
} from "../constants/Constants";

export function createStatusBar() {
  const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
  statusBar.text = `$(heart~spin) Commity`;
  statusBar.command = COMMITY_MAIN_CMD;
  statusBar.tooltip = `Create a commit message`;
  statusBar.color = `#fff`;
  statusBar.show();

  // vscode.window.showInputBox({ title: "text", validateInput: (e) => e });
}
export function initExtension(context: ExtensionContext) {
  console.log("initalizing ...");
  createStatusBar();
}

export const showNoConfigFileExist = () => {
  window
    .showInformationMessage(
      NO_CONFIG_MESSAGE,
      ...[NO_CONFIG_ACTIONS_CREATE, NO_CONFIG_ACTIONS_DEFAULT]
    )
    .then((choice) => doSelect(choice as string));
};

const doSelect = (choice: string) => {
  switch (choice) {
    case NO_CONFIG_ACTIONS_CREATE:
      break;
    case NO_CONFIG_ACTIONS_DEFAULT:
      break;
  }
};
