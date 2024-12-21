import React from "react";
import { App, Button, Layout, Menu, Upload } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Calendar,
  CircleUserRound,
  FileUser,
  Heart,
  Lock,
  Pencil,
} from "lucide-react";
import { sAuth } from "app/stores/authStore";
import { POST } from "app/modules/request";
import JobList from "app/components/JobList";
import { defaultAvatar } from "app/modules/default";
import Header from "app/components/Header";
import Footer from "app/components/Footer";
import { sConfig } from "app/stores/configStore";
import language from "app/locales/layouts/ProfileLayout.json";

function getItem(label, key, icon, children) {
  return {
    label,
    key,
    icon,
    children,
    className: "text-white w-full flex text-lg",
  };
}

const ProfileOverview = () => {
  const { message } = App.useApp();
  const auth = sAuth.use();
  const config = sConfig.use();

  return (
    <div className="sticky top-4">
      <div className="flex flex-1 gap-4 items-center rounded-xl shadow-md p-4 bg-white dark:bg-zinc-900">
        <div
          style={{
            backgroundImage: `url(${
              auth?.avatar
                ? "https://img.nglearns.dev/" + auth?.avatar
                : defaultAvatar
            })`,
          }}
          // alt="avatar"
          className="flex justify-between items-center group bg-cover bg-no-repeat bg-center aspect-square border hover:border-none rounded-full w-24 relative bg-white"
        >
          <Upload
            className="absolute"
            fileList={[]}
            customRequest={async (info) => {
              const formData = new FormData();
              formData.append("file", info.file);
              const { status, data } = await POST(
                "/user/avatar",
                formData,
                true
              );
              if (status === 200) {
                message.success(language[config.language].msgSuccess);
                sAuth.set((pre) => (pre.value.avatar = data.data));
              } else {
                message.error(language[config.language].msgErr);
              }
            }}
          >
            <Button
              icon={<Pencil absoluteStrokeWidth size={14} />}
              className="hidden group-hover:block !w-24 !h-24 rounded-full bg-emerald-400/30 bg-opacity-30"
            />
          </Upload>
        </div>
        <div>
          <div>
            {language[config.language].welcome}, <b>{auth?.name}</b>
          </div>
          <i>{auth?.email}</i>
        </div>
      </div>
      <div className="pt-4">
        <JobList limit={2} navigatable={true} />
      </div>
    </div>
  );
};

export default function ProfileLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const config = sConfig.use();

  const items = [
    getItem(
      language[config.language].profile,
      "/profile",
      <CircleUserRound absoluteStrokeWidth className="mr-2" />
    ),
    getItem(
      language[config.language].changePassword,
      "/profile/change-password",
      <Lock absoluteStrokeWidth className="mr-2" />
    ),
    getItem(
      language[config.language].cv,
      "/profile/cv",
      <FileUser absoluteStrokeWidth className="mr-2" />
    ),
    getItem(
      language[config.language].favorite,
      "/profile/favorite",
      <Heart absoluteStrokeWidth className="mr-2" />
    ),
    getItem(
      language[config.language].applyHistory,
      "/profile/applied-history",
      <Calendar absoluteStrokeWidth className="mr-2" />
    ),
  ];

  return (
    <>
      <Header />
      <div className="bg-zinc-200 dark:bg-secondary min-h-screen">
        <div className="min-h-screen grid grid-cols-12 gap-4">
          {/* <div className="container mx-auto min-h-screen grid grid-cols-12 gap-4"> */}
          <div className="col-span-2 h-full ml-4 mt-4">
            <div className="flex gap-2 flex-col p-2 rounded-xl bg-white dark:bg-zinc-900 sticky top-0">
              {items.map((item) => (
                <Button
                  key={item.key}
                  icon={item.icon}
                  type={location.pathname == item.key ? "primary" : "link"}
                  className="py-5 w-full justify-start font-semibold text-base"
                  onClick={() => navigate(item.key)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="col-span-10 grid grid-cols-3 gap-4 justify-between pr-4 py-4">
            <div className="col-span-2 bg-white dark:bg-zinc-900 rounded-xl">
              <div className="mt-4 px-8">
                <Outlet />
              </div>
            </div>
            <ProfileOverview />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
