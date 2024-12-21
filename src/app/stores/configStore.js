import { signify } from "react-signify";

export const sConfig = signify(
  {
    isDarkMode: false,
    language: "en",
    languageIcon: "https://img.icons8.com/?size=48&id=2egPD0I7yi4-&format=png",
  },
  {
    cache: {
      key: "config",
      type: "LocalStorage",
    },
  }
);
