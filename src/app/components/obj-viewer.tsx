'use client'

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface OBJViewerProps {
  objUrl: string;
  mtlUrl: string;
  width: number;
  height: number;
}

const OBJViewer: React.FC<OBJViewerProps> = ({ objUrl, mtlUrl, width, height}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {

    if (typeof window === 'undefined' || hasInitialized.current) return;
    hasInitialized.current = true;

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let object: THREE.Object3D | null = null;
    let scaleFactor: number = 1.4
    const startWidth = window.innerWidth;
    const startHeight = window.innerHeight;

    const init = () => {
      camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 20);
      camera.position.set(0, 2, 1);
      camera.up.set(0, 0, 1);
      camera.lookAt(0, 0, 0);

      scene = new THREE.Scene();

      const ambientLight = new THREE.AmbientLight(0xffffff);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffd6cc, 1);
      camera.add(pointLight);
      scene.add(camera);

      const onProgress = (xhr: ProgressEvent<EventTarget>) => {
        if (xhr.lengthComputable) {
          const percentComplete = (xhr.loaded / xhr.total) * 100;
          console.log(percentComplete.toFixed(2) + '% downloaded');
        }
      };

      const mtlLoader = new MTLLoader();
      mtlLoader.load(
        mtlUrl,
        (materials: MTLLoader.MaterialCreator) => {
          materials.preload();

          const objLoader = new OBJLoader();
          objLoader.setMaterials(materials);
          objLoader.load(
            objUrl,
            (loadedObject: THREE.Object3D) => {
              object = loadedObject;
              object.scale.setScalar(scaleFactor / 100);
              scene.add(object);
            },
            onProgress,
            () => {}
          );
        },
        () => {},
        () => {}
      );

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Set alpha to true for transparency
      renderer.setClearColor( 0x000000, 0 );
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.3;
      controls.autoRotate = false;
      controls.autoRotateSpeed = 2.0;
      controls.minDistance = 0.5;
      controls.maxDistance = 0.5;

      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {

    };

    const animate = () => {
      requestAnimationFrame(animate);
      if (renderer && scene && camera && object) {
        renderer.render(scene, camera);
        object.rotation.z += 0.01;
      }
      controls.update();
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, [objUrl, mtlUrl, width, height]);

  return <div ref={mountRef} style={{ width, height }} />;
};

export default OBJViewer;

