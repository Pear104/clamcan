import { Button, Result } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={() => navigate("/")}>Back Home</Button>}
      />
    </div>
  );
}
