import { Canvas } from "@react-three/fiber";
import React from "react";
import Experience from "./Experience";
import { FloatButton } from "antd";
import { ArrowLeft } from "lucide-react";
import {
  Environment,
  OrbitControls,
  Scroll,
  ScrollControls,
} from "@react-three/drei";
import Overlay from "./Overlay";
import ScrollContainer from "./ScrollContainer";

export default function Landing() {
  return (
    <div className="w-screen h-screen">
      <FloatButton
        className="absolute top-4 left-4"
        onClick={() => (window.location.href = "/")}
        icon={<ArrowLeft size={16} className="translate-x-0.5" />}
        type="primary"
      ></FloatButton>
      {/* <color attach="background" args={["#000000"]} /> */}
      <Canvas>
        {/* <directionalLight intensity={10 * Math.PI} position={[0, 2, 3]} /> */}

        <OrbitControls />
        <Environment preset="city" />
        <Experience />

        {/* <ScrollContainer /> */}
      </Canvas>
    </div>
  );
}
