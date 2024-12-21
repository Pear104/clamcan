import { App, Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schemas";
import { GET, POST, PUT } from "app/modules/request";
import { sAuth } from "app/stores/authStore";
import { Pencil } from "lucide-react";
import { sQuery } from "app/stores/queryStore";
import { defaultAvatar } from "app/modules/default";
import language from "app/locales/pages/Worker/WorkerProfile.json";
import { sConfig } from "app/stores/configStore";

export default function WorkerProfile() {
  const { message } = App.useApp();
  const auth = sAuth.use();
  const query = sQuery.use();
  const config = sConfig.use();
  const navigate = useNavigate();
  const {
    handleSubmit,
    setError,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", phone: "" },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    (async () => {
      const { status, data } = await GET("/account");
      if (status === 200) {
        reset({
          name: data.data.name,
          phone: data.data.phone,
        });
      }
    })();
  }, [reset, query.revalidate]);

  const onSubmit = async (data) => {
    message.open({
      type: "loading",
      content: "Updating profile ...",
      duration: 0,
    });
    const response = await PUT("/account", data);
    if (response.status === 200) {
      sAuth.set((pre) => {
        pre.value.name = data.name;
        pre.value.phone = data.phone;
      });
      message.destroy();
      message.success({
        content: "Update profile successfully",
        duration: 2,
      });
    } else {
      message.error({
        content: "Error, please try again later",
        duration: 2,
      });
    }
  };

  return (
    <div className="w-full p-8 rounded-lg bg-white dark:bg-zinc-900">
      <h2 className="text-3xl font-bold mb-2 tracking-widest text-primary">
        {language[config.language].title}
      </h2>
      <div className="flex flex-1 gap-4 items-center mt-4">
        <div
          style={{
            backgroundImage: `url(${
              auth?.avatar
                ? "https://img.nglearns.dev/" + auth?.avatar
                : defaultAvatar
            })`,
          }}
          alt="avatar"
          className="group bg-cover bg-no-repeat bg-center aspect-square border border-zinc-400 dark:border-none rounded-full w-[200px] relative bg-white"
        >
          <Upload
            className="absolute"
            fileList={[]}
            customRequest={async (info) => {
              const formData = new FormData();
              formData.append("file", info.file);
              const { status, data } = await POST(
                "/account/avatar",
                formData,
                true
              );
              if (status === 200) {
                message.success("Avatar uploaded successfully");
                sAuth.set((pre) => (pre.value.avatar = data.data));
              } else {
                message.error("Avatar upload failed.");
              }
            }}
          >
            <Button
              icon={<Pencil size={20} />}
              className="hidden group-hover:block !w-[200px] !h-[200px] rounded-full bg-emerald-400/30 bg-opacity-30"
            />
          </Upload>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-x-4 gap-y-1 grow"
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 grow">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium required text-primary"
              >
                {language[config.language].fullname}
              </label>
              <input {...register("name")} className="px-2 py-2 input-style" />
              {errors.name && (
                <div className="error-msg">
                  {errors.name.message[config.language]}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium required text-primary"
              >
                {language[config.language].phoneNumber}
              </label>
              <input {...register("phone")} className="px-2 py-2 input-style" />
              {errors.phone && (
                <div className="error-msg">
                  {errors.phone.message[config.language]}
                </div>
              )}
            </div>
            <div>
              <Button
                htmlType="submit"
                type="primary"
                className="mb-2 mt-2 py-4 font-bold px-6"
              >
                {language[config.language].save}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
