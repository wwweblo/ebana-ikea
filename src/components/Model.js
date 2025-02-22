'use client'
import React, { useMemo } from "react";

/**
 * Универсальный компонент для рендеринга 3D-модели.
 * Он клонирует переданную сцену, чтобы каждый экземпляр был независим.
 */
export default function Model({ model, position }) {
  const clonedScene = useMemo(() => model.clone(), [model]);
  return <primitive object={clonedScene} position={position} />;
}
