import { Button, Tag } from "antd";
import { defaultAvatar } from "app/modules/default";
import { sConfig } from "app/stores/configStore";
import { Link, useSearchParams } from "react-router-dom";
import { z } from "zod";
import language from "app/locales/pages/Worker/AccountManager/AccountList.json";
import { DELETE } from "app/modules/request";
import { sAuth } from "app/stores/authStore";
import { Role } from "app/enums/Role";
import { sQuery } from "app/stores/queryStore";
import errMsg from "app/locales/errMsg.json";

export const schema = z.object({
  email: z.string().email({ message: errMsg.required }),
  password: z.string().min(8, { message: errMsg.passMin8Char }),
  role: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: errMsg.chooseRole,
  }),
});

export const schemaManager = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: errMsg.passMin8Char }),
});

export const accountColumns = () => {
  const config = sConfig.use();
  const auth = sAuth.use();
  const [searchParams] = useSearchParams();

  return [
    {
      title: language[config.language].name,
      dataIndex: "name",
      key: "name",
      render: (text) => (text ? text : "---"),
    },
    {
      title: language[config.language].avatar,
      dataIndex: "avatar",
      key: "avatar",
      render: (imageLink) => (
        <img
          className="w-8 aspect-square rounded-full object-cover object-center bg-white border border-zinc-600"
          src={
            imageLink
              ? process.env.REACT_APP_AVATAR_URL + imageLink
              : defaultAvatar
          }
          alt="User's avatar"
        />
      ),
    },
    {
      title: language[config.language].email,
      dataIndex: "email",
      key: "email",

      render: (text) => (
        <>
          {text ? (
            text.includes("| new") ? (
              <div>
                <div>{text.replace("| new", "")}</div>
                <Tag color="green-inverse" className="mt-1">
                  Recently Added
                </Tag>
              </div>
            ) : (
              text
            )
          ) : (
            "---"
          )}
          {auth.role == Role.ADMIN &&
            searchParams.get("mode")?.includes("test") && (
              <Button
                className="ml-3"
                onClick={async () => {
                  await DELETE("/account", { email: text });
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
      title: language[config.language].phone,
      dataIndex: "phone",
      key: "phone",
      render: (text) => (text ? text : "---"),
    },
    {
      title: language[config.language].role,
      dataIndex: "role",
      key: "role",
      render: (value) => {
        if (value == 1)
          return (
            <Tag color={"geekblue-inverse"}>
              {language[config.language].manager}
            </Tag>
          );
        else if (value == 2)
          return (
            <Tag color={"cyan-inverse"}>
              {language[config.language].interviewer}
            </Tag>
          );
        else return "---";
      },
    },
  ];
};
