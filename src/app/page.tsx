"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

// Extend OrbitControls to make it available in the scene
extend({ OrbitControls });

interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  name: string;
  description: string;
  onClick: (name: string, description: string) => void;
}

function Planet({
  position,
  size,
  color,
  name,
  description,
  onClick,
}: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={() => onClick(name, description)}
    >
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Scene({
  onPlanetClick,
}: {
  onPlanetClick: (name: string, description: string) => void;
}) {
  const { camera } = useThree();

  React.useEffect(() => {
    camera.position.z = 20;
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Planet
        position={[0, 0, 0]}
        size={1}
        color="blue"
        name="Earth"
        description="Our home planet."
        onClick={onPlanetClick}
      />
      <Planet
        position={[2, 0, 0]}
        size={0.5}
        color="red"
        name="Mars"
        description="The red planet."
        onClick={onPlanetClick}
      />
      <Planet
        position={[-2, 0, 0]}
        size={0.9}
        color="yellow"
        name="Venus"
        description="The second planet from the Sun."
        onClick={onPlanetClick}
      />
      <Planet
        position={[4, 0, 0]}
        size={1.2}
        color="orange"
        name="Jupiter"
        description="The largest planet in our solar system."
        onClick={onPlanetClick}
      />
      <Planet
        position={[-4, 0, 0]}
        size={0.7}
        color="green"
        name="Saturn"
        description="Known for its ring system."
        onClick={onPlanetClick}
      />
      <OrbitControls enableZoom={true} enablePan={true} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
    </>
  );
}

export default function FuturisticVertigoExperience() {
  const [selectedPlanet, setSelectedPlanet] = useState<{
    name: string;
    description: string;
  } | null>(null);

  const handlePlanetClick = (name: string, description: string) => {
    setSelectedPlanet({ name, description });
  };

  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas>
        <Scene onPlanetClick={handlePlanetClick} />
      </Canvas>
      {selectedPlanet && (
        <div className="absolute top-4 left-4 bg-white p-4 rounded shadow-lg max-w-xs">
          <h2 className="text-xl font-bold">{selectedPlanet.name}</h2>
          <p>{selectedPlanet.description}</p>
          <button
            onClick={() => setSelectedPlanet(null)}
            className="mt-2 text-blue-500"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
