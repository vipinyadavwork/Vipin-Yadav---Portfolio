import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();

// --- GAME DEV & PROGRAMMING LOGOS ---
const skillItems = [
  { name: "C++", imageUrl: "/images/cpp.webp.png", position: [-6.2, 2.3, 0] as [number, number, number], scale: 1.1 },
  { name: "Unreal", imageUrl: "/images/unreal_engine.webp.png", position: [-2.6, 2.8, 0] as [number, number, number], scale: 1.1 },
  { name: "Blueprints", imageUrl: "/images/blueprints.webp.png", position: [1.2, 2.7, 0] as [number, number, number], scale: 1.1 },
  { name: "Visual Studio", imageUrl: "/images/visual_studio.webp.webp", position: [5, 2.1, 0] as [number, number, number], scale: 1.1 },
  { name: "Git", imageUrl: "/images/git.webp.png", position: [-4.8, -0.8, 0] as [number, number, number], scale: 1.05 },
  { name: "UMG", imageUrl: "/images/unreal_motion.webp.png", position: [-1.1, -1.2, 0] as [number, number, number], scale: 1.05 },
  { name: "Gameplay", imageUrl: "/images/game_logic.webp.png", position: [2.4, -1, 0] as [number, number, number], scale: 1.05 },
  { name: "OOP", imageUrl: "/images/oop.webp.png", position: [5.6, -0.9, 0] as [number, number, number], scale: 1.05 },
];

const loadTexture = (url: string) => {
  const texture = textureLoader.load(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
};

const logoTextures = skillItems.map((item) => loadTexture(item.imageUrl));

const sphereGeometry = new THREE.SphereGeometry(1, 48, 48);

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  position?: [number, number, number];
  logoTexture?: THREE.Texture;
  material: THREE.Material;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  position = [0, 0, 0],
  logoTexture,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={position}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <group rotation={[0.3, 1, 1]}>
        <mesh
          castShadow
          receiveShadow
          scale={scale}
          geometry={sphereGeometry}
          material={material}
        />
        {logoTexture && (
          <group>
            <mesh position={[0, 0, scale * 1.01]} rotation={[0, 0, 0]}>
              <planeGeometry args={[0.7 * scale, 0.7 * scale]} />
              <meshBasicMaterial map={logoTexture} transparent toneMapped={false} depthWrite={false} />
            </mesh>
            <mesh position={[0, 0, scale * 0.999]} rotation={[0, 0, 0]}>
              <planeGeometry args={[0.78 * scale, 0.78 * scale]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.06} depthWrite={false} />
            </mesh>
          </group>
        )}
      </group>
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      
      // Safe check for your work section or any existing section element
      const workElem = document.getElementById("work");
      if (workElem) {
        const threshold = workElem.getBoundingClientRect().top;
        setIsActive(scrollY > threshold);
      } else {
        setIsActive(true); // Default to true if section isn't found during setup
      }
    };
    
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sphereMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f8f8ff",
        roughness: 0.28,
        metalness: 0.18,
        emissive: "#0f1030",
        emissiveIntensity: 0.12,
      }),
    []
  );

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {skillItems.map((item, i) => (
            <SphereGeo
              key={item.name}
              scale={item.scale}
              position={item.position}
              logoTexture={logoTextures[i]}
              material={sphereMaterial}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;