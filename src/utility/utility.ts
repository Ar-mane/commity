import { existsSync } from "fs";
import { posix } from "path";
import { QuickPickItem, Uri, workspace } from "vscode";
import { Config, Scope } from "../config/types";
import { FILE_NAME_IN_WORKSPACE } from "../constants/Constants";

export function getQuickPickItems(config: Config): QuickPickItem[] {
  return config.scopes.map(
    (item: Scope) =>
      ({
        label: item.name,
        description: item.description,
      } as QuickPickItem)
  );
}

export const getCustomConfig = async () => {
  const configFileURI = getFileUri(FILE_NAME_IN_WORKSPACE);

  const exist = isUriExist(configFileURI as Uri);
  if (!exist) {
    return null;
  }
  const data = getDataFromUri(configFileURI as Uri);
  return data;
};

const getDataFromUri = async (uri: Uri) => {
  const readData = await workspace.fs.readFile(uri);
  const readStr = Buffer.from(readData).toString("utf8");
  return JSON.parse(readStr);
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
