/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 public/models/YBot/test.glb 
*/

import React, { useEffect } from "react";
import { useGraph } from "@react-three/fiber";
import {
  useGLTF,
  useAnimations,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { MeshBasicMaterial, MeshPhysicalMaterial } from "three";

export function YBot(props) {
  const group = React.useRef();
  const { scene, animations } = useGLTF("/models/YBot/model.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play();
  }, [names]);
  const material = new MeshPhysicalMaterial();
  material.transmission = 1;
  material.roughness = 0.7;
  material.ior = 1.2;

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Alpha_Joints"
            geometry={nodes.Alpha_Joints.geometry}
            material={material}
            // material={materials.Alpha_Joints_MAT}
            skeleton={nodes.Alpha_Joints.skeleton}
          />
          <skinnedMesh
            name="Alpha_Surface"
            geometry={nodes.Alpha_Surface.geometry}
            material={
              material
              // thickness={1}
              // transmission={1}
              // ior={1.2}
              // roughness={0}
              // chromaticAberration={0.03}
              // backside={true}
            }
            // material={materials.Alpha_Body_MAT}
            skeleton={nodes.Alpha_Surface.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/YBot/model.glb");
