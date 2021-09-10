import { ExtensionContext, window } from "vscode";
import { config } from "../config/config";
import { showNoConfigFileExist } from "../ui/Components";
import { getCustomConfig, getQuickPickItems } from "../utility/utility";

export const commity = async (context: ExtensionContext) => {
  const quickPick = window.createQuickPick();

  const customConfig = await getCustomConfig();
  if (!customConfig) {
    showNoConfigFileExist();
  }

  const data = customConfig ?? config;
  quickPick.items = getQuickPickItems(data);
  quickPick.show();
};
