import { SquarePen } from "lucide-react";
import CreateModal from "./CreateModal";

const UpdateModal = ({
  record,
  form,
  min = false,
  title = "Update",
  icon = <SquarePen />,
}) => {
  return (
    <CreateModal
      icon={icon}
      children={!min && "Update"}
      modalTitle={title}
      form={form}
    />
  );
};

export default UpdateModal;
