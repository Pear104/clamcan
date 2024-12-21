import { Card } from "antd";
import { GET } from "app/modules/request";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import language from "app/locales/pages/Home/HeroSection.json";
import { sConfig } from "app/stores/configStore";
import posts from "mocks/posts.json";

const Item = ({ data }) => {
  const daysUntil = (targetDateStr) =>
    Math.ceil((new Date(targetDateStr) - new Date()) / (1000 * 60 * 60 * 24));
  const config = sConfig.use();

  return (
    <Link
      to={`/jobs/${data?.postId ?? data?.post_id}`}
      className="group transition-all hover:scale-105"
    >
      <Card
        title={data.company_industry}
        extra={
          <div className="p-2 bg-slate-100 group-hover:bg-emerald-400 rounded-full transition-all duration-300">
            <ArrowRight
              size={15}
              className="group-hover:text-white text-emerald-600"
            />
          </div>
        }
        hoverable
      >
        <div className="flex items-center">
          <div className="p-2 bg-white rounded-md">
            <div
              className="bg-no-repeat bg-contain bg-center aspect-square w-12"
              style={{
                backgroundImage: `url(${data.logo})`,
              }}
            ></div>
          </div>
          <div className="ml-5">
            <p
              className="font-bold w-[220px] text-lg truncate"
              title={data.title}
            >
              {data.title}
            </p>
            <p className="text-slate-500">{data.country}</p>
          </div>
        </div>

        <p className="my-2">{data.summary}</p>
        <p className="text-slate-500">
          {language[config.language].only} {Math.abs(daysUntil(data.to_date))}{" "}
          {language[config.language].dayLeft}
        </p>
      </Card>
    </Link>
  );
};

export default function PopularJobs() {
  const config = sConfig.use();
  const [listData, setListData] = useState([]);
  useEffect(() => {
    (async () => {
      setListData(posts);
      // const { data } = await GET("/home/post", false);
      // setListData(data.data?.pinPost.concat(data.data?.normalPost));
    })();
  }, []);
  return (
    <div className="py-24 flex flex-col items-center relative md:pb-24 pb-16 bg-slate-200 dark:bg-zinc-700">
      <div className="container">
        <div className="grid grid-cols-1 pb-8 text-center">
          <h3 className="mb-4 md:text-5xl md:leading-normal text-2xl leading-normal font-semibold">
            {language[config.language].popularJobs}
          </h3>

          <p className="max-w-xl mx-auto">
            {language[config.language].popularDesc}
          </p>
        </div>

        <div className="grid md:grid-cols-4 mt-8 gap-[30px]">
          {listData
            // ?.reverse()
            ?.slice(0, 8)
            ?.map((item) => (
              <Item data={item} key={item.post_id ?? item.postId} />
            ))}
        </div>

        <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
          <div className="md:col-span-12 text-center">
            <Link
              to="/jobs"
              className="text-slate-400 hover:text-emerald-600 after:bg-emerald-600 transition-all"
            >
              {language[config.language].seeMore}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
