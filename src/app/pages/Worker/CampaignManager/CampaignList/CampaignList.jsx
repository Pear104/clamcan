// import campaignData from "mocks/campaigns.json";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { campaignColumns } from "../schemas";
import CreateCampaignForm from "../../forms/CreateCampaignForm";
import CreateModal from "app/components/CreateModal";
import SearchBox from "app/components/SearchBox";
import { GET } from "app/modules/request";
import { sQuery } from "app/stores/queryStore";
import { sConfig } from "app/stores/configStore";
import language from "app/locales/pages/Worker/CampaignManager/CampaignList.json";
import { RotateCcw } from "lucide-react";

export default function CampaignList() {
  const [campaignData, setCampaignData] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    estimatedCost: Number.MAX_SAFE_INTEGER,
    hiringCount: Number.MAX_SAFE_INTEGER,
  });
  const query = sQuery.use();
  const config = sConfig.use();

  useEffect(() => {
    (async () => {
      const { data } = await GET("/campaign");
      setCampaignData(data.data);
    })();
  }, [query.revalidate]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3">
          <SearchBox
            value={filter?.name}
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
          />
          <select
            className="max-w-[130px] !text-sm py-1 px-2 input-style"
            value={filter.hiringCount}
            onChange={(e) =>
              setFilter({ ...filter, hiringCount: e.target.value })
            }
          >
            <option className="" value={Number.MAX_SAFE_INTEGER}>
              Hiring count
            </option>
            <option className="" value={10}>
              {"<"} 10
            </option>
            <option className="" value={100}>
              {"<"} 100
            </option>
            <option className="" value={200}>
              {"<"} 200
            </option>
            <option className="" value={500}>
              {"<"} 500
            </option>
          </select>
          <select
            className="max-w-[140px] !text-sm py-1 px-2 input-style"
            onChange={(e) =>
              setFilter({ ...filter, estimatedCost: e.target.value })
            }
            value={filter.estimatedCost}
          >
            <option className="" value={Number.MAX_SAFE_INTEGER}>
              Estimated cost
            </option>
            <option className="" value={1000}>
              {"<"} 1.000$
            </option>
            <option className="" value={5000}>
              {"<"} 5.000$
            </option>
            <option className="" value={10000}>
              {"<"} 10.000$
            </option>
            <option className="" value={100000}>
              {"<"} 100.000$
            </option>
          </select>
          <button
            className="rounded-full !text-sm py-2 px-3 font-semibold hover:bg-slate-400 hover:text-white"
            type="primary"
            onClick={() => {
              setFilter({
                name: "",
                estimatedCost: Number.MAX_SAFE_INTEGER,
                hiringCount: Number.MAX_SAFE_INTEGER,
              });
            }}
          >
            <RotateCcw size={16} />
          </button>
        </div>
        <CreateModal
          children={language[config.language].newCampaign}
          modalTitle={language[config.language].createNewCampaign}
          form={(setIsModalOpen) => (
            <CreateCampaignForm setIsModalOpen={setIsModalOpen} />
          )}
        />
      </div>
      <Table
        columns={campaignColumns()}
        dataSource={query.recentlyAdded.campaign.concat(
          campaignData.filter(
            (item) =>
              item.name?.toLowerCase().includes(filter.name.toLowerCase()) &&
              item.estimated_cost <= filter.estimatedCost &&
              item.hiring_count <= filter.hiringCount
          )
        )}
        pagination={{
          pageSize: 7,
        }}
        rowKey={(record) => record.id + record.name}
        loading={campaignData?.length == 0}
      />
    </>
  );
}
