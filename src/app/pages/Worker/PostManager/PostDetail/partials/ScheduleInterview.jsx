import { Badge, Calendar, Popover, Tag } from "antd";
import dayjs from "dayjs";
import { ExternalLink } from "lucide-react";
import React from "react";

const CellPopover = ({ item }) => (
  <>
    <div>
      <div className="font-bold text-2xl text-center mb-2">Meeting Info</div>
      <div className="flex gap-2">
        <span className="font-semibold">Candidate: </span>
        <a href={`mailto:${item.email}`}>{item.email}</a>
      </div>
      <div>
        <span className="font-semibold">Time: </span>{" "}
        {dayjs(item.time).format("DD/MM/YYYY - HH:mm")}
      </div>
      <div className="flex gap-2">
        <span className="font-semibold">Meeting Url: </span>{" "}
        <a
          href={item.meetingUrl}
          className="flex gap-1 items-center font-semibold"
        >
          Link <ExternalLink size={16} />
        </a>
      </div>
    </div>
  </>
);

const getListData = (value, interviewData) => {
  let listData = [];
  interviewData.forEach(
    (item) =>
      dayjs(item?.time || new Date()).isSame(value, "day") &&
      listData.push({
        email: item?.email,
        time: item?.time,
        meetingUrl: item?.meetingUrl,
      })
  );

  return listData || [];
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export default function ScheduleInterview({ interviewData }) {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value, interviewData);
    return (
      <>
        {listData.map((item) => (
          <Popover content={<CellPopover item={item} />} key={item.time}>
            <Tag className="text-xs">{item.email}</Tag>
          </Popover>
        ))}
      </>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div>
      <Calendar fullscreen={false} cellRender={cellRender} />
    </div>
  );
}
