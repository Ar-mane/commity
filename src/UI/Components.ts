import { ExtensionContext, StatusBarAlignment, window } from "vscode";
import { COMMITY_MAIN_CMD } from "../extension";

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
