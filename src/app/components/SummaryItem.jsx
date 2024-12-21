import { Tag } from "antd";

const SummaryItem = ({ icon, label, value, color = "blue-inverse" }) => {
  return (
    <Tag color={color} className="inline-block rounded-md py-2 px-4">
      <div className="items-center flex gap-2">
        {icon}
        <div className="flex flex-col text-sm">
          <div className="font-semibold">{label}</div>
          <div className="font-semibold text-base">{value}</div>
        </div>
      </div>
    </Tag>
  );
};

export default SummaryItem;
