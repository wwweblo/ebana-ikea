'use client'
import React, { useMemo } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Model from "./Model";

export default function Scene({ objects, floorTexture }) {
  // Загружаем модели отдельно для куба и сферы
  const cubeGLTF = useLoader(GLTFLoader, "/models/cube.glb");
  const sphereGLTF = useLoader(GLTFLoader, "/models/sphere.glb");

  // Формируем словарь: путь -> загруженная 3D-сцена
  const models = useMemo(() => ({
    "/models/cube.glb": cubeGLTF.scene,
    "/models/sphere.glb": sphereGLTF.scene,
  }), [cubeGLTF, sphereGLTF]);

  // Вычисляем нижнюю границу для каждой модели, чтобы корректно позиционировать пол
  const modelBottoms = useMemo(() => {
    const bottoms = {};
    Object.keys(models).forEach((key) => {
      const model = models[key];
      const box = new THREE.Box3().setFromObject(model);
      bottoms[key] = box.min.y;
    });
    return bottoms;
  }, [models]);

  // Вычисляем положение пола: минимальное значение (positionY + нижняя граница модели) для всех объектов
  const floorY =
    objects.length > 0
      ? Math.min(
          ...objects.map(
            (obj) => obj.position[1] + (modelBottoms[obj.modelPath] || 0)
          )
        )
      : 0;

  // Загружаем текстуру для пола, если передан путь
  const texture = floorTexture ? useLoader(THREE.TextureLoader, floorTexture) : null;

  return (
    <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[0, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <OrbitControls />
      
      {/* Рендерим все объекты согласно их modelPath */}
      {objects.map((obj) => (
        <Model
          key={obj.id}
          model={models[obj.modelPath]}
          position={obj.position}
        />
      ))}
      
      {/* Пол располагается ровно впритык к самым нижним объектам */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, floorY, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial map={texture} color={!texture ? "#999999" : undefined} />
      </mesh>
    </Canvas>
  );
}
