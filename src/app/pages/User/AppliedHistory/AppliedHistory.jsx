import React, { useEffect, useState } from "react";
import language from "app/locales/pages/User/AppliedHistory.json";
import { sConfig } from "app/stores/configStore";
import { GET } from "app/modules/request";
import { ExternalLink } from "lucide-react";
import dayjs from "dayjs";
import { Pagination } from "antd";
export default function AppliedHistory() {
  const [listData, setListData] = useState([]);
  const [paging, setPaging] = useState({ page: 1, size: 5 });
  const config = sConfig.use();
  useEffect(() => {
    (async () => {
      const { data } = await GET("/user/apply");
      setListData(data.data);
    })();
  }, []);
  return (
    <div className="gap-4 justify-between">
      <div className="my-6 text-3xl font-bold">
        {language[config.language].title}
      </div>
      {<div>{!listData.length && language[config.language].empty}</div>}
      <div className="flex flex-col gap-3">
        {listData?.map((item) => (
          <div className="flex gap-4 items-center border border-zinc-700 px-4 py-4 rounded-md hover:scale-[102%] transition-all duration-100">
            <div className="w-full">
              <div className="text-xl font-semibold flex justify-between gap-8 dark:text-white grow mb-1">
                {item.title}
              </div>
              <div>
                Time:{" "}
                {item.time
                  ? dayjs(item.time).format("DD/MM/YYYY - HH:mm")
                  : "Scheduling..."}
              </div>
              <div className="flex gap-2 items-center">
                Meeting Url:{" "}
                {item.meetingUrl ? (
                  <a
                    className="flex gap-1 items-center text-green-500 hover:text-green-600"
                    href={item.meetingUrl}
                    target="_blank"
                  >
                    Link <ExternalLink size={16} />
                  </a>
                ) : (
                  "Currently no meeting link"
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {listData?.length > 0 && (
        <div className="py-4">
          <Pagination
            align="end"
            total={listData.length}
            pageSize={paging.size}
            current={paging.page}
            onChange={(page) => {
              scrollTo({ top: 0 });
              setPaging({ ...paging, page });
            }}
          />
        </div>
      )}
    </div>
  );
}
