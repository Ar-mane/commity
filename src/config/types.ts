export interface Config {
  emojiVisibility: boolean;
  scopes: Scope[];
  types: Type[];
}

export interface Type {
  key: string; // identifier
  description: string;
  value: string;
  emoji?: string;
  minLenght: number;
  maxLenght: number;
  important?: boolean;
}

export interface Scope {
  name: string;
  emoji?: string;
  description: string;
}

export interface CommitMessage {
  scope?: Scope;
  type?: Type;
  body?: String;
  footer?: string;
}

export interface CommityProject {
  id: string;
  useDefaultConfig: boolean;
}
