import { App, Button, DatePicker } from "antd";
import { sQuery } from "app/stores/queryStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { schema, schemaManager } from "../AccountManager/schemas";
import { POST } from "app/modules/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "app/enums/Role";
import { decodeJWT } from "app/modules/jwtUtils";
import { sAuth } from "app/stores/authStore";
import { sConfig } from "app/stores/configStore";
import language from "app/locales/pages/Worker/AccountManager/AccountForm.json";

const CreateAccountForm = ({ setIsModalOpen }) => {
  const { message } = App.useApp();
  const auth = sAuth.use();
  const config = sConfig.use();

  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: 4,
    },
    resolver: zodResolver(auth.role == Role.ADMIN ? schema : schemaManager),
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    message.open({
      type: "loading",
      content: "Creating account ...",
      duration: 0,
    });

    if (auth.role == Role.MANAGER) data.role = 2;
    data.role += "";
    const response = await POST(
      `/account${auth.role == Role.ADMIN ? "/admin" : ""}`,
      data
    );
    data.email += "| new";

    message.destroy();
    if (response.status === 200) {
      message.success(
        "Add account successfully, please wait them to active their account"
      );
      setIsModalOpen(false);
      sQuery.set((pre) => pre.value.recentlyAdded.account.unshift(data));
      sQuery.set((pre) => (pre.value.revalidate = !pre.value.revalidate));
      reset();
    } else {
      setError("root", { message: "Account email already existed" });
      message.error("Error, please try again later");
    }
  };

  return (
    <form
      className="overflow-y-scroll small-scrollbar h-full w-full overflow-x-hidden"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <div className="font-semibold text-base pb-2">
            {language[config.language].email}
          </div>
          <input
            {...register("email")}
            placeholder="User email address"
            className="input-style py-[9px] px-2 text-sm"
          />
          {errors.email && (
            <div className="text-red-500 mb-2 mt-1">
              {errors.email.message[config.language]}
            </div>
          )}
        </div>
        <div>
          <div className="font-semibold text-base pb-2">
            {language[config.language].password}
          </div>
          <input
            {...register("password")}
            placeholder="User password"
            className="input-style py-[9px] px-2 text-xs"
          />
          {errors.password && (
            <div className="text-red-500 mb-2 mt-1">
              {errors.password.message[config.language]}
            </div>
          )}
        </div>
        {auth.role == Role.ADMIN && (
          <div>
            <div className="font-semibold text-base pb-2">
              {language[config.language].role}
            </div>
            <select className="py-2 px-2 input-style" {...register("role")}>
              <option value="1">{language[config.language].manager}</option>
              <option value="2">{language[config.language].interviewer}</option>
            </select>
            {errors.role && (
              <div className="text-red-500 mb-2 mt-1">
                {errors.role.message[config.language]}
              </div>
            )}
          </div>
        )}
        {errors.root && (
          <div className={`text-red-500 mb-2 ${errors.role && "mt-6"}`}>
            {errors.root.message}
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Button type="primary" htmlType="submit" className="font-bold">
          {language[config.language].create}
        </Button>
      </div>
    </form>
  );
};

export default CreateAccountForm;
