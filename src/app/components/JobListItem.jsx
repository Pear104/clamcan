import { useEffect, useState } from "react";
import { DELETE, GET, POST } from "app/modules/request";
import { App, Button, Skeleton, Tag } from "antd";
import MDEditor from "@uiw/react-md-editor";
import { Link, useNavigate } from "react-router-dom";
import { Heart, HeartOff } from "lucide-react";
import { sQuery } from "app/stores/queryStore";
import { defaultErrImg } from "app/modules/default";
import { sContent } from "app/pages/JobList/contentStore";
import { getRandomInt } from "app/modules/random";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const JobListItem = ({ data, navigatable = false, favItem = false }) => {
  dayjs.extend(relativeTime);
  const { message } = App.useApp();
  const content = sContent.use();
  const navigate = useNavigate();

  return (
    <div
      className={`w-full flex flex-col gap-2 rounded-xl p-8 cursor-pointer bg-white dark:!bg-[#141414] hover:shadow-lg hover:scale-[1.02] transition-all duration-100 relative border dark:border-zinc-800 ${
        content.postId == (data?.post_id ?? data?.postId) && !navigatable
          ? "border-l-8 border-2 !border-emerald-400"
          : ""
      }`}
      onClick={() => {
        if (!navigatable) {
          sContent.set(
            (pre) => (pre.value.postId = data?.post_id ?? data?.postId)
          );
        } else {
          // navigate(`/`);
          navigate(`/jobs/${data?.postId ?? data?.post_id}`);
        }
      }}
    >
      {content.postId == (data?.post_id ?? data?.postId) && !navigatable && (
        <div className="absolute top-4 -right-4 px-1 -z-0 border-y-8  border-y-transparent border-l-8 border-emerald-400" />
      )}
      {data?.pin == "1" && (
        <>
          <div className="rounded-l-md absolute bottom-4 right-0 px-6 py-2 -z-0 bg-red-600 text-sm font-bold text-white">
            HOT
          </div>
          <div className="rounded-r-md absolute bottom-4 -right-2 px-1 py-6 -z-0 bg-red-400" />
          <div className="rounded-r-md absolute bottom-[52px] -right-2 px-1 py-2 -z-0 bg-red-800" />
        </>
      )}
      <div className="flex gap-6 items-center mb-2">
        <img
          src={data?.logo}
          onError={(e) => {
            e.target.src = defaultErrImg;
          }}
          className="object-cover aspect-square w-14 rounded-md"
        />
        <div>
          <div
            className={`font-bold text-xl uppercase bg-transparent line-clamp-1 ${
              navigatable && "hover:underline"
            }`}
            onClick={() =>
              navigatable && navigate(`/jobs/${data?.post_id ?? data?.postId}`)
            }
            title={data?.title}
          >
            {data?.title}
          </div>
          <div className="text-sm font-semibold opacity-60 mt-1">
            {data?.country}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-y-2">
        <Tag color="geekblue-inverse">{data?.working_days}</Tag>
        <Tag color="geekblue-inverse">{data?.company_industry}</Tag>
        {data?.labels?.map((item) => (
          <Tag key={item} color="magenta-inverse" className="">
            {item}
          </Tag>
        ))}
      </div>
      <div className="line-clamp-4">{data?.summary}</div>
      <div className="flex gap-2 items-center">
        <Button
          type="primary"
          className="font-bold py-5 px-6 hover:scale-105"
          onClick={() => {
            if (navigatable) navigate(`/jobs/${data?.post_id ?? data?.postId}`);
            else sContent.set((pre) => (pre.value.postId = data?.post_id));
          }}
        >
          View Job
        </Button>
        <Button
          type="link"
          icon={
            data.isFav || favItem ? (
              <HeartOff absoluteStrokeWidth size={18} />
            ) : (
              <Heart absoluteStrokeWidth size={18} />
            )
          }
          className="font-bold py-5 px-4 !border-2 !border-emerald-400 hover:scale-105"
          onClick={async () => {
            if (data.isFav || favItem) {
              const { status } = await DELETE(
                `/favorite/${data?.post_id ?? data?.postId}`
              );
              if (status === 200) {
                message.success("Post removed from favorites");
                sQuery.set(
                  (pre) => (pre.value.revalidate = !pre.value.revalidate)
                );
              }
            } else {
              const { status } = await POST(
                `/favorite/${data?.post_id ?? data?.postId}`
              );
              if (status === 200) {
                message.success("Post added to favorites");
                sQuery.set(
                  (pre) => (pre.value.revalidate = !pre.value.revalidate)
                );
              } else message.error("Error, you already favorited this post");
            }
          }}
        >
          {data?.isFav || favItem ? "Unfavorite" : "Favorite"}
        </Button>
      </div>
      <div className="text-gray-500 text-sm">
        Active {dayjs(data?.from_date).fromNow()}
      </div>
    </div>
  );
};

export default JobListItem;
