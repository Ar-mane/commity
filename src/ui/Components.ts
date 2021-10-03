import {
  ConfigurationTarget,
  ExtensionContext,
  StatusBarAlignment,
  Uri,
  window,
  workspace,
} from "vscode";
import { defaultConfig } from "../config/config";
import {
  COMMITY_MAIN_CMD,
  CONFIG_FOUND_MESSAGE,
  CONFIG_PROJECTS,
  LOG_INITIALIZING_COMMITY,
  NO_CONFIG_ACTIONS_CREATE,
  NO_CONFIG_ACTIONS_DEFAULT,
  NO_CONFIG_FOUND_MESSAGE,
} from "../constants/Constants";
import { log } from "../utility/logger";
import { getProjects, getCurrentProjectPath } from "../utility/utility";

// TODO : optimise statusbar ( icon and functionality )
export function createStatusBar() {
  const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
  statusBar.text = `$(heart~spin) Commity`;
  statusBar.command = COMMITY_MAIN_CMD;
  statusBar.tooltip = `Create a commit message`;
  statusBar.color = `#fff`;
  statusBar.show();
  // TODO : delete this on finish
  // vscode.window.showInputBox({ title: "text", validateInput: (e) => e });
}
export function initExtension(context: ExtensionContext) {
  log(LOG_INITIALIZING_COMMITY);
  createStatusBar();
}

export const showNoConfigFileExistPrompt = async (uri: Uri) => {
  const choice = await window.showInformationMessage(
    NO_CONFIG_FOUND_MESSAGE,
    ...[NO_CONFIG_ACTIONS_CREATE, NO_CONFIG_ACTIONS_DEFAULT]
  );

  doSelect(uri, choice as string);
  return defaultConfig;
};

export const showUsingDefaultSettingDialog = () => {
  window.showInformationMessage(CONFIG_FOUND_MESSAGE);
};

//  ---- local functions //
const doSelect = (uri: Uri, choice: string) => {
  switch (choice) {
    case NO_CONFIG_ACTIONS_CREATE:
      cloneDefaultConfigToWorkspace(uri);
      break;
    case NO_CONFIG_ACTIONS_DEFAULT:
      useDefaultConfigInstead();
      showUsingDefaultSettingDialog();
      break;
    default:
      log("no choice ");
  }
};
const cloneDefaultConfigToWorkspace = (uri: Uri) => {
  try {
    const json = JSON.stringify(defaultConfig, null, 3);
    workspace.fs.writeFile(uri, Buffer.from(json));
  } catch (e) {
    log(e);
  }
};
const useDefaultConfigInstead = async (): Promise<void> => {
  const configuration = workspace.getConfiguration();
  const projects = getProjects();
  const currentProjectName = getCurrentProjectPath();
  const currentProject = projects.findIndex((p) => p.id === currentProjectName);

  if (currentProject >= 0) {
    projects[currentProject].useDefaultConfig = true;
  } else {
    projects.push({
      id: currentProjectName,
      useDefaultConfig: true,
    });
  }

  await configuration.update(
    CONFIG_PROJECTS,
    projects,
    ConfigurationTarget.Global
  );
};
