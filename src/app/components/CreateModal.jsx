import { Button, Modal } from "antd";
import { useState } from "react";

const CreateModal = ({ children, form, modalTitle, icon }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button
        className="font-semibold"
        icon={icon}
        type="primary"
        onClick={() => setIsModalOpen(true)}
      >
        {children}
      </Button>
      <Modal
        title={<div className="ml-2 text-2xl">{modalTitle}</div>}
        open={isModalOpen}
        onOk={() => handleOk(setIsModalOpen)}
        onCancel={() => setIsModalOpen(false)}
        centered
        width={840}
        footer={(_, { OkBtn, CancelBtn }) => <></>}
      >
        <div className="mt-4 overflow-y-scroll mx-2 max-h-[500px]">
          {form(setIsModalOpen)}
        </div>
      </Modal>
    </>
  );
};

export default CreateModal;
