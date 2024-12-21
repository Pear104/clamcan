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

export default function PostPopover({ record }) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <img
          className="h-[80px] aspect-square object-contain object-center dark:border-zinc-700 rounded-md"
          src={record.logo}
        />
        <div className="text-sm font-semibold w-[240px]">
          <span className="table-cell-title">
            {record.title} <span>(#{record.postId})</span>
          </span>
          <Tag
            className="mt-1 text-xs"
            color={
              dayjs().isBefore(dayjs(record?.from_date))
                ? "red-inverse"
                : dayjs().isAfter(dayjs(record?.from_date))
                ? "blue-inverse"
                : "green-inverse"
            }
          >
            {dayjs().isBefore(dayjs(record?.from_date))
              ? "Not Started"
              : dayjs().isAfter(dayjs(record?.from_date))
              ? "Ongoing"
              : "Completed"}
          </Tag>
          <Tag
            className="mt-1 text-xs"
            icon={
              record?.admin_approve == "1" && (
                <Check size={13} className="anticon anticon-check" />
              )
            }
          >
            {record?.country}
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
          label={"Industry"}
          value={record?.company_industry}
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
          label={"Company Type"}
          value={record?.company_type}
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
          label={"Size"}
          value={record?.company_size}
        />
      </div>
      <div className="w-[500px] text-sm">
        <div className="font-semibold">
          Working days:{" "}
          <span className="font-normal">{record?.working_days}</span>
        </div>
        <div className="table-cell-title">
          {record?.summary}
          {/* <MDEditor.Markdown source={record?.summary} /> */}
        </div>
      </div>
    </div>
  );
}
