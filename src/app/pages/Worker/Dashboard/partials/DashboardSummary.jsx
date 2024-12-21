import { Tag } from "antd";
import {
  CalendarRange,
  FileUser,
  SquareChartGantt,
  User,
  UserRoundCheck,
} from "lucide-react";
import language from "app/locales/pages/Worker/Dashboard.json";
import { sConfig } from "app/stores/configStore";

const SummaryItem = ({
  icon,
  label,
  value,
  verb = "Reached",
  color = "blue-inverse",
}) => {
  return (
    <Tag color={color} className="inline-block rounded-md py-2 px-4">
      <div className="justify-center items-start flex flex-col ">
        <div className="flex gap-2 items-center justify-start">
          {icon}
          <div className="font-semibold text-base">{label}</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-xs">{verb}</div>
          <div className="font-semibold text-lg">{value}</div>
        </div>
      </div>
    </Tag>
  );
};

const DashboardSummary = ({
  applicants,
  campaigns,
  posts,
  users,
  positions,
}) => {
  const config = sConfig.use();
  return (
    <div className="col-span-11 grid grid-cols-5 gap-y-2 mb-2">
      <SummaryItem
        color="green-inverse"
        icon={<CalendarRange size={20} />}
        label={language[config.language].campaigns}
        value={campaigns}
        verb={language[config.language].launched}
      />
      <SummaryItem
        icon={<SquareChartGantt size={20} />}
        label={language[config.language].posts}
        value={posts}
        verb={language[config.language].created}
      />
      <SummaryItem
        color="orange-inverse"
        icon={<FileUser size={20} />}
        label={language[config.language].applicants}
        value={applicants}
        verb={language[config.language].recruited}
      />
      <SummaryItem
        color="purple-inverse"
        icon={<User size={20} />}
        label={language[config.language].user}
        value={users}
        verb={language[config.language].created}
      />
      <SummaryItem
        color="cyan-inverse"
        icon={<UserRoundCheck size={20} />}
        // TODO: add this to language file
        label={"Currently hiring"}
        value={positions}
        verb={"positions"}
      />
    </div>
  );
};

export default DashboardSummary;
