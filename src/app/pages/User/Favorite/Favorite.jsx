import React, { useEffect, useState } from "react";
import language from "app/locales/pages/User/Favorite.json";
import { sConfig } from "app/stores/configStore";
import JobListItem from "app/components/JobListItem";
import { sQuery } from "app/stores/queryStore";
import { GET } from "app/modules/request";
import { Pagination } from "antd";

export default function Favorite() {
  const [favoritePosts, setFavoritePosts] = React.useState([]);
  const [paging, setPaging] = useState({ page: 1, size: 5 });
  const config = sConfig.use();
  useEffect(() => {
    (async () => {
      const { data, status } = await GET("/favorite");
      if (status === 200) setFavoritePosts(data.data);
    })();
  }, [sQuery.use().revalidate]);

  return (
    <div className="gap-4 justify-between mb-8">
      <div className="my-6 text-3xl font-bold">
        {language[config.language].title}
      </div>
      {!favoritePosts?.length && <div>{language[config.language].empty}</div>}

      <div className="flex-col justify-start items-start gap-4 inline-flex w-full">
        {favoritePosts
          ?.slice((paging.page - 1) * paging.size, paging.page * paging.size)
          .map((item) => (
            <JobListItem
              data={item}
              navigatable
              key={item.post_id ?? item.postId}
              favItem
            />
          ))}
      </div>
      {favoritePosts?.length > 0 && (
        <div className="py-4">
          <Pagination
            align="end"
            total={favoritePosts.length}
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
