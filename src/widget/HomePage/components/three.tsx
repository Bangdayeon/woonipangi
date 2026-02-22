'use client';

import { useEffect, useRef } from 'react';
import {
  AmbientLight,
  Box3,
  DirectionalLight,
  Group,
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
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
    const scene = new Scene();

    const camera = new PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0.5, 0, 4);

    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    // --- 조명 ---
    scene.add(new AmbientLight(0xffffff, 2));
    const dirLight = new DirectionalLight(0xffffff, 0.7);
    dirLight.position.set(0, 5, 5);
    scene.add(dirLight);

    // --- GLTF 로드 ---
    const loader = new GLTFLoader();
    let head: InstanceType<typeof Object3D>;
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

    let isMounted = true;

    loader.load(
      '/images/head.glb',
      (gltf: GLTF) => {
        if (!isMounted) return;

        const model = gltf.scene;
        const group = new Group();
        group.add(model);

        const box = new Box3().setFromObject(model);
        const center = new Vector3();
        box.getCenter(center);
        model.position.sub(center);

        const size = new Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        initialFitScale = 2 / maxDim; // 기본 스케일 저장

        const currentScale = calculateScale();
        group.scale.set(currentScale, currentScale, currentScale);

        group.rotation.y = Math.PI;

        scene.add(group);
        head = group;

        camera.lookAt(group.position);
      },
      undefined,
      error => {
        console.error('GLTF load failed:', error);
      }
    );

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
    let resizeRafId: number | null = null;
    const handleResize = () => {
      if (resizeRafId !== null) return; // 이벤트마다 호출될 필요 없음
      resizeRafId = requestAnimationFrame(() => {
        resizeRafId = null;
      });
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

    let animationId: number;

    // --- 애니메이션 루프 ---
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (head) {
        head.rotation.y = Math.PI + mouse.x * 1;
        head.rotation.x = -mouse.y * 1;
      }
      renderer.render(scene, camera);
    };
    animate();

    // --- 클린업 ---
    return () => {
      // GLTF 지오메트리/머티리얼 해제
      scene.traverse((obj: typeof Object3D) => {
        if ('geometry' in obj && obj.geometry) (obj.geometry as { dispose: () => void }).dispose();
        if ('material' in obj && obj.material) {
          const mat = obj.material as { dispose: () => void } | { dispose: () => void }[];
          if (Array.isArray(mat)) {
            mat.forEach(m => m.dispose());
          } else {
            mat.dispose();
          }
        }
      });
      isMounted = false;
      cancelAnimationFrame(animationId);
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
      aria-hidden="true"
      className="bg-blue50 bg-[linear-gradient(to_right,#CAEBFC_1.1px,transparent_1px),linear-gradient(to_bottom,#CAEBFC_1.1px,transparent_1px)] bg-size-[20px_20px]"
    />
  );
}
