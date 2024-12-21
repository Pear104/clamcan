import { useEffect, useState } from "react";
import { GET } from "app/modules/request";
import { Button, Skeleton, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";

const JobItem = ({ data, navigatable = false }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full flex flex-col gap-2 border rounded-md p-8 cursor-pointer bg-white"
      onClick={() => {
        navigate(`/jobs/${data?.id}`);
      }}
    >
      <div className="flex gap-6 items-center mb-2">
        <img
          src={data?.logo}
          className="object-contain aspect-square w-14 border rounded-md"
        />
        <div>
          <div className="font-bold text-2xl uppercase truncate-title hover:underline">
            {data?.title}
          </div>
          <div className="text-sm font-semibold opacity-60 pt-1">
            {data?.country}
          </div>
        </div>
      </div>
      <div className="flex">
        <Tag color="geekblue-inverse">{data?.working_days}</Tag>
        <Tag color="geekblue-inverse">{data?.company_industry}</Tag>
        {data?.labels?.map((item) => (
          <Tag color="magenta-inverse">{item}</Tag>
        ))}
      </div>
      <div>
        <li>Tiếp đón khách đến với nhà hàng</li>
        <li>Hỗ trợ dọn dẹp nhà hàng sạch sẽ, thoáng mát</li>
        <li>Phục vụ khách trong suốt bữa ăn, hỗ trợ khách khi cần.</li>
      </div>
      <div className="text-gray-500 text-sm">Active 4 days ago</div>
    </div>
  );
};

export default JobItem;
