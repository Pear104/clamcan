import { signify } from "react-signify";

export const sQuery = signify(
  {
    revalidate: false,
    recentlyAdded: {
      campaign: [],
      account: [],
      post: [],
      label: [],
    },
  }
  // {
  //   cache: {
  //     key: "query",
  //     type: "LocalStorage",
  //   },
  // }
);
