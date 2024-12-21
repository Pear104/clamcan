import { Scroll } from "@react-three/drei";
import React from "react";

export default function Overlay() {
  return (
    <Scroll html>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="text-3xl"></div>
        {/* <button>Down</button> */}
      </div>
      <div className="w-screen h-screen">Ahihi</div>
      <div className="w-screen h-screen">Ahihi</div>
    </Scroll>
  );
}
