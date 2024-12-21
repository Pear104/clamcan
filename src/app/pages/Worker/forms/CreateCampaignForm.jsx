import MDEditor from "@uiw/react-md-editor";
import { App, Button, Tag } from "antd";
import { useEffect, useState } from "react";
import { schema } from "../CampaignManager/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sQuery } from "app/stores/queryStore";
import { POST, PUT } from "app/modules/request";
import { RotateCcw } from "lucide-react";
import { sConfig } from "app/stores/configStore";
import language from "app/locales/pages/Worker/CampaignManager/CampaignForm.json";
import dayjs from "dayjs";
import errMsg from "app/locales/errMsg.json";
import { defaultErrImg } from "app/modules/default";

const CreateCampaignForm = ({ setIsModalOpen, record = "" }) => {
  const [mdText, setMdText] = useState(record.summary);
  const { message } = App.useApp();
  const [logo, setLogo] = useState(record.logo);
  const query = sQuery.use();
  const config = sConfig.use();
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: record.name,
      startDate: dayjs(record.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(record.endDate).format("YYYY-MM-DD"),
      logo: record.logo,
      description: record.description,
      summary: record.summary,
      estimated_cost: record.estimated_cost,
      hiring_count: record.hiring_count,
    },
    resolver: zodResolver(schema()),
  });

  useEffect(() => {
    setMdText(record?.description);
    setLogo(record.logo);
  }, []);
  // }, [query.revalidate]);

  const onSubmit = async (data) => {
    if (!mdText) {
      setError("description", { message: errMsg.required });
      return;
    }
    data.description = mdText;
    data.logo = logo;
    message.open({
      type: "loading",
      content: language[config.language][record ? "msgUpdating" : "msgAdding"],
      duration: 0,
    });
    let response = record
      ? await PUT(`/campaign/${record.id}`, data)
      : await POST("/campaign", data);
    message.destroy();
    if (response.status === 200) {
      sQuery.set((pre) => (pre.value.revalidate = !pre.value.revalidate));
      if (!record) {
        data.admin_approve = "0";
        reset();
        data.name = (
          <>
            <div>{data.name}</div>
            <Tag color="green-inverse" className="!text-xs">
              Recently Added
            </Tag>
          </>
        );
        sQuery.set((pre) => pre.value.recentlyAdded.campaign.unshift(data));
        setMdText("");
        setLogo("");
      } else {
        data.id = record.id;
        data.admin_approve = record.admin_approve;
        reset(data);
        data.name = (
          <>
            <div>{data.name}</div>
            <Tag color="green-inverse" className="!text-xs">
              Recently Updated
            </Tag>
          </>
        );
        let a = query.recentlyAdded.campaign.filter(
          (item) => item.id !== record.id
        );
        a.unshift(data);
        sQuery.set((pre) => (pre.value.recentlyAdded.campaign = a));
      }
      message.success(
        language[config.language][record ? "msgUpdateSuccess" : "msgAddSuccess"]
      );
      document.querySelector("form").scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      setIsModalOpen(false);
    } else {
      message.error(language[config.language].msgErr);
    }
  };

  return (
    <>
      <form
        className="overflow-y-scroll small-scrollbar h-full pr-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="font-semibold text-base pb-2">
          {language[config.language].name}
        </div>
        <input
          {...register("name")}
          placeholder={language[config.language].namePlaceholder}
          className="input-style py-2 px-4 text-base mb-2"
        />
        {errors.name && (
          <div className="error-msg">
            {errors.name.message[config.language]}
          </div>
        )}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="font-semibold text-base pb-2">
              {language[config.language].startDate}
            </div>
            <input
              {...register("startDate")}
              type="date"
              placeholder="Campaign Start Date"
              className="input-style py-2 px-4 text-base mb-2"
            />
            {errors.startDate && (
              <div className="error-msg">
                {errors.startDate.message[config.language]}
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold text-base pb-2">
              {language[config.language].endDate}
            </div>
            <input
              {...register("endDate")}
              type="date"
              placeholder="Campaign End Date"
              className="input-style py-2 px-4 text-base mb-2"
            />
            {errors.endDate && (
              <div className="error-msg">
                {errors.endDate.message[config.language]}
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold text-base pb-2">
              {language[config.language].estimated_cost}
            </div>
            <input
              {...register("estimated_cost")}
              type="number"
              placeholder={language[config.language].estimated_costPlaceholder}
              className="input-style py-2 px-4 text-base mb-2"
            />{" "}
            {errors.estimated_cost && (
              <div className="error-msg">{errors.estimated_cost.message}</div>
            )}
          </div>
          <div>
            <div className="font-semibold text-base pb-2">
              {language[config.language].hiring_count}
            </div>
            <input
              {...register("hiring_count")}
              type="number"
              placeholder={language[config.language].hiring_countPlaceholder}
              className="input-style py-2 px-4 text-base mb-2"
            />
            {errors.hiring_count && (
              <div className="error-msg">{errors.hiring_count.message}</div>
            )}
          </div>
        </div>
        <div className="mb-2">
          <div className="font-semibold text-base pb-2">Summary</div>
          <textarea
            {...register("summary")}
            className="input-style w-full py-[9px] px-2 text-sm"
            placeholder="Your Summary"
            rows={3}
          />
          {errors.summary && (
            <div className="error-msg">
              {errors.summary.message[config.language]}
            </div>
          )}
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="font-semibold text-base pb-2 flex justify-between">
              {language[config.language].logo}
            </div>
            <input
              {...register("logo")}
              placeholder={language[config.language].logoPlaceholder}
              className="input-style py-2 px-4 text-base mb-2"
              onChange={(e) => setLogo(e.target.value)}
            />
            {errors.logo && (
              <div className="error-msg">
                {errors.logo.message[config.language]}
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold text-base pb-2 flex justify-between">
              {language[config.language].preview}
            </div>
            <div
              style={{ backgroundImage: `url(${logo}), url(${defaultErrImg})` }}
              className="w-[200px] bg-no-repeat bg-cover bg-center aspect-square rounded-xl border border-zinc-400 dark:border-zinc-700 dark:bg-[#141414] text-xl flex justify-center items-center"
            ></div>
          </div>
        </div>
        <div className="font-semibold text-base pb-2">
          {language[config.language].description}
        </div>
        <MDEditor
          className="border dark:border-zinc-600 small-scrollbar"
          preview="live"
          height="100%"
          defaultValue={record?.description}
          value={mdText}
          onChange={setMdText}
          minHeight={300}
        />
        {errors.description && (
          <div className="error-msg">
            {errors.description.message[config.language]}
          </div>
        )}
        <div className="flex justify-end mt-4 gap-4">
          {!record && (
            <Button
              type="primary"
              className="font-semibold"
              icon={<RotateCcw size={16} />}
              onClick={() => {
                reset();
                setMdText("");
                setLogo("");
                document.querySelector("form").scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                });
              }}
            >
              {language[config.language].resetForm}
            </Button>
          )}
          <Button
            type="primary"
            htmlType="submit"
            className="font-bold"
            onClick={() => console.log(errors)}
          >
            {language[config.language][record ? "save" : "create"]}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateCampaignForm;
