import { Dropdown } from "antd";
import { sConfig } from "app/stores/configStore";
import React from "react";

const language = [
  {
    value: "en",
    label: "English",
    icon: "https://img.icons8.com/?size=48&id=aRiu1GGi6Aoe&format=png",
  },
  {
    value: "ko",
    label: "Korean",
    icon: "https://img.icons8.com/?size=48&id=-_RS8ho736Fs&format=png",
  },
  {
    value: "vi",
    label: "Vietnamese",
    icon: "https://img.icons8.com/?size=48&id=2egPD0I7yi4-&format=png",
  },
  // {
  //   value: "jp",
  //   label: "Vietnamese",
  //   icon: "https://img.icons8.com/?size=48&id=2egPD0I7yi4-&format=png",
  // },
  // {
  //   value: "fr",
  //   label: "Vietnamese",
  //   icon: "https://img.icons8.com/?size=48&id=2egPD0I7yi4-&format=png",
  // },
  // {
  //   value: "de",
  //   label: "Vietnamese",
  //   icon: "https://img.icons8.com/?size=48&id=2egPD0I7yi4-&format=png",
  // },
  // {
  //   value: "hi",
  //   label: "Vietnamese",
  //   icon: "https://img.icons8.com/?size=48&id=2egPD0I7yi4-&format=png",
  // },
  // {
  //   value: "ru",
  //   label: "Vietnamese",
  //   icon: "https://img.icons8.com/?size=48&id=2egPD0I7yi4-&format=png",
  // },
  // {
  //   value: "zh",
  //   label: "Vietnamese",
  //   icon: "https://img.icons8.com/?size=48&id=2egPD0I7yi4-&format=png",
  // },
  // {
  //   value: "mn",
  //   label: "Vietnamese",
  //   icon: "https://img.icons8.com/?size=48&id=2egPD0I7yi4-&format=png",
  // },
  // {
  //   value: "ms",
  //   label: "Vietnamese",
  //   icon: "https://img.icons8.com/?size=48&id=2egPD0I7yi4-&format=png",
  // },
];

const getItem = (label, value, icon) => ({
  key: value,
  label: (
    <div
      className="flex gap-4"
      onClick={() =>
        sConfig.set((prev) => {
          prev.value.language = value;
          prev.value.languageIcon = icon;
        })
      }
    >
      <img
        className="aspect-square w-8 object-contain object-center"
        src={icon}
      />
      {label}
    </div>
  ),
});

export default function ToggleLanguage() {
  const config = sConfig.use();

  const items = language.map((item) =>
    getItem(item.label, item.value, item.icon)
  );

  return (
    <>
      <Dropdown
        className="flex font-bold items-center h-8 gap-3 group hover:scale-110 transition-all duration-200"
        menu={{ items }}
      >
        <span className="text-emerald-400 flex items-center cursor-pointer text-xs">
          <div className="uppercase">{config.language}</div>
          <img
            className="aspect-square w-8 object-cover object-center"
            src={config.languageIcon}
          />
        </span>
      </Dropdown>
    </>
  );
}
