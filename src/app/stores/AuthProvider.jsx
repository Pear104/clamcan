import React, { useEffect } from "react";
import { sAuth } from "./authStore";
import { isTokenExpired } from "app/modules/jwtUtils";
import { setCookie } from "app/modules/cookie";
import { sConfig } from "./configStore";

export default function AuthProvider({ children }) {
  const config = sConfig.use();
  // Check if the token is expired or user is not authenticated every time user reload page
  useEffect(() => {
    if (isTokenExpired()) {
      alert("Session expired, please login again");
      setCookie("accessToken", "", 0);
      sAuth.set((pre) => (pre.value = {}));
    }
    if (config.isDarkMode) {
      document.querySelector("html").classList.add("dark");
      document.documentElement.setAttribute("data-color-mode", "dark");
    } else {
      document.querySelector("html").classList.remove("dark");
      document.documentElement.setAttribute("data-color-mode", "light");
    }
  }, []);
  return <>{children}</>;
}
