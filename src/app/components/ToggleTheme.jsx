import { Switch } from "antd";
import { sConfig } from "app/stores/configStore";
import { MoonStar, SunMedium } from "lucide-react";
import React from "react";

export default function ToggleTheme() {
  const config = sConfig.use();
  return (
    <Switch
      defaultChecked={config.isDarkMode}
      checkedChildren={<MoonStar size={12} className="anticon anticon-check" />}
      unCheckedChildren={
        <SunMedium size={12} className="anticon anticon-close" />
      }
      className="flex justify-center items-center z-10 fixed bottom-40 -right-0 -rotate-90 bg-zinc-700 !hover:bg-zinc-400"
      onClick={() => {
        sConfig.set((pre) => (pre.value.isDarkMode = !pre.value.isDarkMode));
        if (config.isDarkMode) {
          document.querySelector("html").classList.remove("dark");
          document.documentElement.setAttribute("data-color-mode", "light");
        } else {
          document.querySelector("html").classList.add("dark");
          document.documentElement.setAttribute("data-color-mode", "dark");
        }
      }}
    />
  );
}
