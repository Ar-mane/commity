import { Config } from "./types";

export const defaultConfig: Config = {
  emojiVisibility: true,
  scopes: [
    {
      name: "Backend",
      description: "if changes remains to something in backend ",
    },
    {
      name: "HCP dashboard",
      description: "if changes remains to something in HCP dashboard ",
    },
    {
      name: "CI",
      description: "if changes remains to something in CI ",
    },
    {
      name: "OverAll",
      description: "if changes remains to something OverAll ",
    },
  ],

  types: [
    {
      emoji: "✨",
      value: ":sparkles: feature",
      key: "__feature",
      description: "feature: A new feature",
      maxLenght: 20,
      minLenght: 20,
    },
    {
      emoji: "🐞",
      key: "__feature",
      description: "fix: A bug fix",
      value: ":beetle: fix",
      maxLenght: 20,
      minLenght: 20,
    },
    {
      emoji: "🏗️",
      key: "__feature",
      description: "chore: Build process or auxiliary tool changes",
      value: ":building_construction: chore",
      maxLenght: 20,
      minLenght: 20,
    },
    {
      emoji: "💚",
      key: "__feature",
      description: "ci: CI related changes",
      value: ":green_heart: ci",
      maxLenght: 20,
      minLenght: 20,
    },
    {
      emoji: "📚",
      key: "__feature",
      description: "docs: Documentation only changes",
      value: ":books: docs",
      maxLenght: 20,
      minLenght: 20,
    },
  ],
};
