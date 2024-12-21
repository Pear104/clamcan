import { Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { GET } from "app/modules/request";

export default function AccountDetail() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      // const { status, data } = await GET(`/user/${id}`);
      const { status, data } = await GET("/user");
      if (status === 200) {
        console.log(data);
        const currentUser = {};
        currentUser.name = data.data.name;
        currentUser.phone = data.data.phone;
        currentUser.email = data.data.email;
        setUser(currentUser);
      }
    })();
  }, []);

  return (
    <>
      <div>
        <div className="w-full bg-white rounded-md mb-2 p-4">
          <div className="text-3xl font-semibold">
            Account #{user.id}: {user.name}
          </div>
          <div className="flex gap-8">
            <div className="flex gap-2 mt-4">
              <Tag color="cyan-inverse">Role: {user.role}</Tag>
            </div>
            <div className="flex gap-2 mt-4"></div>
          </div>
          <Typography.Title level={3} className="pt-4">
            Description
          </Typography.Title>
          <div
            data-color-mode="light border border-black"
            className="px-6 py-4"
          >
            <Typography.Title level={4} className="pt-4">
              Phone number:
            </Typography.Title>
            {user.phone} <br />
            <Typography.Title level={4} className="pt-4">
              Email:
            </Typography.Title>
            {user.email}
          </div>
        </div>
      </div>
    </>
  );
}
