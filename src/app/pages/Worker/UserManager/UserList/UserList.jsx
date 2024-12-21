import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import SearchBox from "app/components/SearchBox";
import { userColumns } from "../schemas";
import CreateModal from "app/components/CreateModal";
import CreateUserForm from "../../forms/CreateUserForm";
import { GET } from "app/modules/request";

export default function UserList() {
  const [listData, setListData] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await GET("/account/list");
      setListData(data.data.data);
    })();
  }, []);
  return (
    <>
      <div className="flex justify-between mb-4 items-center">
        <SearchBox />
        <CreateModal
          children="+ New User"
          modalTitle={"Create New User"}
          form={(setIsModalOpen) => (
            <CreateUserForm setIsModalOpen={setIsModalOpen} />
          )}
        />
      </div>
      <Table
        columns={userColumns()}
        dataSource={listData}
        rowKey={(record) => record?.email}
      />
    </>
  );
}
