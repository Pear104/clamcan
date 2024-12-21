import { Button, Calendar, ConfigProvider, Modal, Popover, Tag } from "antd";
import { Link } from "react-router-dom";
import UserPopover from "../UserList/partials/UserPopover";
import { useState } from "react";
import ScheduleInterview from "../../PostManager/PostDetail/partials/ScheduleInterview";
import ScheduleForm from "../../PostManager/PostDetail/partials/ScheduleForm";
import dayjs from "dayjs";
import { CalendarRange, ExternalLink } from "lucide-react";
import UpdateModal from "app/components/UpdateModal";
import CreateReviewForm from "../../forms/CreateReviewForm";

export const userColumns = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = (record) => {
    return (setIsModalOpen) => (
      <CreateReviewForm setIsModalOpen={setIsModalOpen} record={record} />
    );
  };

  const formSchedule = (record) => {
    return (setIsModalOpen) => (
      <ScheduleForm setIsModalOpen={setIsModalOpen} record={record} />
    );
  };

  return [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <Link
          to={`/worker/users/${text}`}
          className="text-xs"
        >{`#${text}`}</Link>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        text ? (
          <Popover content={<UserPopover record={record} />}>
            <Link className="" to={`/worker/users/${record.id}`}>
              {text}
            </Link>
          </Popover>
        ) : (
          "No data"
        ),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imageLink) =>
        imageLink ? (
          <img class="fit-picture" src={imageLink} alt="User's avatar" />
        ) : (
          "No data"
        ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <Popover content={<UserPopover email={record?.email} />}>
          <a className="" href={`mailto:${record.email}`}>
            {text}
          </a>
        </Popover>
      ),
    },
    {
      title: "CV",
      dataIndex: "cvPath",
      key: "cvPath",
      render: (text, record) => (
        <a
          href={`https://file.nglearns.dev/${record.cvPath}`}
          className="flex gap-2 items-center font-semibold text-green-500 hover:text-green-600"
          target="_blank"
        >
          Link <ExternalLink size={16} />
        </a>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text) =>
        text ? (
          <div>{dayjs(text).format("DD/MM/YYYY - HH:mm")}</div>
        ) : (
          "No data"
        ),
    },
    {
      title: "Meeting Url",
      dataIndex: "meetingUrl",
      key: "meetingUrl",
      render: (text) =>
        text ? (
          <a
            href={text}
            className="flex gap-2 items-center font-semibold text-green-500 hover:text-green-600"
            target="_blank"
          >
            Link <ExternalLink size={16} />
          </a>
        ) : (
          "No data"
        ),
    },
    {
      title: "Passed",
      dataIndex: "isPassed",
      key: "isPassed",
      render: (text) =>
        text == null ? "Under review" : text == "1" ? "Passed" : "Not passed",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (text) =>
        text == null ? "No data" : <div className="max-w-[300px]">{text}</div>,
    },
    {
      title: "Update",
      dataIndex: "schedule",
      key: "schedule",
      render: (text, record) => (
        <div className="flex gap-2">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#1677FF",
              },
            }}
          >
            {!record?.time && (
              <div className="flex gap-4">
                {
                  <UpdateModal
                    record={record}
                    form={formSchedule(record)}
                    icon={<CalendarRange size={20} />}
                    min={true}
                    title={`Schedule interview for ${record?.email}`}
                  />
                }
              </div>
            )}
          </ConfigProvider>

          <div className="flex gap-4">
            {record?.time &&
              record?.isPassed == null && ( // Only interviewed candidate can be reviewed
                <UpdateModal
                  record={record}
                  form={form(record)}
                  min={true}
                  title={`Review candidate ${record?.email}`}
                />
              )}
          </div>
        </div>
      ),
    },
  ];
};
