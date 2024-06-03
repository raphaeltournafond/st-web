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

const OBJViewer: React.FC<OBJViewerProps> = ({ objUrl, mtlUrl, width, height }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [viewerDimensions, setViewerDimensions] = useState({width, height});
  const [isGrabbing, setIsGrabbing] = useState(false);
  const originalAspectRatio = width / height;

  useEffect(() => {
    const onWindowResize = () => {
      const newWidth = Math.min(window.innerWidth, width);
      const newHeight = newWidth / originalAspectRatio;
      setViewerDimensions({ width: newWidth, height: newHeight });
    };

    window.addEventListener('resize', onWindowResize);
    
    onWindowResize();

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };

  }, [width, height, originalAspectRatio]);

  useEffect(() => {

    if (typeof window === 'undefined' || hasInitialized.current) return;
    hasInitialized.current = true;

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let object: THREE.Object3D | null = null;
    let scaleFactor: number = 1.4

    const init = () => {
      camera = new THREE.PerspectiveCamera(45, originalAspectRatio, 0.1, 20);
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
          setLoadingPercentage(percentComplete);
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
              object.position.setZ(-0.05);
              object.rotateZ(90);
              scene.add(object);
              setLoadingPercentage(100);
              setIsLoading(false);
            },
            onProgress,
            () => {
              setIsLoading(true);
            }
          );
        },
        () => {
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
        }
      );

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Set alpha to true for transparency
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(viewerDimensions.width, viewerDimensions.height);
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

    };

    const animate = () => {
      requestAnimationFrame(animate);
      if (renderer && scene && camera && object) {
        renderer.render(scene, camera);
        object.rotation.z += 0.008;
      }
      controls.update();
    };

    init();
    animate();
  }, [objUrl, mtlUrl, loadingPercentage, isLoading, viewerDimensions, originalAspectRatio]);

  useEffect(() => {
    if (!hasInitialized.current) return;

    let camera: THREE.PerspectiveCamera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;

    const updateRenderer = () => {
      if (renderer && camera) {
        camera.updateProjectionMatrix();
        renderer.setSize(viewerDimensions.width, viewerDimensions.height);
        renderer.setClearColor(0x000000, 0);
      }
    };

    if (mountRef.current) {
      const children = mountRef.current.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i] instanceof HTMLCanvasElement) {
          renderer = new THREE.WebGLRenderer({ canvas: children[i] as HTMLCanvasElement });
        }
      }
    }

    camera = new THREE.PerspectiveCamera(45, originalAspectRatio, 0.1, 20);

    updateRenderer();

  }, [originalAspectRatio, viewerDimensions]);

  const handleMouseDown = () => setIsGrabbing(true);
  const handleMouseUp = () => setIsGrabbing(false);

  useEffect(() => {
    if (mountRef.current) {
      const element = mountRef.current;
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('mouseleave', handleMouseUp); // to handle the case when mouse leaves the element

      return () => {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mouseup', handleMouseUp);
        element.removeEventListener('mouseleave', handleMouseUp);
      };
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: viewerDimensions.width, height: viewerDimensions.height }} className={isGrabbing ? 'cursor-grabbing' : 'cursor-grab'}>
      {isLoading &&
        <div>
          <div className="absolute z-20 top-1/2 left-1/2 w-10 h-10 border-4 border-solid border-gray-200 border-t-gray-700 rounded-full animate-spin transform -translate-x-1/2 -translate-y-1/2"></div>
          <p className='flex justify-center items-center flex-col w-10 h-10 top-1/2 left-1/2 py-14 absolute'>{loadingPercentage.toFixed(2)}%</p>
        </div>
      }
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default OBJViewer;

