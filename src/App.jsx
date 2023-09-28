import { Canvas } from "@react-three/fiber";
import { Background } from "./components/Background";
import { ScrollControls, OrbitControls } from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas >
        <color attach="background" args={["#ececec"]} />
        {/* <ScrollControls pages={20} damping={1}> */}
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.15} />

        <Background />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>



        {/* </ScrollControls> */}
      </Canvas>
    </>
  );
}

export default App;
