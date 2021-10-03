import { commands, ExtensionContext } from "vscode";
import { commity } from "./commands/MainCommand";
import { COMMITY_MAIN_CMD } from "./constants/Constants";
import { initExtension } from "./ui/Components";

export function activate(context: ExtensionContext) {
  initExtension(context);
  commands.registerCommand(COMMITY_MAIN_CMD, () => commity(context));
}

export function deactivate() {
  // not implemented Yet ,
  // Maybe no need for this
}
