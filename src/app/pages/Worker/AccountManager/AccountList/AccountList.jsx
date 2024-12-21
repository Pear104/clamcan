import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
// import userData from "mocks/users";
import SearchBox from "app/components/SearchBox";
import { accountColumns } from "../schemas";
import CreateModal from "app/components/CreateModal";
import CreateAccountForm from "../../forms/CreateAccountForm";
import { GET } from "app/modules/request";
import { sQuery } from "app/stores/queryStore";
import language from "app/locales/pages/Worker/AccountManager/AccountList.json";
import { sConfig } from "app/stores/configStore";
import { RotateCcw } from "lucide-react";

export default function AccountList() {
  const [accountData, setAccountData] = useState([]);
  const query = sQuery.use();
  const config = sConfig.use();
  const [filter, setFilter] = useState({
    name: "",
    role: "",
  });

  useEffect(() => {
    (async () => {
      const { data } = await GET("/account/list");
      setAccountData(data.data);
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
            className="max-w-[140px] !text-sm py-1 px-2 input-style"
            onChange={(e) => {
              console.log(e.target.value);
              setFilter({ ...filter, role: e.target.value });
            }}
            value={filter.isPassed}
          >
            <option className="" value={""}>
              Role
            </option>
            <option className="" value={"1"}>
              Manager
            </option>
            <option className="" value={"2"}>
              Interviewer
            </option>
          </select>
          <button
            className="rounded-full !text-sm py-2 px-3 font-semibold hover:bg-slate-400 hover:text-white"
            type="primary"
            onClick={() => {
              setFilter({
                name: "",
                role: "",
              });
            }}
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <CreateModal
          children={language[config.language].newAccount}
          modalTitle={language[config.language].createNewAccount}
          form={(setIsModalOpen) => (
            <CreateAccountForm setIsModalOpen={setIsModalOpen} />
          )}
        />
      </div>
      <Table
        columns={accountColumns()}
        dataSource={query.recentlyAdded.account
          .concat(accountData)
          .filter(
            (item) =>
              item.email.includes(filter.name.toLocaleLowerCase()) &&
              item.role.includes(filter.role)
          )}
        pagination={{
          pageSize: 7,
        }}
        rowKey={"email"}
        loading={accountData?.length == 0}
      />
    </>
  );
}
