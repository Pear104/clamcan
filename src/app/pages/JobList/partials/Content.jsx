import { useEffect, useState } from "react";
import { DELETE, GET, POST } from "app/modules/request";
import { App, Button, Skeleton, Tag } from "antd";
import MDEditor from "@uiw/react-md-editor";
import dayjs from "dayjs";
import { Bookmark, Clock, Heart, HeartOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sContent } from "../contentStore";
import { sQuery } from "app/stores/queryStore";
import posts from "mocks/posts.json";

const Content = ({ postId }) => {
  const content = sContent.use();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [contentData, setContentData] = useState({});

  useEffect(() => {
    (async () => {
      // const { data } = await GET(
      //   `/home/post/${content.postId || postId}`,
      //   false
      // );
      setContentData(posts[content.postId - 1]);
    })();
  }, [content.postId, postId, sQuery.use().revalidate]);

  return (
    <div className="col-span-7">
      <div className="w-full sticky max-h-screen overflow-y-scroll no-scrollbar top-0 flex flex-col px-8 py-8 rounded-xl text-lg bg-white dark:bg-[#141414]">
        <div className="flex gap-6">
          {!contentData.logo ? (
            <Skeleton.Image active />
          ) : (
            <img
              src={contentData?.logo}
              className="object-cover h-[120px] aspect-square rounded-md border-zinc-400 dark:border-zinc-700"
            />
          )}
          <div className="!w-full">
            <div
              onClick={() => navigate(`/jobs/${contentData?.post_id}`)}
              className="w-full font-bold text-3xl uppercase hover:underline"
            >
              {!contentData?.title ? (
                <Skeleton.Input className="w-full" block active />
              ) : (
                contentData?.title
              )}
            </div>
            <div className="text-sm font-semibold opacity-60 my-1">
              {!contentData?.country ? (
                <Skeleton.Input className="my-1 w-full" active />
              ) : (
                contentData?.country
              )}
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
          </div>
        </div>
        <div className="flex items-center gap-4 my-3">
          <span className="flex gap-2 text-base font-semibold items-center">
            <Clock size={16} /> Available time:{" "}
          </span>
          <div className="flex items-center">
            {dayjs(contentData?.from_date).format("DD/MM/YYYY")}
            {" - "}
            {dayjs(contentData?.to_date).format("DD/MM/YYYY")}
          </div>
        </div>
        <div className="flex gap-4 border-b border-zinc-600 pb-4">
          <Button
            type="primary"
            className="font-bold py-5 px-6 hover:scale-[101%] w-full"
            onClick={() => navigate(`/jobs/${contentData?.post_id}`)}
            disabled={contentData?.isApply}
          >
            {contentData?.isApply ? "Applied" : "Apply now"}
          </Button>
          <Button
            onClick={async () => {
              if (contentData?.isFav) {
                const { status } = await DELETE(
                  `/favorite/${contentData?.post_id}`
                );
                if (status === 200)
                  message.success("Post removed from your favorites");
                else message.error("Please login first");
              } else {
                const { status } = await POST(
                  `/favorite/${contentData?.post_id}`
                );
                if (status === 200) message.success("Post added to favorites");
                else message.error("Please login first");
              }
              sQuery.set(
                (pre) => (pre.value.revalidate = !pre.value.revalidate)
              );
            }}
            type="link"
            className="font-bold py-5 px-4 !border-2 !border-emerald-400 hover:scale-105"
          >
            {contentData?.isFav ? <HeartOff size={20} /> : <Heart size={20} />}
          </Button>
        </div>
        <div className="overflow-y-scroll small-scrollbar">
          <div className="text-3xl font-bold my-4">Summary</div>
          {!contentData?.summary ? (
            <Skeleton active paragraph={{ rows: 3 }} />
          ) : (
            <div className="text-base">{contentData?.summary}</div>
          )}

          <div className="text-3xl font-bold my-4">Description</div>
          {!contentData?.description ? (
            <Skeleton active paragraph={{ rows: 3 }} />
          ) : (
            <MDEditor.Markdown
              source={contentData?.description}
              className="dark:bg-[#141414]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
