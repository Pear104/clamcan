import { App, Button, Tag } from "antd";
import { sQuery } from "app/stores/queryStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { POST } from "app/modules/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "app/enums/Role";
import { decodeJWT } from "app/modules/jwtUtils";
import { sAuth } from "app/stores/authStore";
import { sConfig } from "app/stores/configStore";
import language from "app/locales/pages/Worker/LabelManager/LabelList.json";
import { schema } from "../LabelManager/schemas";

const CreateLabelForm = ({ setIsModalOpen }) => {
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
    defaultValues: { name: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    message.open({
      type: "loading",
      content: "Creating label ...",
      duration: 0,
    });

    const response = await POST("/label", data);

    message.destroy();
    if (response.status === 200) {
      message.success("Add label successfully!");
      setIsModalOpen(false);
      data.name = (
        <>
          <Tag>{data.name}</Tag>
          <Tag color="green-inverse" className="!text-sm">
            Recently Added
          </Tag>
        </>
      );
      sQuery.set((pre) => pre.value.recentlyAdded.label.unshift(data));
      sQuery.set((pre) => (pre.value.revalidate = !pre.value.revalidate));
      reset();
    } else {
      setError("root", { message: "Label already exist" });
      message.error("Error, please try again later");
    }
  };

  return (
    <form
      className="overflow-y-scroll small-scrollbar h-full w-full overflow-x-hidden"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 gap-4 mb-2">
        <div>
          <div className="font-semibold text-base pb-2">
            {language[config.language].name}
          </div>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Enter label name"
            className="input-style py-[9px] px-2 text-sm"
          />
          {errors.name && (
            <div className="text-red-500 mb-2 mt-1">
              {errors.name.message[config.language]}
            </div>
          )}
        </div>
        {/* {errors.root && (
          <div className={text-red-500 mb-2 ${errors.role && "mt-6"}}>
            {errors.root.message}
          </div>
        )} */}
      </div>
      <div className="flex justify-end">
        <Button type="primary" htmlType="submit" className="font-bold">
          {language[config.language].create}
        </Button>
      </div>
    </form>
  );
};

export default CreateLabelForm;
