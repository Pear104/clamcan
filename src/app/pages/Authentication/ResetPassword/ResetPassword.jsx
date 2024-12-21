import { App, Button } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schemas";
import { POST } from "app/modules/request";
import language from "app/locales/pages/Authentication/ResetPassword.json";
import { sConfig } from "app/stores/configStore";
import errMsg from "app/locales/errMsg.json";

export default function ResetPassword({ worker = false }) {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const config = sConfig.use();
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    message.open({
      type: "loading",
      content: language[config.language].msgChecking,
      duration: 0,
    });
    const response = await POST(
      `/${worker ? "worker/" : ""}reset`,
      { email: data.email },
      false,
      false
    );
    message.destroy();
    if (response.status === 200) {
      navigate(`/succeed-confirm${worker ? "?worker=true" : ""}`);
    } else {
      setError("root", { message: errMsg.notExist });
    }
  };

  return (
    <div className="w-[700px] mt-12 border border-black py-10 px-8 rounded-lg bg-secondary">
      <h2 className="text-3xl font-bold mb-2 tracking-widest">
        {worker && language[config.language].worker + " "}
        {language[config.language].title}
      </h2>

      <div className="font-semibold text-base pb-2 flex justify-between items-center">
        <p className="my-4">{language[config.language].email}</p>
        <Link
          to={`${worker ? "/worker" : ""}/auth/login`}
          className="text-blue-500"
        >
          {language[config.language].signin}
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          placeholder={language[config.language].emailPlaceholder}
          className="input-style mb-3 py-2 px-2"
        />
        {errors.email && (
          <div className="text-red-500 mb-2">
            {errors.email.message[config.language]}
          </div>
        )}

        {errors.root && (
          <div className={`text-red-500 mb-2 ${errors.email && "mt-4"}`}>
            {errors.root.message[config.language]}
          </div>
        )}
        <Button
          htmlType="submit"
          type="primary"
          className="w-full mb-2 mt-2 py-5 font-bold"
        >
          {language[config.language].reset}
        </Button>
      </form>
    </div>
  );
}
