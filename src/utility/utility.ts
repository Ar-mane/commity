import { existsSync } from "fs";
import { posix } from "path";
import { QuickPickItem, Uri, workspace } from "vscode";
import { defaultConfig } from "../config/config";
import { CommityProject, Config, Scope } from "../config/types";
import {
  CONFIG_PROJECTS,
  FILE_NAME_IN_WORKSPACE,
} from "../constants/Constants";
import { showNoConfigFileExistPrompt } from "../ui/Components";

export function getQuickPickItems(config: Config): QuickPickItem[] {
  return config.scopes.map(
    (item: Scope) =>
      ({
        label: item.name,
        description: item.description,
      } as QuickPickItem)
  );
}

export const getProperConfig = async () => {
  const projectConfigFileUri = getFileUri(FILE_NAME_IN_WORKSPACE);

  const exist = isUriExist(projectConfigFileUri as Uri);
  const isDefaultSettingSetForThisProject = isDefaultSettingSet();

  if (exist) {
    return getDataFromUri(projectConfigFileUri as Uri);
  } else if (isDefaultSettingSetForThisProject) {
    return defaultConfig;
  } else {
    return showNoConfigFileExistPrompt(projectConfigFileUri as Uri);
  }
};

const getDataFromUri = async (uri: Uri) => {
  const readData = await workspace.fs.readFile(uri);
  const readStr = Buffer.from(readData).toString("utf8");
  return JSON.parse(readStr);
};

export const getProjects = (): CommityProject[] =>
  (workspace.getConfiguration().get(CONFIG_PROJECTS) as CommityProject[]) || [];

export const projectID = () => {
  return workspace.rootPath;
};

//  --- local functions //

const isDefaultSettingSet = (): boolean => {
  const pid = projectID();
  return !!getProjects().find((e) => e.id === pid && e.useDefaultConfig);
};

const getFileUri = (fileName: string) => {
  let folderUri;

  if (workspace.workspaceFolders) {
    folderUri = workspace.workspaceFolders[0].uri;
  }

  return folderUri?.with({
    path: posix.join(folderUri.path, fileName),
  });
};

const isUriExist = (uri: Uri): boolean => {
  return existsSync(uri.path);
};
