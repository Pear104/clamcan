import { App, Button, ConfigProvider, Popover, Switch, Tag } from "antd";
import { Role } from "app/enums/Role";
import { sAuth } from "app/stores/authStore";
import { sConfig } from "app/stores/configStore";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import language from "app/locales/pages/Worker/CampaignManager/CampaignList.json";
import { z } from "zod";
import errMsg from "app/locales/errMsg.json";
import ConfirmModal from "app/components/ConfirmModal";
import UpdateModal from "app/components/UpdateModal";
import CreatePostForm from "../../forms/CreatePostForm";
import { PATCH, POST } from "app/modules/request";
import { sQuery } from "app/stores/queryStore";
import PostPopover from "../PostList/partials/PostPopover";

export const schema = () => {
  const config = sConfig.use();

  return z.object({
    campaign_id: z.coerce.number().min(1, { message: errMsg.required }),
    title: z
      .string()
      .min(1, { message: errMsg.required })
      .max(50, { message: errMsg.tooLong }),
    from_date: z.string().date(),
    to_date: z.string().date(),
    summary: z
      .string()
      .min(1, { message: errMsg.required })
      .max(255, { message: errMsg.tooLong }),
    description: z.string().optional(),
    logo: z
      .string()
      .min(1, { message: errMsg.required })
      .max(255, { message: errMsg.tooLong }),
    country: z.string().min(1, { message: errMsg.required }),
    company_type: z.string().min(1, { message: errMsg.required }),
    company_industry: z.string().min(1, { message: errMsg.required }),
    company_size: z.string().min(1, { message: errMsg.required }),
    working_days: z.string().min(1, { message: errMsg.required }),
    overtime_policy: z
      .string()
      .min(1, { message: errMsg.required })
      .max(50, { message: errMsg.tooLong }),
    labels: z.array(z.string()).nonempty({ message: errMsg.required }),
  });
};

export const postColumns = () => {
  const config = sConfig.use();
  const auth = sAuth.use();
  const { message } = App.useApp();
  const form = (record) => {
    return (setIsModalOpen) => (
      <CreatePostForm setIsModalOpen={setIsModalOpen} record={record} />
    );
  };

  return [
    {
      title: "Post Id",
      dataIndex: "postId",
      key: "id",
      render: (text) => (
        <Link to={`/worker/posts/${text}`} className="text-xs">
          #{text}
        </Link>
      ),
    },
    {
      title: "Campaign Id",
      dataIndex: "campaign_id",
      key: "campaign_id",
      render: (text) => (
        <Link
          to={`/worker/campaigns/${text}`}
          className="text-xs"
        >{`#${text}`}</Link>
      ),
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (text) => (
        <img src={text} className="w-12 object-contain aspect-square" />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <>
          {text?.props?.children?.[1]?.props?.children?.includes("Added") ? (
            text
          ) : (
            <Popover content={<PostPopover record={record} />}>
              <Link
                to={`/worker/posts/${record.postId || record.post_id}`}
                className="flex max-w-[500px] truncate text-ellipsis"
              >
                <div className="w-[400px] table-cell-title">{text}</div>{" "}
              </Link>
            </Popover>
          )}
        </>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag
          className="mt-1 text-xs"
          color={
            dayjs().isBefore(dayjs(record?.from_date))
              ? "red-inverse"
              : dayjs().isAfter(dayjs(record?.to_date))
              ? "green-inverse"
              : "blue-inverse"
          }
        >
          {dayjs().isBefore(dayjs(record?.from_date))
            ? "Not Started"
            : dayjs().isAfter(dayjs(record?.to_date))
            ? "Completed"
            : "Ongoing"}
        </Tag>
      ),
    },
    {
      title: "Available Time",
      key: "time",
      render: (_, record) => (
        <div className="w-[164px] text-sm">
          {dayjs(record.from_date).format("DD/MM/YYYY")} -{" "}
          {dayjs(record.to_date).format("DD/MM/YYYY")}
        </div>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (value) => (
        <Tag color={"default"} className="text-xs">
          {value}
        </Tag>
      ),
    },
    {
      title: "Company Type",
      dataIndex: "company_type",
      key: "company_type",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Company Industry",
      dataIndex: "company_industry",
      key: "company_industry",
      render: (value) => <Tag color={"geekblue-inverse"}>{value}</Tag>,
    },
    {
      title: "Company Size",
      dataIndex: "company_size",
      key: "company_size",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Working Days",
      dataIndex: "working_days",
      key: "working_days",
      render: (value) => <Tag color={"purple-inverse"}>{value}</Tag>,
    },
    {
      title: "Pinned",
      dataIndex: "pin",
      key: "pin",
      render: (value, record) => (
        <>
          {!(record.title.props?.children?.length > 1) && (
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#1677FF",
                },
              }}
            >
              <Switch
                defaultChecked={value != "0"}
                onClick={async () => {
                  const { status } = await PATCH(`/post/${record.postId}`, {
                    pin: value == "0" ? "1" : "0",
                  });
                  sQuery.set(
                    (pre) => (pre.value.revalidate = !pre.value.revalidate)
                  );
                  if (status === 200) {
                    message.success("Post pinned successfully");
                  } else message.error("Error, please try again later");
                }}
              />
            </ConfigProvider>
          )}
        </>
      ),
    },
    auth.role == Role.ADMIN
      ? {
          title: language[config.language].update,
          key: "action",
          dataIndex: "action",
          render: (_, record) => (
            <div className="flex gap-4">
              {!(record.title.props?.children?.length > 1) && (
                <UpdateModal record={record} form={form(record)} min={true} />
              )}
            </div>
          ),
        }
      : {
          title: language[config.language].confirmStatus,
          key: "adminApprove",
          dataIndex: "admin_approve",
          render: (value) => (
            <Tag color={value == "1" ? "green-inverse" : "volcano-inverse"}>
              {language[config.language][value == "1" ? "approved" : "pending"]}
            </Tag>
          ),
        },
  ];
};
