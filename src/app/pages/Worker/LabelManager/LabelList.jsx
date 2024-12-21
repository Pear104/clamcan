import { Table } from "antd";
import React, { useEffect, useState } from "react";
// import labelData from "mocks/Labels";
import { labelColumns } from "./schemas";
import CreateModal from "app/components/CreateModal";
import SearchBox from "app/components/SearchBox";
import { GET } from "app/modules/request";
import CreateLabelForm from "../forms/CreateLabelForm";
import { sQuery } from "app/stores/queryStore";

export default function LabelList() {
  const [labelData, setLabelData] = useState([]);
  const query = sQuery.use();

  useEffect(() => {
    (async () => {
      const { data, status } = await GET("/label", false);
      if (status === 200) {
        setLabelData(data.data);
      }
    })();
  }, [query.revalidate]);
  return (
    <>
      <div className="flex justify-between mb-4 items-center">
        <SearchBox />
        <CreateModal
          children="+ New Label"
          modalTitle={"Create New Label"}
          form={(setIsModalOpen) => (
            <CreateLabelForm setIsModalOpen={setIsModalOpen} />
          )}
        />
      </div>
      <Table
        columns={labelColumns()}
        dataSource={query.recentlyAdded.label.concat(labelData)}
        rowKey={"name"}
        loading={labelData?.length == 0}
      />
    </>
  );
}
