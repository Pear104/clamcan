import { App, Button } from "antd";
import { GET, POST } from "app/modules/request";
import { sQuery } from "app/stores/queryStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const CVForm = ({ setIsModalOpen, postId }) => {
  const [cvs, setCvs] = useState([]);
  const [preview, setPreview] = useState("");
  const { message } = App.useApp();
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      cvPath: "",
    },
  });

  useEffect(() => {
    (async () => {
      const { data } = await GET("/user/cv");
      setCvs(data.data);
    })();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    if (data.cvPath == "") {
      message.error("Please select a CV");
      return;
    }
    const { status } = await POST(`/user/apply/${postId}`, data);
    if (status === 200) {
      sQuery.set((pre) => (pre.value.revalidate = !pre.value.revalidate));
      message.success("Apply successfully");
      setIsModalOpen(false);
    } else if (status === 400 && data.msg.includes("Duplicate"))
      message.error("You have already applied");
    else message.error("Error, please try again later");
  };

  return (
    <>
      <form
        className="overflow-y-scroll small-scrollbar h-full pr-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full grid-cols-12 grid gap-4">
          <div className="col-span-4">
            <div className="font-semibold text-base pb-2">Title</div>
            <select
              className="py-2 px-2 input-style"
              defaultValue={""}
              {...register("cvPath")}
              onChange={(e) => setPreview(e.target.value)}
            >
              <option className="input-style" value={""} disabled>
                Select a CV
              </option>
              {cvs.map((item) => (
                <option className="input-style" value={item.path}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="text-sm mt-3">
              Want to upload your CV?{" "}
              <Link to={"/profile/cv"} className="text-emerald-600">
                Click here
              </Link>
            </div>
          </div>
          <div className="col-span-8">
            <div className="font-semibold text-base pb-2">Preview</div>
            <iframe
              src={`https://file.nglearns.dev/${preview}#toolbar=0&navpanes=0&scrollbar=0`}
              title="Preview"
              width="100%"
              height={500}
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 gap-4">
          <Button type="primary" htmlType="submit" className="font-bold">
            Apply
          </Button>
        </div>
      </form>
    </>
  );
};

export default CVForm;
