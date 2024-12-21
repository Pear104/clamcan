import { Divider, Table } from "antd";
import React, { useEffect, useState } from "react";
// import campaignData from "mocks/campaigns";
import { campaignColumns } from "../CampaignManager/schemas";
import DashboardSummary from "./partials/DashboardSummary";
import ScheduledPosts from "./partials/ScheduledPosts";
import language from "app/locales/pages/Worker/Dashboard.json";
import { sConfig } from "app/stores/configStore";
import { GET } from "app/modules/request";
import { sQuery } from "app/stores/queryStore";
import Statistics from "./partials/Statistics";
import { sCache } from "./dashboardStore";

export default function Dashboard() {
  const [campaignData, setCampaignData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [posts, setPosts] = useState([]);
  const query = sQuery.use();
  const config = sConfig.use();
  const cache = sCache.use();

  useEffect(() => {
    (async () => {
      const currentTime = new Date().getTime();
      if (currentTime > cache.expireAt) {
        const { data } = await GET("/campaign");
        // setCampaignData(data.data);

        const { data: accounts } = await GET("/account/list");
        // setAccounts(accounts.data);

        const { data: posts } = await GET("/post");
        // setPosts(posts.data);

        sCache.set(
          (pre) =>
            (pre.value = {
              campaigns: data.data,
              accounts: accounts.data,
              posts: posts.data,
              expireAt: currentTime + 5 * 60 * 1000,
            })
        );
      } else {
        console.log(cache);
        setCampaignData(cache.campaigns);
        setAccounts(cache.accounts);
        setPosts(cache.posts);
      }
    })();
  }, [query.revalidate, cache.expireAt]);

  return (
    <div className="grid grid-cols-11 gap-4">
      <Statistics
        campaignData={campaignData}
        postData={posts}
        accounts={accounts}
      />
      <Divider orientation="left" className="-mt-[500px]">
        {language[config.language].onboardCampaigns}
      </Divider>
      <div className="col-span-3"></div>

      <div className="col-span-8 -mt-[300px]">
        <Table
          className="w-full"
          columns={campaignColumns().filter(
            (c) => includeCol.includes(c.key)
            // includeCol.includes(c.dataIndex)
          )}
          dataSource={campaignData}
          loading={campaignData?.length == 0}
        />
      </div>

      <div className="col-span-3 -mt-[300px]">
        <ScheduledPosts posts={posts} />
      </div>
    </div>
  );
}

const includeCol = [
  "id",
  "name",
  // "status",
  // "time",
  "hiring_count",
  "estimated_cost",
];
