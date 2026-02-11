'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import type { GLTF } from 'three-stdlib';

export default function ThreeHead() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // ref 값을 변수에 저장
    const container = containerRef.current;

    // --- 동적 사이즈 ---
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // --- 씬 / 카메라 / 렌더러 ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0.5, 0, 4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    containerRef.current.appendChild(renderer.domElement);

    // --- 조명 ---
    scene.add(new THREE.AmbientLight(0xffffff, 2));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight.position.set(0, 5, 5);
    scene.add(dirLight);

    // --- GLTF 로드 ---
    const loader = new GLTFLoader();
    let head: InstanceType<typeof THREE.Object3D>;
    let initialFitScale = 0.4; // 기본 스케일 저장

    // 화면 크기에 따른 스케일 계산 함수
    const calculateScale = () => {
      // 화면의 대각선 혹은 최소 길이를 기준으로 하여 종횡비 변화에 대응
      const viewportRef = Math.min(sizes.width, sizes.height);

      // 기준 해상도(예: 1000px) 대비 현재 해상도 비율 계산
      let multiplier = viewportRef / 1000;

      // multiplier에 제한을 걸어 너무 작거나 너무 큰 화면에서 대응
      multiplier = Math.max(0.1, Math.min(multiplier, 0.6));

      return initialFitScale * multiplier;
    };

    loader.load('/images/head.glb', (gltf: GLTF) => {
      const model = gltf.scene;
      const group = new THREE.Group();
      group.add(model);

      const box = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      box.getCenter(center);
      model.position.sub(center);

      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      initialFitScale = 2 / maxDim; // 기본 스케일 저장

      const currentScale = calculateScale();
      group.scale.set(currentScale, currentScale, currentScale);

      group.rotation.y = Math.PI;

      scene.add(group);
      head = group;

      camera.lookAt(group.position);
    });

    // --- 마우스/터치 위치 ---
    const mouse = { x: 0, y: 0 };

    // 위치 업데이트 공통 함수
    const updateMousePosition = (clientX: number, clientY: number) => {
      mouse.x = (clientX / sizes.width) * 2 - 0.8;
      mouse.y = -(clientY / sizes.height) * 2 + 1;
    };

    // 마우스 이벤트
    const onMouseMove = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    // 터치 이벤트
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateMousePosition(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // --- 리사이즈 핸들러 ---
    const handleResize = () => {
      // sizes 객체 업데이트
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // 카메라 업데이트
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // 렌더러 업데이트
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // 오브젝트 크기 업데이트
      if (head) {
        const newScale = calculateScale();
        head.scale.set(newScale, newScale, newScale);
      }
    };

    window.addEventListener('resize', handleResize);

    // --- 애니메이션 루프 ---
    const animate = () => {
      requestAnimationFrame(animate);
      if (head) {
        head.rotation.y = Math.PI + mouse.x * 1;
        head.rotation.x = -mouse.y * 1;
      }
      renderer.render(scene, camera);
    };
    animate();

    // --- 클린업 ---
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', handleResize);
      // 저장된 변수 사용
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-blue-50 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px]"
    />
  );
}
