import React, { useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { Back, CanvasBackground } from "./AuthenticationLayout";
import ToggleLanguage from "app/components/ToggleLanguage";

export default function WorkerAuthenticationLayout() {
  return (
    <>
      <div className="h-screen flex">
        <div className="z-10 fixed top-4 right-4 bg-secondary rounded-md px-3 py-1 flex justify-center">
          <ToggleLanguage />
        </div>
        <Back />
        <CanvasBackground isWorker={true}/>
        <div className="w-full p-12 flex flex-col justify-center items-center -translate-y-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
