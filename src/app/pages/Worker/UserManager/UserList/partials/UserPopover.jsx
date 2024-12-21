import { Tag } from "antd";
import {
  CalendarRange,
  Check,
  CircleDollarSign,
  Clock,
  Eye,
  GraduationCap,
  PencilLine,
  Phone,
  Star,
  University,
  Users,
} from "lucide-react";
import StatItem from "app/components/StatItem";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { GET } from "app/modules/request";

// "id": 1,
//     "email": "davidcopbophieu@gmail.com",
//     "name": "David Cóp bơ phiu",
//     "dob": "11/04/18",
//     "description": "# David Cóp bơ phiu\n\n**Email:** davidcopbophieu@gmail.com\n**Phone:** 0904568234\n**Address:** Nhà vườn nho nhỏ có con thỏ xinh xinh\n**Date of Birth:** 11/04/18\n\n## Mô tả\nYêu màu hồng, ghét sự giả dối.\n\n## Học vấn\n- **Trường:**  Polytechnic\n- **Chuyên ngành:** Graphic Design\n- **Bằng cấp:** 9/12\n\n## Kỹ năng\n- Thiết kế đồ họa\n- Sử dụng Adobe Creative Suite\n- Sáng tạo và tư duy nghệ thuật",
//     "address": "Nhà vườn nho nhỏ có con thỏ xinh xinh",
//     "phone": "0904568234",
//     "school": "Polytechnic",
//     "major": "Graphic Design",
//     "degree": "9/12"

export default function UserPopover({ email }) {
  const [userData, setUserData] = useState();
  useEffect(() => {
    (async () => {
      const { data } = await GET(`/user/profile/${email}`);
      setUserData(data.data);
    })();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <img
          className="h-[80px] aspect-square object-cover object-center border border-zinc-400"
          src={
            userData?.avatar
              ? `https://img.nglearns.dev/${userData?.avatar}`
              : `https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg`
          }
        />
        <div className="text-sm font-semibold w-[500px]">
          <span className="table-cell-title">
            {userData?.name} <span>({userData?.email})</span>
          </span>
          <span className="text-gray-700 text-xs">
            Adress:{" "}
            <span className="font-light text-sm">{userData?.address}</span>
            <br />
            Phone number:{" "}
            <span className="font-light text-sm">{userData?.phone}</span>
            <br />
            Birthday:{" "}
            <span className="font-light text-sm">
              {dayjs(userData?.dob).format("DD/MM/YYYY")}
            </span>
          </span>
        </div>
      </div>
      <div className="flex gap-3 nunito-sans mt-2 justify-between">
        <StatItem
          icon={
            <div className="p-2 bg-blue-200 rounded-md">
              <University
                size={24}
                className="text-blue-500"
                absoluteStrokeWidth
              />
            </div>
          }
          label={"School"}
          value={userData?.school}
        />
        <StatItem
          icon={
            <div className="p-2 bg-green-200 rounded-md">
              <Phone size={24} className="text-green-500" absoluteStrokeWidth />
            </div>
          }
          label={"Major"}
          value={userData?.major}
        />
        <StatItem
          icon={
            <div className="p-2 bg-purple-200 rounded-md">
              <GraduationCap
                size={24}
                className="text-purple-500"
                absoluteStrokeWidth
              />
            </div>
          }
          label={"Degree"}
          value={userData?.degree}
        />
      </div>
    </div>
  );
}
