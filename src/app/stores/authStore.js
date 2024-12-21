import { signify } from "react-signify";

export const sAuth = signify(
  {
    email: null,
    name: null,
    avatar: "",
    role: "4",
    isAuthenticated: false,
    // isLoading: true,
  },
  {
    cache: {
      key: "auth",
      type: "LocalStorage",
    },
  }
);
