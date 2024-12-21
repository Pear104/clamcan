import { App, Button, Tag } from "antd";
import { sConfig } from "app/stores/configStore";
import { Link, useSearchParams } from "react-router-dom";
import { z } from "zod";
import dayjs from "dayjs";
import { sAuth } from "app/stores/authStore";
import { Role } from "app/enums/Role";
import { DELETE, PATCH } from "app/modules/request";
import { sQuery } from "app/stores/queryStore";
import language from "app/locales/pages/Worker/CampaignManager/CampaignList.json";
import errMsg from "app/locales/errMsg.json";
import UpdateModal from "app/components/UpdateModal";
import ConfirmModal from "app/components/ConfirmModal";
import { Suspense } from "react";
import { getRandomInt } from "app/modules/random";

export const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: errMsg.required })
    .max(20, { message: errMsg.tooLong }),
});

export const labelColumns = () => {
  const [searchParams] = useSearchParams();
  const config = sConfig.use();
  const auth = sAuth.use();

  return [
    {
      title: "No.",
      dataIndex: "key",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Label Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <>
          {text?.props?.children?.length > 1 ? text : <Tag>{text}</Tag>}
          {auth.role == Role.ADMIN &&
            searchParams.get("mode")?.includes("test") && (
              <Button
                color="danger"
                variant="outlined"
                className="ml-3"
                onClick={async () => {
                  await DELETE(`/label/${text}`);
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
      title: "Posts Owned",
      dataIndex: "name",
      key: "name",
      render: (text, record) => getRandomInt(0, 1000).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <>
          {getRandomInt(0, 2) ? (
            <Tag color="error">Disabled</Tag>
          ) : (
            <Tag color="green">Active</Tag>
          )}
        </>
      ),
    },
  ];
};
