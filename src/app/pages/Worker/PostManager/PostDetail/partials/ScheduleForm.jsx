// import { post } from "mocks/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { App, Button } from "antd";
import { POST } from "app/modules/request";
import { sQuery } from "app/stores/queryStore";
import dayjs from "dayjs";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function ScheduleForm({ setIsModalOpen, record }) {
  const { id: postId } = useParams();
  const { message } = App.useApp();
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      time: dayjs(record?.time || new Date()).format("YYYY-MM-DDTHH:mm"),
      postId,
      email: record.email,
    },
  });

  const onSubmit = async (data) => {
    const { status } = await POST("/schedule", data);
    if (status === 200) {
      sQuery.set((pre) => (pre.value.revalidate = !pre.value.revalidate));
      message.success("Schedule successfully");
      setIsModalOpen(false);
    } else message.error("Error, please try again later");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="font-semibold text-base pb-2">Interview Time</div>
        <div>{record?.email}</div>
        <input
          {...register("time")}
          type="datetime-local"
          // min={dayjs(from_date).format("YYYY-MM-DD")}
          // max={!record && dayjs().add(1, "year").format("YYYY-MM-DD")}
          placeholder="Campaign End Date"
          className="input-style py-2 px-4 text-base mb-2"
        />
        {errors.time && <div className="error-msg">{errors.time.message}</div>}
      </div>
      <div className="flex justify-end mt-4 gap-4">
        <Button type="primary" htmlType="submit" className="font-bold">
          Schedule
        </Button>
      </div>
    </form>
  );
}
