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
    // 섹션이 페이지 중간으로 내려갔으므로 window 가 아니라 컨테이너 기준으로 잰다.
    const sizes = {
      width: container.clientWidth || window.innerWidth,
      height: container.clientHeight || window.innerHeight,
    };

    // --- 씬 / 카메라 / 렌더러 ---
    const scene = new Scene();

    const camera = new PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0.5, 0, 4);

    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = 'block'; // 인라인 baseline 간격 제거
    // 캔버스가 재부모화되더라도 터치가 스크롤로 새지 않도록 하는 보험
    renderer.domElement.style.touchAction = 'none';

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
    // 핸들러는 raw 좌표만 저장하고, 레이아웃 읽기는 RAF 에서 프레임당 1회만 한다.
    const pointer = { clientX: 0, clientY: 0, active: false };
    const target = { x: 0, y: 0 };

    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

    /**
     * 컨테이너 기준 정규화 좌표로 머리 회전값을 계산한다.
     *
     * 컨테이너가 뷰포트를 꽉 채우고 스크롤이 0일 때 기존 수식
     * ((clientX / window.innerWidth) * 2 - 0.8)과 정확히 같은 값이 나온다.
     *
     * clamp 는 필수다. mousemove 는 window 에 남겨 두었기 때문에(데스크톱 감각 유지)
     * 섹션이 페이지 중간에 있으면 커서가 컨테이너 밖에 있는 시간이 길다.
     * clamp 가 없으면 머리가 몇 라디안씩 과회전한다.
     */
    const readPointer = () => {
      if (!pointer.active) return;

      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      target.x = clamp01((pointer.clientX - rect.left) / rect.width) * 2 - 0.8;
      target.y = -clamp01((pointer.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onMouseMove = (e: MouseEvent) => {
      pointer.clientX = e.clientX;
      pointer.clientY = e.clientY;
      pointer.active = true;
    };

    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      pointer.clientX = touch.clientX;
      pointer.clientY = touch.clientY;
      pointer.active = true;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    // 스크롤 억제는 CSS touch-action 이 담당한다. preventDefault 를 부르지 않으므로
    // 리스너는 passive 로 두는 것이 맞다.
    container.addEventListener('touchstart', onTouch, { passive: true });
    container.addEventListener('touchmove', onTouch, { passive: true });

    // --- 리사이즈 핸들러 ---
    // window resize 대신 ResizeObserver 를 쓴다. svh 박스는 모바일 URL 바가
    // 접히고 펴질 때 크기가 변하는데 resize 이벤트가 오지 않는 브라우저가 있다.
    let resizeRafId: number | null = null;

    const applySize = () => {
      resizeRafId = null;

      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return; // 마운트 직후 방어

      sizes.width = width;
      sizes.height = height;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (head) {
        const newScale = calculateScale();
        head.scale.set(newScale, newScale, newScale);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      if (resizeRafId === null) resizeRafId = requestAnimationFrame(applySize);
    });
    resizeObserver.observe(container);

    let animationId: number;

    // --- 애니메이션 루프 ---
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      readPointer();
      if (head) {
        head.rotation.y = Math.PI + target.x;
        head.rotation.x = -target.y;
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
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('touchstart', onTouch);
      container.removeEventListener('touchmove', onTouch);
      // 저장된 변수 사용
      container.removeChild(renderer.domElement);
      // StrictMode 이중 마운트로 WebGL 컨텍스트가 새지 않도록 명시적으로 해제
      renderer.forceContextLoss();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="bg-blue50 h-full w-full touch-none bg-[linear-gradient(to_right,#CAEBFC_1.1px,transparent_1px),linear-gradient(to_bottom,#CAEBFC_1.1px,transparent_1px)] bg-size-[20px_20px]"
    />
  );
}
