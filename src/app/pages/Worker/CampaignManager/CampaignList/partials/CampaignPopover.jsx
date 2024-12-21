import { Tag } from "antd";
import {
  CalendarRange,
  Check,
  CircleDollarSign,
  Clock,
  Eye,
  PencilLine,
  Users,
} from "lucide-react";
import StatItem from "app/components/StatItem";
import dayjs from "dayjs";
import React from "react";
import MDEditor from "@uiw/react-md-editor";

export default function CampaignPopover({ record }) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <img
          className="w-[80px] aspect-square object-cover object-center border-zinc-400"
          src={record.logo}
        />
        <div className="text-sm font-semibold w-[400px]">
          <span className="table-cell-title">
            {record.name} <span>(#{record.id})</span>
          </span>
          <Tag
            className="mt-1 text-xs"
            color={
              record?.admin_approve == "1" ? "green-inverse" : "volcano-inverse"
            }
            icon={
              record?.admin_approve == "1" && (
                <Check size={13} className="anticon anticon-check" />
              )
            }
          >
            {record?.admin_approve == "1" ? "Approved" : "Pending"}
          </Tag>
          <Tag
            className="mt-1 text-xs"
            color={
              dayjs().isBefore(dayjs(record?.startDate))
                ? "red-inverse"
                : dayjs().isAfter(dayjs(record?.startDate))
                ? "blue-inverse"
                : "green-inverse"
            }
          >
            {dayjs().isBefore(dayjs(record?.startDate))
              ? "Not Started"
              : dayjs().isAfter(dayjs(record?.startDate))
              ? "Ongoing"
              : "Completed"}
          </Tag>
        </div>
      </div>
      <div className="flex gap-3 nunito-sans mt-2 justify-between">
        <StatItem
          icon={
            <div className="p-2 bg-blue-200 rounded-md">
              <Users size={24} className="text-blue-500" absoluteStrokeWidth />
            </div>
          }
          label={"Hiring Count"}
          value={record?.hiring_count}
        />
        <StatItem
          icon={
            <div className="p-2 bg-green-200 rounded-md">
              <CircleDollarSign
                size={24}
                className="text-green-500"
                absoluteStrokeWidth
              />
            </div>
          }
          label={"Estimated Cost"}
          value={"$" + record?.estimated_cost?.toLocaleString()}
        />
        <StatItem
          icon={
            <div className="p-2 bg-purple-200 rounded-md">
              <CalendarRange
                size={24}
                className="text-purple-500"
                absoluteStrokeWidth
              />
            </div>
          }
          label={"Duration"}
          value={
            dayjs(record?.endDate).diff(dayjs(record?.startDate), "days") +
            " days"
          }
        />
      </div>
      <div className="w-[500px] text-sm">
        <div className="table-cell-title">
          {record?.summary}
          {/* <MDEditor.Markdown source={record?.summary} /> */}
        </div>
      </div>
    </div>
  );
}
