import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GET, PUT } from "app/modules/request";
import { sQuery } from "app/stores/queryStore";
import { sAuth } from "app/stores/authStore";
import schema from "./schemas";
import MDEditor from "@uiw/react-md-editor";
import dayjs from "dayjs";
import majors from "mocks/majors.json";
import schools from "mocks/universities.json";
import { sConfig } from "app/stores/configStore";
import language from "app/locales/pages/User/Profile.json";

function Profile() {
  const query = sQuery.use();
  const config = sConfig.use();
  const [mdText, setMdText] = useState("");
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      dob: new Date().toDateString(),
      description: "",
      address: "",
      phone: "",
      school: "",
      major: "",
      degree: "",
    },
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
  });

  useEffect(() => {
    (async () => {
      const { status, data } = await GET("/user");
      if (status === 200) {
        reset({
          email: data.data.email,
          name: data.data.name,
          dob: dayjs(data.data.dob).format("YYYY-MM-DD"),
          description: data.data.description || "",
          address: data.data.address,
          phone: data.data.phone,
          school: data.data.school,
          major: data.data.major,
          degree: data.data.degree,
        });
        setMdText(data.data.description);
      }
    })();
  }, [reset, query.revalidate]);
  const onSubmit = async (data) => {
    message.open({
      type: "loading",
      content: language[config.language].msgUpdating,
      duration: 0,
    });
    data.description = mdText;
    const response = await PUT("/user", data);
    message.destroy();
    if (response.status === 200) {
      const { data: userData } = await GET("/user");
      sAuth.set((pre) => {
        pre.value = {
          ...pre.value,
          ...userData.data,
        };
      });
      sQuery.set((pre) => (pre.value.revalidate = !pre.value.revalidate));
      message.success(language[config.language].msgSuccess);
      window.scrollTo({ top: 0 });
    } else {
      message.error(language[config.language].msgErr);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-6 text-3xl font-bold">
        {language[config.language].title}
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium required"
          >
            {language[config.language].fullname}
          </label>
          <input {...register("name")} className="px-2 py-2 input-style" />
          {errors.name && (
            <div className="text-red-500 mb-2">{errors.name.message}</div>
          )}
        </div>

        <div>
          <label
            htmlFor="school"
            className="block mb-2 text-sm font-medium required"
          >
            {language[config.language].school}
          </label>
          <input
            {...register("school")}
            list="schools"
            className="px-2 py-2 input-style"
          />
          <datalist id="schools">
            {schools?.map((school) => (
              <option key={school} value={school} />
            ))}
          </datalist>
          {errors.school && (
            <div className="text-red-500 mb-2">{errors.school.message}</div>
          )}
        </div>
        <div>
          <label
            htmlFor="major"
            className="block mb-2 text-sm font-medium required"
          >
            {language[config.language].major}
          </label>
          <input
            {...register("major")}
            list="majors"
            className="px-2 py-2 input-style"
          />
          <datalist id="majors">
            {majors.map((major) => (
              <option key={major} value={major} />
            ))}
          </datalist>
          {errors.major && (
            <div className="text-red-500 mb-2">{errors.major.message}</div>
          )}
        </div>
        <div>
          <label
            htmlFor="degree"
            className="block mb-2 text-sm font-medium required"
          >
            {language[config.language].degree}
          </label>
          <select className="py-2 px-2 input-style" {...register("degree")}>
            <option className="input-style" value="Associate">
              Associate
            </option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="Doctorate">Doctorate</option>
          </select>
          {errors.degree && (
            <div className="text-red-500 mb-2">{errors.degree.message}</div>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium required">
            {language[config.language].dob}
          </label>
          <input
            type="date"
            {...register("dob")}
            className="px-2 py-2 input-style"
            max={dayjs().subtract(18, "year").format("YYYY-MM-DD")}
          />
          {errors.dob && (
            <div className="text-red-500 mb-2">{errors.dob.message}</div>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium required"
          >
            {language[config.language].phoneNumber}
          </label>
          <input {...register("phone")} className="px-2 py-2 input-style" />
          {errors.phone && (
            <div className="text-red-500 mb-2">{errors.phone.message}</div>
          )}
        </div>
        <div className="col-span-2">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium required"
          >
            {language[config.language].address}
          </label>
          <input {...register("address")} className="px-2 py-2 input-style" />
          {errors.address && (
            <div className="text-red-500 mb-2">{errors.address.message}</div>
          )}
        </div>
        <div className="col-span-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            {language[config.language].description}
          </label>
          <MDEditor
            className="border dark:border-zinc-600 min-h-[500px]"
            preview="live"
            value={mdText}
            onChange={setMdText}
          />
        </div>
      </div>
      <div className="flex justify-end font">
        <button
          htmlType="submit"
          className="font-bold mb-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md px-6 py-2"
        >
          {language[config.language].save}
        </button>
      </div>
    </form>
  );
}
export default Profile;
