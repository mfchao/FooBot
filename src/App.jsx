import React from "react";
import { Canvas } from "@react-three/fiber";
import { Background } from "./components/Background";
import { OrbitControls } from "@react-three/drei";
import { Cubes } from "./components/Cubes";

function App() {
  return (
    <>
      <Canvas camera={{ fov: 45, position: [-10, 10, 10] }}>
        <color attach="background" args={["#white"]} />

        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.15} />

        <Background />
        <Cubes />

      </Canvas>
    </>
  );
}

export default App;
