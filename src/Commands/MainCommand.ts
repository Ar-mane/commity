import { ExtensionContext, QuickPickItem, window } from "vscode";
import { config } from "../config/config";
import { Config, Scope } from "../config/types";

export const commity = (context: ExtensionContext) => {
  const quickPick = window.createQuickPick();
  quickPick.items = getItems(config);
  quickPick.show();
};

function getItems(config: Config): QuickPickItem[] {
  return config.scopes.map(
    (item: Scope) =>
      ({
        label: item.name,
        description: item.description,
      } as QuickPickItem)
  );
}
