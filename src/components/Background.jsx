import React from "react";
import { Environment, Sphere } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

export const Background = () => {



  return (

    <>
      <Environment preset="sunset">
        <ambientLight intensity={0.5} />
        <pointLight castShadow intensity={1} position={[100, 100, 100]} />
      </Environment>
    </>

  );
};
