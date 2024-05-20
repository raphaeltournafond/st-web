'use client'

import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;

    const init = () => {
      camera = new THREE.PerspectiveCamera(45, 1, 0.1, 20);

      scene = new THREE.Scene();

      const ambientLight = new THREE.AmbientLight(0xffffff);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 1);
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
            (object: THREE.Object3D) => {
              object.scale.setScalar(0.015);
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
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2.0;
      controls.minDistance = 0.5;
      controls.maxDistance = 0.5;

      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      if (!camera) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      if (renderer) {
        renderer.setSize(width, height);
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
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

