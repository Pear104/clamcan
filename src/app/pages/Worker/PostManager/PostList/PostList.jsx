import { Table } from "antd";
import React, { useEffect, useState } from "react";
// import postDatas from "mocks/posts";
import { postColumns } from "../schemas";
import CreateModal from "app/components/CreateModal";
import CreatePostForm from "../../forms/CreatePostForm";
import SearchBox from "app/components/SearchBox";
import { GET } from "app/modules/request";
import { sQuery } from "app/stores/queryStore";
import { RotateCcw } from "lucide-react";
import countries from "mocks/countries";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { sAuth } from "app/stores/authStore";
import { Role } from "app/enums/Role";

export default function PostList() {
  const [postData, setPostData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    name: "",
    status: "",
    country: searchParams.get("country") || "",
  });
  const auth = sAuth.use();
  const includeCol = [
    "id",
    // "campaign_id",
    "logo",
    "title",
    "status",
    "country",
    "time",
    // "company_industry",
    "action",
    auth.role == Role.ADMIN ? "pin" : "",
    // "working_days",
  ];
  const query = sQuery.use();
  useEffect(() => {
    (async () => {
      const { data, status } = await GET("/post");
      if (status === 200) {
        setPostData(data.data);
      }
    })();
  }, [query.revalidate]);
  return (
    <>
      <div className="flex justify-between mb-4 items-center">
        <div className="flex gap-3">
          <SearchBox
            value={filter?.name}
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
          />
          <select
            className="max-w-[120px] !text-sm py-1 px-2 input-style"
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option className="" value={""}>
              Status
            </option>
            <option className="" value={"Not started"}>
              Not started
            </option>
            <option className="" value={"Ongoing"}>
              Ongoing
            </option>
            <option className="" value={"Completed"}>
              Completed
            </option>
          </select>

          <select
            className="max-w-[140px] !text-sm py-1 px-2 input-style"
            onChange={(e) => setFilter({ ...filter, country: e.target.value })}
            value={filter.country}
          >
            <option className="" value={""}>
              Country
            </option>
            {countries.map((item) => (
              <option className="" value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            className="rounded-full !text-sm py-2 px-3 font-semibold hover:bg-slate-400 hover:text-white"
            type="primary"
            onClick={() => {
              setFilter({
                name: "",
                status: "",
                country: "",
              });
            }}
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <CreateModal
          children="+ New Post"
          modalTitle={"Create New Post"}
          form={(setIsModalOpen) => (
            <CreatePostForm setIsModalOpen={setIsModalOpen} />
          )}
        />
      </div>
      <Table
        columns={postColumns().filter((col) => includeCol.includes(col.key))}
        dataSource={query.recentlyAdded.post.concat(
          postData.filter((item) => {
            let statusValid = true;
            if (filter.status == "Not started")
              statusValid = dayjs().isBefore(item.from_date);
            if (filter.status == "Ongoing")
              statusValid =
                dayjs().isBefore(dayjs(item.to_date)) &&
                dayjs().isAfter(dayjs(item.from_date));
            if (filter.status == "Completed")
              statusValid = dayjs().isAfter(dayjs(item.to_date));
            return (
              statusValid &&
              item.title.toLowerCase().includes(filter.name.toLowerCase()) &&
              item.country.toLowerCase().includes(filter.country.toLowerCase())
            );
          })
        )}
        pagination={{
          pageSize: 7,
        }}
        rowKey={(record) => record.postId + record.title + record.country}
        loading={postData?.length == 0}
      />
    </>
  );
}
