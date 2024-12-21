import { Scroll, ScrollControls } from "@react-three/drei";
import React from "react";
import Experience from "./Experience";
import Overlay from "./Overlay";

export default function ScrollContainer() {
  return (
    <>
      <ScrollControls pages={3}>
        <Scroll>
          <Experience />
        </Scroll>
        <Overlay />
      </ScrollControls>
    </>
  );
}
