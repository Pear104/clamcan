import { useEffect, useState } from "react";
import { sContent } from "../contentStore";
import { GET } from "app/modules/request";
import { App, Button, Skeleton, Tag } from "antd";
import MDEditor from "@uiw/react-md-editor";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const JobListItem = ({ data }) => {
  const { message } = App.useApp();
  return (
    <div
      className="w-full flex flex-col gap-2 border rounded-xl p-8 cursor-pointer bg-white hover:shadow-lg hover:scale-[1.02] transition-all duration-100 relative"
      onClick={() => sContent.set((prev) => (prev.value.id = data?.id))}
    >
      <Button
        type="primary"
        icon={<Heart absoluteStrokeWidth size={14} />}
        className="group-hover:block w-2 rounded-full absolute top-8 right-8"
        onClick={() => {
          let favoritePosts = JSON.parse(localStorage.getItem("favoritePosts"));
          if (
            favoritePosts &&
            !favoritePosts?.some((item) => item.id == data?.id)
          ) {
            favoritePosts.push(data);
          } else {
            favoritePosts = [data];
          }
          localStorage.setItem("favoritePosts", JSON.stringify(favoritePosts));
          message.success("Post added to favorites");
        }}
      />

      <div className="flex gap-6 items-center mb-2">
        <img
          src={data?.logo}
          className="object-contain aspect-square w-14 border rounded-md"
        />
        <div>
          <div className="font-bold text-2xl uppercase truncate-title">
            {data?.title}
          </div>
          <div className="text-sm font-semibold opacity-60">
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
      <div>
        {/* <li>Tiếp đón khách đến với nhà hàng</li>
        <li>Hỗ trợ dọn dẹp nhà hàng sạch sẽ, thoáng mát</li>
        <li>Phục vụ khách trong suốt bữa ăn, hỗ trợ khách khi cần.</li> */}
        {data?.sumary}
      </div>
      <div className="text-gray-500 text-sm">Active 4 days ago</div>
    </div>
  );
};

export default JobItem;
