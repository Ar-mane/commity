import { ExtensionContext, window } from "vscode";
import { defaultConfig } from "../config/config";
import { getProperConfig, getQuickPickItems } from "../utility/utility";

export const commity = async (context: ExtensionContext) => {
  const quickPick = window.createQuickPick();

  const customConfig = await getProperConfig();

  const data = customConfig ?? defaultConfig;
  quickPick.items = getQuickPickItems(data);
  quickPick.show();
};
