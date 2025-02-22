'use client'
import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

export default function Cube({ position, model }) {
  // Клонируем модель, чтобы для каждого куба был свой независимый экземпляр
  const clonedScene = useMemo(() => model.clone(), [model]);
  return <primitive object={clonedScene} position={position} />;
}
