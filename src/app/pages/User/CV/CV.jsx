import { UploadOutlined } from "@ant-design/icons";
import { App, Button, Upload } from "antd";
import { useEffect, useState } from "react";
import { DELETE, GET, POST } from "app/modules/request";
import { sQuery } from "app/stores/queryStore";
import language from "app/locales/pages/User/CV.json";
import { sConfig } from "app/stores/configStore";
import { Trash2 } from "lucide-react";

const CVItem = ({ item, message, config }) => {
  return (
    <>
      <div className="gap-6 flex w-full">
        <a
          target="_blank"
          href={"https://file.nglearns.dev/" + item.path}
          className="grow w-full py-3 flex items-center bg-zinc-300/50 px-4 text-black text-base rounded-md dark:text-white"
        >
          {item.name}
        </a>
        <div
          className="grow h-full rounded-md bg-[#eb221e] hover:!bg-[#ff716f] p-4"
          onClick={async () => {
            await DELETE("/user/cv", {
              name: item.name,
            });
            message.success(language[config.language].msgDeleteSuccess);
            sQuery.set(
              (pre) => (pre.value.revalidate = !sQuery.value.revalidate)
            );
          }}
        >
          <Trash2 color="white" size={16} className="h-full" />
        </div>
      </div>
    </>
  );
};

export default function CV() {
  const [cvList, setCvList] = useState([]);
  const { message } = App.useApp();
  const query = sQuery.use();
  const config = sConfig.use();
  useEffect(() => {
    (async () => {
      const { data } = await GET("/user/cv");
      setCvList(data.data);
    })();
  }, [query.revalidate]);

  return (
    <div className="">
      <div className="my-6 text-3xl font-bold">
        {language[config.language].title}
      </div>
      <div className="flex-col justify-start items-start gap-4 inline-flex w-full">
        {!cvList?.length && <div>{language[config.language].empty}</div>}
        {cvList?.map((item, index) => (
          <CVItem key={index} item={item} message={message} config={config} />
        ))}
        {cvList?.length < 5 && (
          <Upload
            fileList={[]}
            customRequest={async (info) => {
              const formData = new FormData();
              formData.append("file", info.file);
              const data = await POST("/user/cv", formData, true);
              if (data.status === 200) {
                message.success(
                  `${info.file.name} ${language[config.language].msgSuccess}`
                );
                sQuery.set(
                  (pre) => (pre.value.revalidate = !sQuery.value.revalidate)
                );
              } else {
                message.error(
                  `${info.file.name} ${language[config.language].msgErr}`
                );
              }
            }}
          >
            <Button icon={<UploadOutlined />}>
              {language[config.language].selectFile}
            </Button>
          </Upload>
        )}
      </div>
    </div>
  );
}
