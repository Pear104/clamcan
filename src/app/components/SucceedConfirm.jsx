import React, { useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { App, Button, Result } from "antd";

export default function SucceedConfirm() {
  let [searchParams] = useSearchParams();
  const worker = searchParams.get("worker") === "true";
  console.log(searchParams.get("worker"));
  return (
    <div className="w-screen h-screen flex items-center justify-center dark:bg-secondary">
      <div className="w-[700px] mt-12 pt-10 p-4 rounded-lg shadow-2xl -translate-y-16">
        <div>
          <Result
            status="success"
            title="Successfully"
            subTitle="Go to your email and check the link to confirm your action."
            extra={[
              <Button key="home">
                <Link to="/">Home</Link>
              </Button>,
              <Button type="primary" key="console">
                <Link to={`${worker ? "/worker" : ""}/auth/login`}>Login</Link>
              </Button>,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
