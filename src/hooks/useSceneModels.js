import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useMemo } from "react";
import * as THREE from "three";

/**
 * Хук принимает массив путей к моделям и возвращает словарь: путь -> загруженная 3D-сцена.
 */
export function useSceneModels(modelPaths) {
  const gltfModels = useLoader(GLTFLoader, modelPaths);
  return useMemo(() => {
    const models = {};
    modelPaths.forEach((path, index) => {
      models[path] = gltfModels[index].scene;
    });
    return models;
  }, [gltfModels, modelPaths]);
}

/**
 * Функция вычисляет нижнюю границу (min по Y) для каждой загруженной модели.
 */
export function computeModelBottoms(models) {
  const bottoms = {};
  Object.keys(models).forEach((key) => {
    const model = models[key];
    const box = new THREE.Box3().setFromObject(model);
    bottoms[key] = box.min.y;
  });
  return bottoms;
}
