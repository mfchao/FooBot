import * as THREE from "three"
import { useRef, useCallback, useState, useEffect } from "react"
import { Edges } from "@react-three/drei"

// Sides of Cube
const faceDirection = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
]

export const Cubes = () => {

    const [hover, setHover] = useState(null)
    const [cubes, setCubes] = useState([]);
    const [isShiftPressed, setIsShiftPressed] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === 'Shift') {
            setIsShiftPressed(true);
        }
    };

    const handleKeyUp = (e) => {
        if (e.key === 'Shift') {
            setIsShiftPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Cleanup 
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);


    // When pointer moves
    const onMove = useCallback((e, index) => {
        e.stopPropagation()

        if (isShiftPressed) return;

        let faceIndex = Math.floor(e.faceIndex / 2);

        if (faceIndex > 0.5) {
            //add block onto exisitng block
            const offset = faceDirection[faceIndex]
            let pos = cubes[index].mesh.position.clone().add(new THREE.Vector3(...offset))
            pos = pos.floor().addScalar(0.5)
            setHover(pos)
        } else {
            //add block to floor
            let pos = e.point.clone().add(new THREE.Vector3(0, 0.5, 0));
            pos = pos.floor().addScalar(0.5);
            setHover(pos);
        }

    }, [hover, cubes, isShiftPressed])


    const removeCube = useCallback((e, index) => {

        if (isShiftPressed) {
            console.log("remove cube")

            setCubes((prevCubes) => {
                const updatedCubes = [...prevCubes];

                updatedCubes.splice(index, 1);
                return updatedCubes;
            });

        }
    }, [cubes, isShiftPressed])

    // When pointer is out of screen
    const onOut = useCallback(() => setHover(null), [])

    // Add cube on click
    const addCube = useCallback((e) => {
        e.stopPropagation()

        if (!hover) return;
        if (isShiftPressed) return;
        //if scrolling, stop
        if (e.delta > 10) return

        const voxel = new THREE.Mesh(new THREE.BoxGeometry, new THREE.MeshStandardMaterial({ color: 'white' }));
        voxel.position.copy(hover)

        //Add to array
        setCubes((prevCubes) => [...prevCubes, { mesh: voxel }]);

    }, [hover, cubes, isShiftPressed])


    return (
        <>
            {/* cubes */}
            {cubes.map((cube, index) => (
                <mesh
                    key={index}
                    position={cube.mesh.position}
                    onPointerMove={(e) => onMove(e, index)}
                    onPointerOut={onOut}
                    onPointerDown={(e) => removeCube(e, index)}
                >
                    {[...Array(6)].map((_, index) => (
                        <meshStandardMaterial
                            key={index}
                            attach={`material-${index}`}
                            color={cube.faceIndex === index ? "#1069C4" : "#b1dce3"}
                        />
                    ))}
                    <boxGeometry />
                    <Edges visible={true} scale={1} threshold={15} renderOrder={1000}>
                        <meshBasicMaterial transparent color="#grey" side={THREE.DoubleSide} />
                    </Edges>
                </mesh>
            ))}


            {/* hover indicator */}
            {hover && (
                //box
                <mesh position={hover} onClick={addCube}>
                    <meshBasicMaterial color="#ff0000" opacity={0.1} transparent={true} />
                    <boxGeometry />
                    <Edges />
                </mesh>
            )}


            {/* ground */}
            <gridHelper />
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow onPointerMove={onMove} onPointerOut={onOut} >
                <planeGeometry args={[1000, 1000]} />
                <meshStandardMaterial color="#white" />
            </mesh>

        </>
    )
}