import { Button, Modal, Skeleton, Table, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import {
  CalendarRange,
  CircleDollarSign,
  Clock,
  Eye,
  FilePenLine,
  Info,
  PencilLine,
  RotateCcw,
  SquareChartGantt,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import userData from "mocks/users";
import postDatas from "mocks/posts";
import { getRandomInt } from "app/modules/random";
// import { postColumns } from "../schemas";
import { userColumns } from "../../UserManager/schemas";
import SearchBox from "app/components/SearchBox";
import CreateModal from "app/components/CreateModal";
import CreateUserForm from "../../forms/CreateUserForm";
import MDEditor from "@uiw/react-md-editor";
import dayjs from "dayjs";
import CreatePostForm from "../../forms/CreatePostForm";
import { sQuery } from "app/stores/queryStore";
import StatItem from "app/components/StatItem";
import ScheduleInterview from "./partials/ScheduleInterview";
import { GET } from "app/modules/request";

export default function PostDetail() {
  const [postData, setPostData] = useState({});
  const [interviewData, setInterviewData] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    isPassed: "",
  });
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const { status, data } = await GET(`/post/${id}`);
      if (status === 200) setPostData(data.data);
      const res = await GET("/apply");
      if (res.status === 200) {
        const filteredPost = res.data.data.filter((item) => item.id == id);
        setInterviewData(filteredPost);
      }
    })();
  }, [sQuery.use().revalidate]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="w-full bg-white dark:bg-[#141414] rounded-md p-4 border border-zinc-800 col-span-7">
          <div className="flex gap-4">
            <div className="w-full">
              <div className="text-2xl font-semibold flex justify-between gap-8 dark:text-white grow"></div>
            </div>
          </div>
          <div className="px-2 text-2xl font-semibold">Description</div>
          {!postData?.description ? (
            <Skeleton className="mt-3" block active paragraph={{ rows: 20 }} />
          ) : (
            <MDEditor.Markdown
              source={postData?.description}
              className="py-2 px-2 dark:!bg-[#141414]"
            />
          )}
        </div>
        <div className="col-span-5">
          <div className="sticky top-4">
            <div className="flex flex-col items-start gap-2 w-full bg-white dark:bg-[#141414] rounded-md mb-2 p-4 border border-zinc-800">
              <div className="flex gap-2 w-full">
                {!postData?.logo ? (
                  <Skeleton.Image active />
                ) : (
                  <div
                    style={{ backgroundImage: `url(${postData?.logo})` }}
                    className="aspect-square h-[90px] bg-center bg-cover rounded-xl bg-white dark:bg-[#141414]"
                  ></div>
                )}
                <div className="w-full">
                  <div
                    className="text-lg flex items-center w-full font-medium table-cell-title"
                    title={postData?.title}
                  >
                    {!postData?.title ? (
                      <Skeleton.Input className="w-full" block active />
                    ) : (
                      <div className="">
                        {postData?.title}{" "}
                        <span className="text-sm mr-1 font-semibold">
                          (#{postData?.post_id})
                        </span>
                      </div>
                    )}
                  </div>
                  {postData?.title ? (
                    <>
                      <Tag className="text-xs">{postData?.country}</Tag>
                      <Tag
                        className="mt-1 text-xs"
                        color={
                          dayjs().isBefore(dayjs(postData?.from_date))
                            ? "red-inverse"
                            : dayjs().isAfter(dayjs(postData?.from_date))
                            ? "blue-inverse"
                            : "green-inverse"
                        }
                      >
                        {dayjs().isBefore(dayjs(postData?.from_date))
                          ? "Not Started"
                          : dayjs().isAfter(dayjs(postData?.from_date))
                          ? "Ongoing"
                          : "Completed"}
                      </Tag>
                    </>
                  ) : (
                    <Skeleton.Input className="mt-1" active />
                  )}
                </div>
              </div>
              <div className="flex gap-3 nunito-sans my-2 justify-between w-full">
                {!postData?.title ? (
                  <Skeleton.Input className="mt-1" block active />
                ) : (
                  <>
                    <StatItem
                      icon={
                        <div className="p-2 bg-blue-200 rounded-md">
                          <Users
                            size={24}
                            className="text-blue-500"
                            absoluteStrokeWidth
                          />
                        </div>
                      }
                      label={"Industry"}
                      value={postData?.company_industry}
                    />
                    <StatItem
                      icon={
                        <div className="p-2 bg-green-200 rounded-md">
                          <CircleDollarSign
                            size={24}
                            className="text-green-500"
                            absoluteStrokeWidth
                          />
                        </div>
                      }
                      label={"Company Type"}
                      value={postData?.company_type}
                    />
                    <StatItem
                      icon={
                        <div className="p-2 bg-purple-200 rounded-md">
                          <CalendarRange
                            size={24}
                            className="text-purple-500"
                            absoluteStrokeWidth
                          />
                        </div>
                      }
                      label={"Size"}
                      value={postData?.company_size}
                    />
                  </>
                )}
              </div>
              {!postData?.title ? (
                <Skeleton.Input className="mb-1" active />
              ) : (
                <div className="font-semibold">
                  Working days: <span>{postData?.working_days}</span>
                </div>
              )}
              {!postData?.title ? (
                <Skeleton className="mt-1" active paragraph={{ rows: 3 }} />
              ) : (
                <div className="my-3">
                  <div className="text-2xl font-semibold">Summary</div>
                  <MDEditor.Markdown
                    source={postData?.summary}
                    className="py-2 dark:bg-[#141414]"
                  />
                </div>
              )}

              {!postData?.title ? (
                <Skeleton.Input className="mt-1" block active />
              ) : (
                <div className="flex gap-2 justify-between w-full">
                  <div className="flex gap-2">
                    <CreateModal
                      icon={<PencilLine size={20} />}
                      children={"Update"}
                      modalTitle={`Update #${postData?.post_id}`}
                      form={(setIsModalOpen) => (
                        <CreatePostForm
                          setIsModalOpen={setIsModalOpen}
                          record={postData}
                        />
                      )}
                    />
                    <>
                      <Button
                        className="font-semibold"
                        icon={<CalendarRange size={20} />}
                        onClick={() => setIsModalOpen(true)}
                      >
                        Schedule
                      </Button>
                      <Modal
                        title="Schedule Interview"
                        open={isModalOpen}
                        onOk={() => setIsModalOpen(true)}
                        onCancel={() => setIsModalOpen(false)}
                        centered
                        width={1400}
                      >
                        <ScheduleInterview interviewData={interviewData} />
                      </Modal>
                    </>
                    <a href={`/jobs/${postData?.post_id}`} target="_blank">
                      <Button icon={<Eye size={20} />}></Button>
                    </a>
                  </div>
                  <div className="text-xs flex gap-2 items-center font-semibold justify-end">
                    <Clock size={20} />
                    {dayjs(postData?.from_date).format("DD/MM/YYYY")} -{" "}
                    {dayjs(postData?.to_date).format("DD/MM/YYYY")}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full bg-white dark:bg-[#141414] rounded-md mb-2 p-4 border border-zinc-800">
              <div className="text-2xl font-semibold mb-2 flex gap-2 items-center">
                <Info size={20} />
                Meta Info
              </div>
              {!postData?.title ? (
                <Skeleton.Input className="my-1" block active />
              ) : (
                <>
                  <div className="font-semibold mb-2">
                    Campaign:{" "}
                    <Link
                      to={`/worker/campaigns/${postData?.campaign_id}`}
                      className="font-normal"
                    >
                      {postData?.compaign_name} (#{postData?.campaign_id})
                    </Link>
                  </div>
                  <div className="mb-2 font-semibold">
                    Interviewer:{" "}
                    <a
                      href={`mailto:${postData?.account_email}`}
                      className="font-normal"
                    >
                      {postData?.account_email}
                    </a>
                  </div>
                </>
              )}

              <div className="text-xl font-semibold">Overtime Policy</div>
              {!postData?.title ? (
                <Skeleton.Input className="my-1" block active />
              ) : (
                <MDEditor.Markdown
                  source={postData?.overtime_policy}
                  className="py-2 dark:!bg-[#141414]"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-start gap-2">
          <SearchBox
            value={filter?.name}
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
          />
          <select
            className="max-w-[140px] !text-sm py-1 px-2 input-style"
            onChange={(e) => {
              console.log(e.target.value);
              setFilter({ ...filter, isPassed: e.target.value });
            }}
            value={filter.isPassed}
          >
            <option className="" value={""}>
              Status
            </option>
            <option className="" value={"1"}>
              Passed
            </option>
            <option className="" value={"0"}>
              Not passed
            </option>
          </select>
          <button
            className="rounded-full !text-sm py-2 px-3 font-semibold hover:bg-slate-400 hover:text-white"
            type="primary"
            onClick={() => {
              setFilter({
                name: "",
                isPassed: "",
              });
            }}
          >
            <RotateCcw size={16} />
          </button>
        </div>
        <div className="border rounded-md border-black/20 mt-4 mb-8">
          <Table
            title={() => (
              <div className="text-xl font-semibold">
                Candidates of Post #{postData?.post_id}
              </div>
            )}
            columns={userColumns().filter((c) => includeCol.includes(c.key))}
            dataSource={interviewData.filter(
              (item) =>
                item.email.includes(filter.name.toLocaleLowerCase()) &&
                (item.isPassed ?? "").includes(filter.isPassed)
            )}
          />
        </div>
      </div>
    </>
  );
}

const includeCol = [
  "title",
  "email",
  "time",
  "meetingUrl",
  "isPassed",
  "schedule",
  "cvPath",
  "note",
];
