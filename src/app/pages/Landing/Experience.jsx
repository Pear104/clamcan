import {
  Cloud,
  Clouds,
  Html,
  MeshTransmissionMaterial,
  OrbitControls,
  Sky,
  Sparkles,
  Stars,
  Text,
  Text3D,
} from "@react-three/drei";
import React, { useRef } from "react";
import { YBot } from "./partials/YBot";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Experience() {
  const torusRef = useRef();
  const boxRef = useRef();
  const boxRef2 = useRef();
  const radius = 2;
  const speed = 1.3;
  const { viewport } = useThree();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // torusRef.current.rotation.x = t * 0.5;
    // torusRef.current.rotation.y = t;
    // torusRef.current.rotation.z = t * 0.5;

    //   // boxRef.current.position.x = Math.sin(t * speed) * radius;
    //   // boxRef.current.position.z = Math.cos(t * speed) * radius;
    //   // boxRef.current.rotation.y = t;
    //   // boxRef.current.rotation.x = t;
    //   // boxRef.current.rotation.z = t;

    //   // boxRef2.current.position.x = -Math.sin(t * speed) * radius;
    //   // boxRef2.current.position.z = -Math.cos(t * speed) * radius;
    //   // boxRef2.current.rotation.y = -t;
    //   // boxRef2.current.rotation.x = -t;
    //   // boxRef2.current.rotation.z = -t;
  });

  return (
    <>
      {/* <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={100} />
      <mesh ref={boxRef} position={[0, 1, 0]} scale={0.5}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
      <mesh ref={boxRef2} position={[0, 1, 0]} scale={0.5}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
      {/* <ambientLight intensity={0.5} /> */}
      <color attach="background" args={["#000000"]} />
      <mesh position-z={-10}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
      <Text3D>JULIALAB</Text3D>
      {/* <Text
        position={[0, 0, -1]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        hello world!
      </Text> */}
      <group scale={viewport.width / 3.75}>
        <mesh scale={0.3} ref={torusRef}>
          {/* <icosahedronGeometry args={[5, 1]} /> */}
          <YBot />
          {/* <boxGeometry args={[1, 1, 1, 16, 16, 16]} /> */}
          {/* <torusGeometry args={[2, 1, 32, 100]} /> */}
          {/* <MeshTransmissionMaterial */}
          <meshPhysicalMaterial
            transparent
            thickness={1}
            // color="white"
            transmission={1}
            ior={1.2}
            roughness={0}
            chromaticAberration={0.03}
            backside={true}
          />
        </mesh>
      </group>
    </>
  );
}
