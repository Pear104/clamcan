import { useEffect, useRef, useState } from "react";
import avt from "../../../../assets/3.png";
import { Button, message } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "../schemas";
import { useForm } from "react-hook-form";
import { GET, PATCH, PUT } from "app/modules/request";
import { useNavigate } from "react-router-dom";

function Information() {
  const navigate = useNavigate();
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
      content: "Updating profile ...",
      duration: 0,
    });
    console.log(data);
    const response = await PATCH("/user", data);
    if (response.status === 200) {
      message.destroy();
      message.success({
        content: "Change password successfully",
        duration: 2,
      });
      navigate("/profile");
    } else {
      message.error({
        content: "Error, please try again later",
        duration: 2,
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 px-8 flex flex-col gap-4 w-1/2 bg-white p-8 rounded-lg shadow-lg"
        >
          <div className="text-3xl mb-6 font-semibold text-center">
            Change your password
          </div>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              New Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="input-style px-2 py-2 w-full"
            />
            {errors.password && (
              <div className="text-red-500 mb-2">{errors.password.message}</div>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              className="input-style px-2 py-2 w-full"
            />
            {errors.confirmPassword && (
              <div className="text-red-500 mb-2">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
          <div className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              className="py-5 px-8 font-bold"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Information;
