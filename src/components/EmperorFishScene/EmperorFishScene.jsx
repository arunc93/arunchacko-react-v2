import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./EmperorFishScene.css";

/**
 * Emperor angelfish — skeletal swim + patrol + click seek.
 *
 * Hold click on the intro: fish eases toward the pointer.
 * Release: patrol resumes from the current position (no teleport).
 *
 * public/models/emperor_angelfish_update_v2.glb
 */

const MODEL_URL = `${process.env.PUBLIC_URL || ""}/models/emperor_angelfish_update_v2.glb`;

const CAMERA = {
  fov: 36,
  near: 0.1,
  far: 40,
  z: 6.2,
};

const FISH_TARGET_SIZE = {
  mobile: 0.8,
  tablet: 1.0,
  desktop: 1.3,
};

const SWIM = {
  angularSpeed: (Math.PI * 2) / 50,
  bodySway: 0.04,
  pitch: 0.035,
  yawOffset: 0,
  yOffset: 0,
  seekSpeed: 0.2,
};

const CLIP_TIME_SCALE = 0.9;

const getSwimSettings = (width) => {
  if (width < 640) {
    return { targetSize: FISH_TARGET_SIZE.mobile, pathX: 0.55, pathY: 0.06, pathZ: 0.12 };
  }
  if (width < 1024) {
    return { targetSize: FISH_TARGET_SIZE.tablet, pathX: 0.85, pathY: 0.08, pathZ: 0.14 };
  }
  return { targetSize: FISH_TARGET_SIZE.desktop, pathX: 1.25, pathY: 0.1, pathZ: 0.16 };
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const prepareSwimClip = (sourceClip) => {
  const clip = sourceClip.clone();
  let t0 = Infinity;
  clip.tracks.forEach((track) => {
    if (track.times.length) t0 = Math.min(t0, track.times[0]);
  });
  if (!Number.isFinite(t0)) t0 = 0;

  clip.tracks.forEach((track) => {
    for (let i = 0; i < track.times.length; i += 1) {
      track.times[i] -= t0;
    }
  });

  clip.tracks = clip.tracks.filter((track) => {
    const name = track.name || "";
    return !name.endsWith("Root_M_01.position") && !name.endsWith("Root_M_01.translation");
  });

  clip.duration = clip.tracks.reduce((max, track) => {
    const last = track.times[track.times.length - 1] || 0;
    return Math.max(max, last);
  }, 0);
  clip.name = "SwimInPlace";
  return clip;
};

const EmperorFishScene = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = prefersReducedMotion();
    let disposed = false;
    let frameId = 0;
    let mixer = null;
    let fishRoot = null;
    let nativeMaxDim = 1;
    let fishYaw = SWIM.yawOffset;
    let swimSettings = getSwimSettings(container.clientWidth || window.innerWidth);
    const clock = new THREE.Clock();

    const seekTarget = new THREE.Vector3();
    let seeking = false;
    let pathPhase = 0;
    let resumeRight = true;
    let patrolY = SWIM.yOffset;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      CAMERA.fov,
      Math.max(container.clientWidth, 1) / Math.max(container.clientHeight, 1),
      CAMERA.near,
      CAMERA.far
    );
    camera.position.set(0, 0.08, CAMERA.z);

    scene.add(new THREE.HemisphereLight(0xb9d7ff, 0x1b2a3c, 0.95));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.05);
    keyLight.position.set(2.2, 3.2, 4.2);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xc5d4ff, 0.35);
    fillLight.position.set(-3.2, 0.8, 2.4);
    scene.add(fillLight);

    fishRoot = new THREE.Group();
    scene.add(fishRoot);

    const applyFitScale = () => {
      fishRoot.scale.setScalar(swimSettings.targetSize / nativeMaxDim);
    };

    const hitPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const hitPoint = new THREE.Vector3();

    const pointerToWorld = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return null;
      ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      if (!raycaster.ray.intersectPlane(hitPlane, hitPoint)) return null;
      const { pathX, pathY } = swimSettings;
      hitPoint.x = THREE.MathUtils.clamp(hitPoint.x, -pathX * 1.15, pathX * 1.15);
      hitPoint.y = THREE.MathUtils.clamp(
        hitPoint.y,
        SWIM.yOffset - pathY * 4,
        SWIM.yOffset + pathY * 4
      );
      hitPoint.z = 0;
      return hitPoint;
    };

    const isInsideIntro = (event) => {
      const rect = container.getBoundingClientRect();
      return (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      );
    };

    const recastPhaseFromCurrent = () => {
      if (!fishRoot) return;
      const { pathX } = swimSettings;
      const nx = THREE.MathUtils.clamp(
        fishRoot.position.x / Math.max(pathX, 0.0001),
        -1,
        1
      );
      let phase = Math.asin(nx);
      if (!resumeRight) phase = Math.PI - phase;
      pathPhase = phase;
      patrolY = fishRoot.position.y;
    };

    const onPointerDown = (event) => {
      if (disposed || reducedMotion || !fishRoot) return;
      if (event.button != null && event.button !== 0) return;
      if (!isInsideIntro(event)) return;
      const world = pointerToWorld(event.clientX, event.clientY);
      if (!world) return;
      seekTarget.copy(world);
      resumeRight = world.x >= fishRoot.position.x;
      seeking = true;
    };

    const onPointerMove = (event) => {
      if (!seeking || disposed) return;
      const world = pointerToWorld(event.clientX, event.clientY);
      if (!world) return;
      seekTarget.copy(world);
      resumeRight = world.x >= fishRoot.position.x;
    };

    const onPointerUp = () => {
      if (!seeking) return;
      recastPhaseFromCurrent();
      seeking = false;
    };

    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return;

        const model = gltf.scene;
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = false;
            child.receiveShadow = false;
            child.frustumCulled = false;
            if (child.material) {
              child.material.depthWrite = true;
              child.material.transparent = false;
            }
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        nativeMaxDim = Math.max(size.x, size.y, size.z) || 1;
        model.position.sub(center);
        fishRoot.add(model);
        applyFitScale();

        if (gltf.animations?.length) {
          const sourceClip =
            gltf.animations.find((item) => item.name === "Swim3_Long_Wide") ||
            gltf.animations[0];
          const clip = prepareSwimClip(sourceClip);
          mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(clip);
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.clampWhenFinished = false;
          action.timeScale = reducedMotion ? CLIP_TIME_SCALE * 0.5 : CLIP_TIME_SCALE;
          action.enabled = true;
          action.play();
        }

        fishRoot.visible = true;
      },
      undefined,
      (error) => {
        console.error("Failed to load emperor angelfish model", error);
      }
    );

    const resize = () => {
      if (disposed || !container) return;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      camera.aspect = Math.max(width, 1) / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      swimSettings = getSwimSettings(width);
      if (fishRoot.children.length) applyFitScale();
    };

    const easeYaw = (targetYaw, delta) => {
      const diff = Math.atan2(
        Math.sin(targetYaw - fishYaw),
        Math.cos(targetYaw - fishYaw)
      );
      fishYaw += diff * Math.min(1, delta * 2.5);
      fishRoot.rotation.y = fishYaw;
      return diff;
    };

    const animate = () => {
      if (disposed) return;
      frameId = window.requestAnimationFrame(animate);
      if (document.hidden) return;

      const delta = clock.getDelta();
      const elapsed = clock.elapsedTime;
      if (mixer) mixer.update(delta);

      if (fishRoot && !reducedMotion) {
        const { pathX, pathY, pathZ } = swimSettings;

        if (seeking) {
          const k = Math.min(1, delta * SWIM.seekSpeed);
          fishRoot.position.x += (seekTarget.x - fishRoot.position.x) * k;
          fishRoot.position.y += (seekTarget.y - fishRoot.position.y) * k;
          fishRoot.position.z = Math.sin(elapsed * 0.45 + 1.2) * pathZ * 0.5;
          const dx = seekTarget.x - fishRoot.position.x;
          const dy = seekTarget.y - fishRoot.position.y;
          easeYaw(Math.atan2(dx, 0.22) + SWIM.yawOffset, delta);
          fishRoot.rotation.z =
            THREE.MathUtils.clamp(-dx * 0.12, -0.18, 0.18) +
            Math.sin(elapsed * 0.9) * SWIM.bodySway;
          fishRoot.rotation.x =
            THREE.MathUtils.clamp(dy * 0.2, -0.16, 0.16) +
            Math.sin(elapsed * 0.55) * SWIM.pitch;
        } else {
          pathPhase += delta * SWIM.angularSpeed;
          const targetY = SWIM.yOffset + Math.sin(pathPhase * 0.6 + 0.35) * pathY;
          patrolY += (targetY - patrolY) * Math.min(1, delta * 2.2);
          fishRoot.position.set(
            Math.sin(pathPhase) * pathX,
            patrolY,
            Math.sin(pathPhase * 0.45 + 1.2) * pathZ
          );
          const dx = Math.cos(pathPhase) * pathX * SWIM.angularSpeed;
          const dz = Math.cos(pathPhase * 0.45 + 1.2) * pathZ * 0.45 * SWIM.angularSpeed;
          const diff = easeYaw(Math.atan2(dx, dz) + SWIM.yawOffset, delta);
          fishRoot.rotation.z =
            Math.sin(elapsed * 0.9) * SWIM.bodySway -
            THREE.MathUtils.clamp(diff, -0.8, 0.8) * 0.15;
          fishRoot.rotation.x = Math.sin(elapsed * 0.55) * SWIM.pitch;
        }
      }

      renderer.render(scene, camera);
    };

    const onVisibility = () => {
      if (!document.hidden) clock.getDelta();
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    animate();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (mixer) mixer.stopAllAction();
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className="emperor-fish-layer" aria-hidden="true" />;
};

export default EmperorFishScene;