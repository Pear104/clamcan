import React, { useState } from "react";
import { Layout, Menu } from "antd";
import Logo from "../components/Logo";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import {
  CalendarRange,
  CircleUser,
  NotebookPen,
  PieChart,
  Tag,
  Users,
} from "lucide-react";
import { sConfig } from "app/stores/configStore";
import language from "app/locales/layouts/DashboardLayout.json";
import { sAuth } from "app/stores/authStore";
import { Role } from "app/enums/Role";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const config = sConfig.use();
  const auth = sAuth.use();

  const items = [
    {
      label: language[config.language].dashboard,
      key: "/worker/dashboard",
      icon: <PieChart size={15} absoluteStrokeWidth />,
      className: "w-full flex font-semibold !text-zinc-200",
      allowedRoles: [Role.ADMIN, Role.MANAGER, Role.INTERVIEWER],
    },
    {
      label: language[config.language].campaigns,
      key: "/worker/campaigns",
      icon: <CalendarRange size={15} absoluteStrokeWidth />,
      className: "w-full flex font-semibold !text-zinc-200",
      allowedRoles: [Role.ADMIN, Role.MANAGER],
    },
    {
      label: language[config.language].posts,
      key: "/worker/posts",
      icon: <NotebookPen size={15} absoluteStrokeWidth />,
      className: "w-full flex font-semibold !text-zinc-200",
      allowedRoles: [Role.ADMIN, Role.MANAGER, Role.INTERVIEWER],
    },
    {
      label: language[config.language].accounts,
      key: "/worker/accounts",
      icon: <CircleUser size={15} absoluteStrokeWidth />,
      className: "w-full flex font-semibold !text-zinc-200",
      allowedRoles: [Role.ADMIN, Role.MANAGER],
    },
    // {
    //   label: language[config.language].labels,
    //   key: "/worker/labels",
    //   icon: <Tag size={15} absoluteStrokeWidth />,
    //   className: "w-full flex font-semibold !text-zinc-200",
    //   allowedRoles: [Role.ADMIN, Role.MANAGER],
    // },
    // {
    //   label: language[config.language].users,
    //   key: "/worker/users",
    //   icon: <Users size={15} absoluteStrokeWidth />,
    //   className: "w-full flex font-semibold !text-zinc-200",
    //   allowedRoles: [Role.ADMIN, Role.MANAGER],
    // },
  ];

  return (
    <>
      <Layout className="h-screen">
        <Layout.Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme={"dark"}
          className="bg-zinc-800"
          width={250}
        >
          <Logo collapsed={collapsed} size="small" />
          <Menu
            className="px-2 bg-zinc-800"
            theme={"dark"}
            selectedKeys={location.pathname.split("/").slice(0, 3).join("/")}
            mode="vertical"
            items={items.filter((item) =>
              item.allowedRoles.includes(auth.role)
            )}
            onClick={({ key }) => navigate(key)}
          />
        </Layout.Sider>
        <Layout className="overflow-y-scroll small-scrollbar border-l border-zinc-300 dark:border-zinc-600 bg-secondary/30">
          <Layout.Header className="p-4 bg-white flex justify-between items-center dark:bg-zinc-800 border-b border-zinc-300 dark:border-zinc-600">
            <AdminHeader />
          </Layout.Header>
          <div className="m-4 !mb-0">
            {/* <div className="min-h-screen"> */}
            <Outlet />
            {/* </div> */}
          </div>
          {/* <AdminFooter /> */}
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardLayout;
