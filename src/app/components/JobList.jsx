import React, { useEffect, useState } from "react";
import JobListItem from "./JobListItem";
import { GET } from "app/modules/request";
import { Skeleton } from "antd";
import { sQuery } from "app/stores/queryStore";
import posts from "mocks/posts.json";

const JobList = ({ limit, navigatable = false, filter, cols = 1 }) => {
  const [listData, setListData] = useState([]);
  useEffect(() => {
    (async () => {
      setListData(posts);
      // const { data } = await GET("/posts", false);
      // setListData(data.data);
      // setListData(data.data.pinPost.concat(data.data.normalPost));
    })();
  }, [sQuery.use().revalidate]);

  return (
    <div
      className={`col-span-5 items-center gap-4 ${
        cols == 1 ? "flex flex-col" : "grid grid-cols-2"
      }`}
    >
      {listData.length == 0 ? (
        <>
          {new Array(5).fill(0).map((_, i) => (
            <div
              key={i}
              className="w-full flex flex-col gap-2 rounded-xl p-8 cursor-pointer bg-white dark:!bg-[#141414] hover:shadow-lg hover:scale-[1.02] transition-all duration-100 relative border dark:border-zinc-800 justify-start"
            >
              <div className="w-full h-full flex justify-center items-start gap-4">
                <Skeleton.Image active />
                <div className="w-full">
                  <Skeleton.Input
                    className="w-full"
                    block
                    active
                    size="small"
                  />
                  <Skeleton.Input className="w-full mt-2" active size="small" />
                </div>
              </div>
              <Skeleton className="mt-2" active size="small" />
            </div>
          ))}
        </>
      ) : (
        listData
          .filter((item) => {
            return (
              item.title
                .toLowerCase()
                .includes((filter?.name || "").toLowerCase()) &&
              item.country
                .toLowerCase()
                .includes((filter?.country || "").toLowerCase()) &&
              item.company_type
                .toLowerCase()
                .includes((filter?.companyType || "").toLowerCase()) &&
              item.company_industry
                .toLowerCase()
                .includes((filter?.industry || "").toLowerCase())
            );
          })
          ?.slice(0, limit)
          .map((item) => (
            <JobListItem
              data={item}
              key={item.post_id ?? item.postId}
              navigatable={navigatable}
            />
          ))
      )}
    </div>
  );
};

export default JobList;
