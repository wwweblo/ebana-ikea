'use client'
import React, { useState } from "react";
import Scene from "../components/Scene";
import { SceneButton } from "../components/SceneButton";
import SceneLayout from "../components/SceneLayout";

export default function Home() {
  // Массив объектов, каждый объект имеет уникальный id, модель (путь) и позицию
  const [objects, setObjects] = useState([]);

  // Добавление объекта. Для разных моделей передаём нужный modelPath.
  const addToScene = (path) => {
    const newObj = {
      id: objects.length,
      modelPath: path,
      position: [objects.length * 2, 0, 0],
    };
    setObjects((prev) => [...prev, newObj]);
  };

  const removeLast = () => {
    setObjects((prev) => prev.slice(0, -1));
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Scene objects={objects} floorTexture='floor_texture.jpg'/>
      <SceneLayout>
        <SceneButton onClick={() => addToScene("/models/cube.glb")}>
          Add Cube
        </SceneButton>
        <SceneButton onClick={() => addToScene("/models/sphere.glb")}>
          Add Sphere
        </SceneButton>
        <SceneButton onClick={removeLast}>Undo</SceneButton>
      </SceneLayout>
    </div>
  );
}
