import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sAuth } from "../stores/authStore";
import { Breadcrumb } from "antd";
import ProfileDropdown from "./ProfileDropdown";
import ToggleLanguage from "./ToggleLanguage";
import language from "app/locales/layouts/DashboardLayout.json";
import { sConfig } from "app/stores/configStore";
export default function AdminHeader() {
  const location = useLocation();
  const auth = sAuth.use();
  const config = sConfig.use();
  const [path, id] = location.pathname.split("/").slice(2);
  const items = [
    {
      title: (
        <Link to={`/worker/${path}`}>{language[config.language][path]}</Link>
      ),
    },
    // only return id breadcrumb if currently in the detail page
    ...(id ? [{ title: <Link to={`/worker/${path}/${id}`}>{id}</Link> }] : []),
  ];
  return (
    <div className="flex flex-wrap justify-between items-center w-full">
      <Breadcrumb
        className="my-4 capitalize font-bold text-base"
        items={items}
      />
      <div className="flex gap-4">
        <ProfileDropdown data={auth} />
        <div className="border-r border-gray-500 h-10 w-2" />
        <ToggleLanguage />
      </div>
    </div>
  );
}
