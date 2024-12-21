import MDEditor from "@uiw/react-md-editor";
import { Badge, Button, Select, Tag } from "antd";
import { Bookmark, RotateCcw, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { GET } from "app/modules/request";
import SearchBox from "app/components/SearchBox";
import Content from "./partials/Content";
import JobList from "app/components/JobList";
import { getRandomInt } from "app/modules/random";
import { useSearchParams } from "react-router-dom";
import countries from "mocks/countries";
import companyType from "mocks/companyType";
import industry from "mocks/companyIndustry";
import posts from "mocks/posts.json";

export default function JobListPage() {
  const [listData, setListData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    name: searchParams.get("name") || "",
    country: searchParams.get("country") || "",
    companyType: searchParams.get("companyType") ?? "",
    industry: searchParams.get("companyIndustry") ?? "",
  });
  useEffect(() => {
    (async () => {
      // const { data } = await GET("/posts", false);
      // setListData(data.data);
      setListData(posts);
    })();
  }, []);
  return (
    <div className="min-h-screen">
      <div className="w-full bg-zinc-200 dark:bg-secondary px-16">
        <div className="container mx-auto flex flex-col items-center pb-6 gap-2 bg-white rounded-lg dark:bg-[#141414]">
          <div
            className="bg-cover w-full h-[200px] bg-no-repeat bg-top bg-green-300 relative"
            style={{
              backgroundImage: `url(/bg.jpg)`,
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat bg-green-600/80 flex flex-col justify-center pl-8 font-bold text-white">
              <div className="text-3xl mb-2">
                Search for your dream job now!
              </div>
              <div className="text-4xl">
                There are 675,834{" "}
                {/* {getRandomInt(10000, 1000000).toLocaleString()} */}
                jobs available
              </div>
            </div>
          </div>
          <div className="w-full px-4">
            <div className="flex items-center gap-4">
              <SearchBox
                placeholder="Search Jobs..."
                widthClass="w-1/2 py-2"
                className="!bg-gray-100 py-2 dark:!bg-zinc-800"
                onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                value={filter.name}
              />
            </div>
            <div className="flex gap-4">
              <select
                className="max-w-[140px] !text-sm py-1 px-2 input-style"
                onChange={(e) =>
                  setFilter({ ...filter, country: e.target.value })
                }
                value={filter.country}
              >
                <option className="" value={""}>
                  Country
                </option>
                {countries.map((item) => (
                  <option key={item} className="" value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                className="max-w-[140px] !text-sm py-1 px-2 input-style"
                onChange={(e) =>
                  setFilter({ ...filter, companyType: e.target.value })
                }
                value={filter.companyType}
              >
                <option className="" value={""}>
                  Company Type
                </option>
                {companyType.map((item) => (
                  <option key={item} className="" value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                className="max-w-[140px] !text-sm py-1 px-2 input-style"
                onChange={(e) =>
                  setFilter({ ...filter, industry: e.target.value })
                }
                value={filter.industry}
              >
                <option className="" value={""}>
                  Company Industry
                </option>
                {industry.map((item) => (
                  <option className="" value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <button
                className="rounded-full !text-sm py-2 px-2 font-semibold hover:bg-slate-400 hover:text-white"
                type="primary"
                onClick={() => {
                  setFilter({
                    name: "",
                    country: "",
                    industry: "",
                    companyType: "",
                  });
                }}
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto w-full flex flex-col items-center py-6 gap-4">
          <div className="w-full grid grid-cols-12 gap-x-4">
            <JobList limit={100} filter={filter} />
            <Content postId={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
