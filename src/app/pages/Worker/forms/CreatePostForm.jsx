import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { App, Button, Select, Tag } from "antd";
import { sConfig } from "app/stores/configStore";
import { sQuery } from "app/stores/queryStore";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "../PostManager/schemas";
import { GET, POST, PUT } from "app/modules/request";
import countries from "mocks/countries";
import { RotateCcw } from "lucide-react";
import errMsg from "app/locales/errMsg.json";
import language from "app/locales/pages/Worker/CampaignManager/CampaignForm";
import { defaultErrImg } from "app/modules/default";
import companyIndustry from "mocks/companyIndustry";
import companySize from "mocks/companySize";
import companyType from "mocks/companyType";
import workingDays from "mocks/workingDays";

const CreatePostForm = ({ setIsModalOpen, record = "" }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [labels, setLabels] = useState([]);
  const [mdText, setMdText] = useState("");
  const { message } = App.useApp();
  const [logo, setLogo] = useState(record.logo);
  const query = sQuery.use();
  const config = sConfig.use();
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
    watch,
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      campaign_id: record.campaign_id,
      title: record.title,
      from_date: dayjs(record.from_date).format("YYYY-MM-DD"),
      to_date: dayjs(record.to_date).format("YYYY-MM-DD"),
      summary: record.summary,
      description: record.description,
      logo: record.logo,
      country: record.country,
      company_type: record.company_type,
      company_industry: record.company_industry,
      company_size: record.company_size,
      working_days: record.working_days,
      overtime_policy: record.overtime_policy,
      labels: record.labels || ["#Hot"],
    },
    resolver: zodResolver(schema()),
  });
  const from_date = watch("from_date");
  const to_date = watch("to_date");

  useEffect(() => {
    (async () => {
      const { data } = await GET("/campaign");
      setCampaigns(data.data.filter((item) => item.admin_approve == "1"));

      const { data: rawLabel } = await GET("/label");
      const transformedLabels = rawLabel.data.map((item) => ({
        label: item.name,
        value: item.name,
      }));
      setLabels(transformedLabels);
      // console.log(transformedLabels);
    })();
  }, []);

  useEffect(() => {
    setMdText(record?.description);
    setLogo(record.logo);
  }, []);
  // }, [sQuery.use().revalidate]);

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
      ? await PUT(`/post/${record.postId || record.post_id}`, data)
      : await POST("/post", data);
    message.destroy();
    if (response.status === 200) {
      sQuery.set((pre) => (pre.value.revalidate = !pre.value.revalidate));
      if (!record) {
        reset();
        data.title = (
          <>
            <div>{data.title}</div>
            <Tag color="green-inverse" className="!text-xs">
              Recently Added
            </Tag>
          </>
        );
        sQuery.set((pre) => pre.value.recentlyAdded.post.unshift(data));
        setMdText("");
        setLogo("");
      } else {
        data.postId = record.postId || record.post_id;
        reset(data);
        data.title = (
          <>
            <div>{data.title}</div>
            <Tag color="green-inverse" className="!text-xs">
              Recently Updated
            </Tag>
          </>
        );
        let a = query.recentlyAdded.post.filter(
          (item) => item.postId !== (record.postId || record.post_id)
        );
        a.unshift(data);
        sQuery.set((pre) => (pre.value.recentlyAdded.post = a));
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
    <form
      className="overflow-y-scroll small-scrollbar h-full pr-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="font-semibold text-base pb-2">Title</div>
      <input
        {...register("title")}
        placeholder="Title of your post"
        className="input-style py-2 px-2 text-base mb-2"
      />
      {errors.title && (
        <div className="error-msg">{errors.title.message[config.language]}</div>
      )}
      <div className="grid grid-cols-4 gap-4 mb-2">
        <div>
          <div className="font-semibold text-base pb-2">Campaign</div>
          <select
            className="py-2 px-2 input-style"
            {...register("campaign_id")}
          >
            <option className="input-style" value={""}>
              Select a campaign
            </option>
            {campaigns.map((item) => (
              <option
                className="input-style"
                value={item.id}
                selected={item.id == record.campaign_id}
              >
                #{item.id} - {item.name}
              </option>
            ))}
          </select>
          {errors.campaign_id && <div className="error-msg">Required</div>}
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Country</div>
          <select className="py-2 px-2 input-style" {...register("country")}>
            <option className="input-style" value={""}>
              Select a country
            </option>
            {countries.map((item) => (
              <option className="input-style" value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.country && (
            <div className="error-msg">
              {errors.country.message[config.language]}
            </div>
          )}
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Start Date</div>
          <input
            {...register("from_date")}
            type="date"
            min={!record && dayjs().subtract(2, "day").format("YYYY-MM-DD")}
            max={!record && dayjs().add(1, "year").format("YYYY-MM-DD")}
            placeholder="Post End Date"
            className="input-style py-2 px-4 text-base mb-2"
          />
          {errors.from_date && (
            <div className="error-msg">
              {errors.from_date.message[config.language]}
            </div>
          )}
        </div>
        <div>
          <div className="font-semibold text-base pb-2">End Date</div>
          <input
            {...register("to_date")}
            type="date"
            min={dayjs(from_date).format("YYYY-MM-DD")}
            max={!record && dayjs().add(1, "year").format("YYYY-MM-DD")}
            placeholder="Campaign End Date"
            className="input-style py-2 px-4 text-base mb-2"
          />
          {errors.to_date && (
            <div className="error-msg">
              {errors.to_date.message[config.language]}
            </div>
          )}
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Company Type</div>
          <input
            {...register("company_type")}
            list="companyType"
            className="input-style w-full py-[9px] px-2 text-sm"
            placeholder="Please select"
          />
          <datalist id="companyType">
            {companyType.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
          {errors.company_type && (
            <div className="error-msg">
              {errors.company_type.message[config.language]}
            </div>
          )}
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Company Industry</div>
          <input
            {...register("company_industry")}
            list="companyIndustries"
            className="input-style w-full py-[9px] px-2 text-sm"
            placeholder="Company Industry"
          />
          <datalist id="companyIndustries">
            {companyIndustry.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
          {errors.company_industry && (
            <div className="error-msg">
              {errors.company_industry.message[config.language]}
            </div>
          )}
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Company Size</div>
          <input
            {...register("company_size")}
            list="companySizes"
            className="input-style w-full py-[9px] px-2 text-sm"
            placeholder="Company Size"
          />
          <datalist id="companySizes">
            {companySize.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
          {errors.company_size && (
            <div className="error-msg">
              {errors.company_size.message[config.language]}
            </div>
          )}
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Working days</div>
          <input
            {...register("working_days")}
            list="workingDays"
            className="input-style w-full py-[9px] px-2 text-sm"
            placeholder="Please select"
          />
          <datalist id="workingDays">
            {workingDays.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
          {errors.working_days && (
            <div className="error-msg">
              {errors.working_days.message[config.language]}
            </div>
          )}
        </div>
      </div>
      <div className="mb-2 hidden">
        <div className="font-semibold text-base pb-2">Labels</div>
        <Select
          {...register("labels")}
          mode="multiple"
          allowClear
          placeholder="Please select labels"
          onChange={(value) =>
            setValue(
              "labels",
              value.map((item) => item)
            )
          }
          options={labels}
          defaultValue={record.labels?.length > 0 ? record.labels : ["#Hot"]}
          className="w-full hover:!border-emerald-400"
        />
        {errors.labels && (
          <div className="error-msg">
            {errors.labels.message[config.language]}
          </div>
        )}
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
      <div className="mb-2">
        <div className="font-semibold text-base pb-2">Overtime Policy</div>
        <textarea
          {...register("overtime_policy")}
          className="input-style w-full py-[9px] px-2 text-sm"
          placeholder="Your Overtime Policy"
          rows={3}
        />
        {errors.overtime_policy && (
          <div className="error-msg">
            {errors.overtime_policy.message[config.language]}
          </div>
        )}
      </div>
      <div className="flex gap-8">
        <div className="flex-1">
          <div className="font-semibold text-base pb-2 flex justify-between">
            Logo
          </div>
          <input
            {...register("logo")}
            onChange={(e) => setLogo(e.target.value)}
            defaultValue={record.logo}
            placeholder="Logo url"
            className={`input-style py-2 px-3 text-base `}
          />
          {errors.logo && (
            <div className="error-msg">
              {errors.logo.message[config.language]}
            </div>
          )}
        </div>
        <div>
          <div className="font-semibold text-base pb-2 flex justify-between">
            Preview
          </div>
          <div
            style={{ backgroundImage: `url(${logo}), url(${defaultErrImg})` }}
            className="w-[200px] bg-no-repeat bg-cover bg-center aspect-square rounded-xl border border-zinc-400 dark:border-zinc-700 dark:bg-[#141414] text-xl flex justify-center items-center"
          />
        </div>
      </div>
      <div className="font-semibold text-base pb-2">Description</div>
      <MDEditor
        {...register("description")}
        className="border border-zinc-400 dark:border-zinc-800"
        preview="live"
        value={mdText}
        onChange={setMdText}
        height="100%"
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
  );
};

export default CreatePostForm;
