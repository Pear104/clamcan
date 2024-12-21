import React from "react";
import { Button, message } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GET, PATCH, PUT } from "app/modules/request";
import { useNavigate } from "react-router-dom";
import schema from "./schemas";
import { sAuth } from "app/stores/authStore";
import { Role } from "app/enums/Role";
import { sConfig } from "app/stores/configStore";
import language from "app/locales/pages/User/ChangePassword.json";
export default function ChangePassword() {
  const auth = sAuth.use();
  const navigate = useNavigate();
  const config = sConfig.use();
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    message.open({
      type: "loading",
      content: language[config.language].msgUpdating,
      duration: 0,
    });
    const response = await PATCH(
      auth.role == Role.USER ? "/user" : "/account",
      data
    );
    if (response.status === 200) {
      message.destroy();
      message.success(language[config.language].msgSuccess);
      navigate(`${auth.role != Role.USER ? "/worker" : ""}/profile`);
    } else {
      message.error(language[config.language].msgErr);
    }
  };

  return (
    <div
      className={
        auth.role != Role.USER && "p-4 bg-white dark:bg-zinc-900 rounded-md"
      }
    >
      <div className="my-6 text-3xl font-bold dark:text-white">
        {language[config.language].title}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 required dark:text-white"
          >
            {language[config.language].newPassword}
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder={language[config.language].newPasswordPlaceholder}
            className="input-style px-2 py-2 w-full"
          />
          {errors.password && (
            <div className="error-msg">
              {errors.password.message[config.language]}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900 required dark:text-white"
          >
            {language[config.language].confirmPassword}
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder={language[config.language].confirmPasswordPlaceholder}
            className="input-style px-2 py-2 w-full"
          />
          {errors.confirmPassword && (
            <div className="error-msg">
              {errors.confirmPassword.message[config.language]}
            </div>
          )}
        </div>
        <div className="text-start">
          <Button
            type="primary"
            htmlType="submit"
            className="py-5 px-8 font-bold"
          >
            {language[config.language].save}
          </Button>
        </div>
      </form>
    </div>
  );
}
