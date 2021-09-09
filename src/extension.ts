import { commands, ExtensionContext } from "vscode";
import { commity } from "./Commands/MainCommand";
import { initExtension } from "./UI/Components";

export const COMMITY_MAIN_CMD = "armane-commity.commity";

export function activate(context: ExtensionContext) {
    initExtension(context);
  commands.registerCommand(COMMITY_MAIN_CMD, () => commity(context));
}

export function deactivate() {
  // not implemented Yet ,
  // Maybe no need for this
}
