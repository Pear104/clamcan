import { Button, Modal } from "antd";
import { sConfig } from "app/stores/configStore";
import { sQuery } from "app/stores/queryStore";
import { ListCheck } from "lucide-react";
import language from "app/locales/common";
import { PATCH } from "app/modules/request";

const ConfirmModal = ({ message, record, form }) => {
  const config = sConfig.use();

  return (
    <Button
      icon={<ListCheck />}
      className="font-semibold"
      type="primary"
      onClick={() => {
        Modal.confirm({
          onOk: async () => {
            const response = await PATCH(`/campaign/${record.id}`);
            if (response.status === 200) {
              message.success("Confirm campaign successfully");
              sQuery.set(
                (pre) => (pre.value.revalidate = !pre.value.revalidate)
              );
            } else {
              message.error("Error, please try again later");
            }
          },
          title: "Confirm this campaign?",
          content: "Are you sure?",
          centered: true,
          okText: "Confirm",
          closable: true,
          width: 400,
          footer: (_, { OkBtn, CancelBtn }) => (
            <>
              <CancelBtn />
              <OkBtn />
            </>
          ),
        });
      }}
    >
      {language[config.language].confirm}
    </Button>
  );
};

export default ConfirmModal;
