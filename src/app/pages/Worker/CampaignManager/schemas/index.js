import {
  App,
  Button,
  ConfigProvider,
  message,
  Modal,
  Popover,
  Tag,
  Tooltip,
} from "antd";
import { sConfig } from "app/stores/configStore";
import { Link, useSearchParams } from "react-router-dom";
import { z } from "zod";
import dayjs from "dayjs";
import { sAuth } from "app/stores/authStore";
import { Role } from "app/enums/Role";
import { Check, FilePenLine, ListCheck } from "lucide-react";
import { DELETE, PATCH } from "app/modules/request";
import { sQuery } from "app/stores/queryStore";
import CreateCampaignForm from "../../forms/CreateCampaignForm";
import CreateModal from "app/components/CreateModal";
import language from "app/locales/pages/Worker/CampaignManager/CampaignList.json";
import errMsg from "app/locales/errMsg.json";
import UpdateModal from "app/components/UpdateModal";
import ConfirmModal from "app/components/ConfirmModal";
import { render } from "@testing-library/react";
import CampaignPopover from "../CampaignList/partials/CampaignPopover";

export const schema = () => {
  const config = sConfig.use();

  return z.object({
    name: z
      .string()
      .min(1, { message: errMsg.required })
      .max(50, { message: errMsg.tooLong }),
    startDate: z.string().date(),
    endDate: z.string().date(),
    description: z.string().optional(),
    summary: z.string().optional(),
    logo: z
      .string()
      .min(1, { message: errMsg.required })
      .max(255, { message: errMsg.tooLong }),
    estimated_cost: z.coerce
      .number()
      .min(1, language[config.language].required),
    hiring_count: z.coerce.number().min(1, language[config.language].required),
  });
};

export const campaignColumns = () => {
  const [searchParams] = useSearchParams();
  const { message } = App.useApp();
  const auth = sAuth.use();
  const config = sConfig.use();
  const form = (record) => {
    return (setIsModalOpen) => (
      <CreateCampaignForm setIsModalOpen={setIsModalOpen} record={record} />
    );
  };

  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record) =>
        text?.props?.children?.length > 1 && text.includes("Added") ? (
          "---"
        ) : (
          <Link className="text-xs" to={`/worker/campaigns/${text}`}>
            #{text}
          </Link>
        ),
    },
    {
      title: language[config.language].logo,
      dataIndex: "logo",
      key: "logo",
      render: (text) => (
        <img
          className="w-12 aspect-square object-cover object-center border-zinc-400"
          src={text}
        />
      ),
    },
    {
      title: language[config.language].name,
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <>
          {text?.props?.children?.[1]?.props?.children?.includes("Added") ? (
            text
          ) : (
            <Popover content={<CampaignPopover record={record} />}>
              <Link to={`/worker/campaigns/${record.id}`}>
                <div className="w-[400px] table-cell-title">{text}</div>{" "}
              </Link>
            </Popover>
          )}

          {auth.role == Role.ADMIN &&
            searchParams.get("mode")?.includes("test") && (
              <Button
                className="ml-3"
                onClick={async () => {
                  await DELETE(`/campaign/${record.id}`);
                  sQuery.set(
                    (pre) => (pre.value.revalidate = !pre.value.revalidate)
                  );
                }}
              >
                Delete
              </Button>
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
            dayjs().isBefore(dayjs(record?.startDate)) ||
            record?.admin_approve == "0"
              ? "red-inverse"
              : dayjs().isAfter(dayjs(record?.startDate))
              ? "blue-inverse"
              : "green-inverse"
          }
        >
          {dayjs().isBefore(dayjs(record?.startDate)) ||
          record?.admin_approve == "0"
            ? "Not Started"
            : dayjs().isAfter(dayjs(record?.startDate))
            ? "Ongoing"
            : "Completed"}
        </Tag>
      ),
    },
    {
      title: "Available Time",
      key: "time",
      render: (_, record) => (
        <div className="w-[164px] text-sm">
          {dayjs(record.startDate).format("DD/MM/YYYY")} -{" "}
          {dayjs(record.endDate).format("DD/MM/YYYY")}
        </div>
      ),
    },

    {
      title: language[config.language].hiring_count,
      key: "hiring_count",
      dataIndex: "hiring_count",
      render: (text) => <div>{text.toLocaleString()}</div>,
    },
    {
      title: language[config.language].estimated_cost,
      key: "estimated_cost",
      dataIndex: "estimated_cost",
      render: (text) => <div>${text.toLocaleString()}</div>,
    },
    auth.role == Role.ADMIN
      ? {
          title: language[config.language].action,
          key: "adminApprove",
          render: (_, record) => (
            <div className="flex gap-4">
              {!(record.name.props?.children?.length > 1) && (
                <>
                  {/* <UpdateModal record={record} form={form(record)} /> */}
                  {record.admin_approve == "0" && (
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#1677FF",
                        },
                      }}
                    >
                      <ConfirmModal
                        message={message}
                        record={record}
                        form={form(record)}
                      />
                    </ConfigProvider>
                  )}
                </>
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
