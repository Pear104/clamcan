import MDEditor from "@uiw/react-md-editor";
import { App, Badge, Button, Modal, Select, Skeleton, Tag } from "antd";
import { Bookmark, Clock, Heart, HeartOff, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DELETE, GET, POST } from "app/modules/request";
import dayjs from "dayjs";
import JobItem from "./partials/JobItem";
import SearchBox from "app/components/SearchBox";
import { List } from "../JobList/JobListPage";
import { useNavigate, useParams } from "react-router-dom";
import CVForm from "./partials/CVForm";
import { sQuery } from "app/stores/queryStore";
import { sAuth } from "app/stores/authStore";
import { Role } from "app/enums/Role";
import JobList from "app/components/JobList";
import posts from "mocks/posts.json";

export default function JobDetail() {
  const { id } = useParams();
  const { message } = App.useApp();
  const [contentData, setContentData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const auth = sAuth.use();

  useEffect(() => {
    (async () => {
      // const { data } = await GET(`/home/post/${id}`, false);
      // setContentData(data?.data);
      setContentData(posts[id - 1]);
    })();
    window.scrollTo({ top: 0 });
  }, [sQuery.use().revalidate, id]);

  return (
    <>
      <div className="py-8 gap-4 bg-zinc-200 dark:bg-zinc-700 w-full px-16 min-h-screen">
        <div className="justify-center w-full grid grid-cols-12 gap-x-4">
          <div className="col-span-7 bg-white dark:bg-[#0D1117] w-full sticky top-4 gap-4 border border-black flex flex-col px-8 py-8 rounded-md text-lg">
            <div>
              <div className="text-3xl font-bold mb-4">Detail description</div>
              {contentData?.description ? (
                <MDEditor.Markdown source={contentData?.description} />
              ) : (
                <Skeleton
                  className="mt-6"
                  block
                  active
                  paragraph={{ rows: 20 }}
                />
              )}
            </div>
          </div>
          <div className="col-span-5">
            <div className="bg-white dark:bg-[#0D1117] w-full sticky top-4 gap-4 border border-black flex flex-col px-8 py-8 rounded-md text-lg">
              <div className="flex gap-6">
                {!contentData.logo ? (
                  <Skeleton.Image active />
                ) : (
                  <img
                    src={contentData?.logo}
                    className="object-cover h-[120px] aspect-square rounded-md border-zinc-400 dark:border-zinc-700"
                  />
                )}
                <div className="w-full">
                  <div className="font-bold text-3xl">
                    {!contentData?.title ? (
                      <Skeleton.Input className="w-full" block active />
                    ) : (
                      contentData?.title
                    )}
                  </div>
                  <div className="text-sm font-semibold opacity-60 pt-2">
                    {!contentData?.country ? (
                      <Skeleton.Input className="w-full mt-1" active />
                    ) : (
                      contentData?.country
                    )}
                  </div>
                </div>
              </div>
              <div>
                {!contentData?.company_industry ? (
                  <Skeleton.Input block active />
                ) : (
                  <>
                    <Tag color="geekblue-inverse">
                      {contentData?.company_industry}
                    </Tag>
                    <Tag color="geekblue-inverse">
                      {contentData?.working_days}
                    </Tag>
                    <Tag color="geekblue-inverse">
                      Size: {contentData?.company_size}
                    </Tag>
                    {contentData?.labels?.map((item) => (
                      <Tag color="magenta-inverse">{item}</Tag>
                    ))}
                  </>
                )}
              </div>
              <h4 className="text-xl font-bold">Summary</h4>

              {contentData?.summary ? (
                contentData?.summary
              ) : (
                <Skeleton
                  className="mt-2"
                  block
                  active
                  paragraph={{ rows: 4 }}
                />
              )}
              <h4 className="text-xl font-bold">Overtime Policy</h4>
              <div>{contentData?.overtime_policy}</div>
              <div className="flex items-center gap-4">
                <span className="flex gap-2 text-base font-semibold">
                  <Clock /> Available time:{" "}
                </span>
                <div className="flex items-center">
                  {dayjs(contentData?.from_date).format("DD/MM/YYYY")}
                  {" - "}
                  {dayjs(contentData?.to_date).format("DD/MM/YYYY")}
                </div>
              </div>

              <div className="flex gap-4">
                <Modal
                  title={
                    <div className="ml-2 text-2xl">Please choose your CV</div>
                  }
                  open={isModalOpen}
                  onOk={() => handleOk(setIsModalOpen)}
                  onCancel={() => setIsModalOpen(false)}
                  centered
                  width={1200}
                  footer={(_, { OkBtn, CancelBtn }) => <></>}
                >
                  <div className="mt-4 overflow-y-scroll mx-2">
                    <CVForm
                      setIsModalOpen={setIsModalOpen}
                      postId={contentData?.post_id}
                    />
                  </div>
                </Modal>
                <Button
                  type="primary"
                  className="py-5 px-6 font-bold"
                  onClick={() => {
                    if (!auth.role) {
                      navigate("/auth/login");
                      message.error("You need to login first");
                    } else {
                      setIsModalOpen(true);
                    }
                  }}
                  disabled={contentData?.isApply}
                >
                  {contentData?.isApply ? "Applied" : "Apply now"}
                </Button>
                <Button
                  onClick={async () => {
                    if (!auth.role) {
                      navigate("/auth/login");
                      message.error("You need to login first");
                    } else {
                      if (contentData?.isFav) {
                        await DELETE(`/favorite/${contentData?.post_id}`);
                        message.success("Post removed from your favorites");
                      } else {
                        await POST(`/favorite/${contentData?.post_id}`);
                        message.success("Post added to favorites");
                      }
                      sQuery.set(
                        (pre) => (pre.value.revalidate = !pre.value.revalidate)
                      );
                    }
                  }}
                  type="link"
                  className="font-bold py-5 px-4 !border-2 !border-emerald-400 hover:scale-105"
                >
                  {contentData?.isFav ? (
                    <HeartOff size={20} />
                  ) : (
                    <Heart size={20} />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mt-6 mb-4">Related Jobs</h3>
          <div className="grid grid-cols-12">
            <div className="col-span-9">
              <JobList cols={2} navigatable limit={8} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
