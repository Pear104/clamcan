import { App, Button } from "antd";
import { PATCH, POST } from "app/modules/request";
import { useForm } from "react-hook-form";
import { z } from "zod";
import errMsg from "app/locales/errMsg.json";
import { sConfig } from "app/stores/configStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { sQuery } from "app/stores/queryStore";

const schema = z.object({
  isPassed: z.string().min(1, { message: errMsg.required }),
  note: z.string().min(1, { message: errMsg.required }),
  post_id: z.coerce.number(),
  email: z.string().optional(),
});

const CreateReviewForm = ({ setIsModalOpen, record }) => {
  const { message } = App.useApp();
  const config = sConfig.use();
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      isPassed: record?.isPassed,
      note: record?.note,
      post_id: record?.id,
      email: record?.email,
    },
  });

  const onSubmit = async (data) => {
    const { status } = await PATCH("/apply", data);
    if (status === 200) {
      sQuery.set((pre) => (pre.value.revalidate = !pre.value.revalidate));
      message.success("Review successfully");
      setIsModalOpen(false);
    } else message.error("Error, please try again later");
  };

  return (
    <form
      className="overflow-y-scroll small-scrollbar h-full pr-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 gap-4 mb-2">
        <div>
          <div className="font-semibold text-base pb-2">Grade</div>
          <select
            className="py-2 px-2 input-style"
            defaultValue={""}
            {...register("isPassed")}
          >
            <option className="input-style" value={""}>
              Grade the candidate
            </option>
            <option className="input-style" value="0">
              Not passed
            </option>
            <option className="input-style" value="1">
              Passed
            </option>
          </select>
          {errors.isPassed && (
            <div className="error-msg">
              {errors.isPassed.message[config.language]}
            </div>
          )}
        </div>
      </div>
      <div className="mb-2">
        <div className="font-semibold text-base pb-2">Note</div>
        <textarea
          {...register("note")}
          className="input-style w-full py-[9px] px-2 text-sm"
          placeholder="Your note"
          rows={5}
        />
        {errors.note && (
          <div className="error-msg">
            {errors.note.message[config.language]}
          </div>
        )}
      </div>
      <div className="flex justify-end mt-2">
        <Button
          type="primary"
          htmlType="submit"
          className="font-bold"
          onClick={() => console.log(errors)}
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default CreateReviewForm;
