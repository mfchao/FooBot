import React from "react";
import { Canvas } from "@react-three/fiber";
import { Background } from "./components/Background";
import { ScrollControls, OrbitControls } from "@react-three/drei";
import { Cubes } from "./components/Cubes";

function App() {
  return (
    <>
      <Canvas camera={{ fov: 45, position: [-10, 10, 10] }}>
        <color attach="background" args={["#ececec"]} />
        {/* <ScrollControls pages={20} damping={1}> */}
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.15} />

        <Background />

        <Cubes />






        {/* </ScrollControls> */}
      </Canvas>
    </>
  );
}

export default App;
