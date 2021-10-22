import { ExtensionContext, window } from "vscode";
import { CommitMessage, Config } from "../config/types";
import {
  getProperConfig,
  getScopePickItems,
  getTypesPickItems,
} from "../utility/utility";

export const commity = async (context: ExtensionContext) => {
  //  central  var
  const commitMessage: CommitMessage = {};
  const config = await getProperConfig();
  await step1(commitMessage, config);
};

const step1 = async (
  commitMessage: CommitMessage,
  config: Config
): Promise<boolean> => {
  const scopesOptions = getScopePickItems(config);
  const typesOptions = getTypesPickItems(config);

  const quickPick = window.createQuickPick();
  quickPick.items = scopesOptions;
  quickPick.canSelectMany = false;

  quickPick.onDidAccept(() => {
    quickPick.selectedItems[0];
    commitMessage.scope =
      config.scopes[scopesOptions.indexOf(quickPick.selectedItems[0])];
    quickPick.hide();
    quickPick.dispose();
  });
  await quickPick.show();
  console.log(" mchaaaaaaaaaaaaaaaaaa ");
  return true;
};
