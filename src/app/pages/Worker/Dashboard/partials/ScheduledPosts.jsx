import { List, Tag } from "antd";
import { GET } from "app/modules/request";
// import postData from "mocks/posts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import language from "app/locales/pages/Worker/Dashboard.json";
import { sConfig } from "app/stores/configStore";
import dayjs from "dayjs";
import { Clock } from "lucide-react";
import { defaultErrImg } from "app/modules/default";

const ScheduledPosts = ({ posts = [] }) => {
  const config = sConfig.use();
  const navigate = useNavigate();

  return (
    <List
      className="bg-white dark:bg-zinc-900 border-0"
      header={
        <div className="text-xl">
          {language[config.language].scheduledPosts}
        </div>
      }
      bordered
      dataSource={posts.slice(0, 5)}
      loading={posts?.length == 0}
      renderItem={(item) => (
        <List.Item className="flex flex-col items-start">
          <div className="flex w-full">
            <img
              className="mt-2 w-12 aspect-square rounded-xl object-cover object-center bg-white border"
              src={item.logo}
              alt="no-image"
              onError={(e) => {
                e.target.src = defaultErrImg;
              }}
            />
            <div className="flex-1 ml-4 w-3/4">
              <div
                title={item.title}
                className="hover:text-emerald-400 cursor-pointer font-semibold w-full truncate mb-1"
                onClick={() => navigate(`/worker/posts/${item.postId}`)}
              >
                {item.title}
              </div>
              <span className="flex gap-y-2 flex-wrap">
                <Tag className="text-xs">{item.country}</Tag>

                <Tag className="text-xs">{item.company_industry}</Tag>
              </span>
            </div>
          </div>

          <div className="w-full text-sm flex mt-1 gap-2 items-center font-semibold justify-end">
            <Clock size={14} />
            {dayjs(item?.from_date).format("DD/MM/YYYY")} -{" "}
            {dayjs(item?.to_date).format("DD/MM/YYYY")}
          </div>
        </List.Item>
      )}
    />
  );
};

export default ScheduledPosts;
