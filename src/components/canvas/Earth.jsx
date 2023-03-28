import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations } from "@react-three/drei";
import CanvasLoader from "../Loader";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
 

const Robot2 = ({ isMobile }) => {
  const { scene, animations } = useGLTF("/camp/scene.gltf");
  const mixerRef = useRef();
  const [mixer] = useState(() => new THREE.AnimationMixer(scene));
  const [clipAction, setClipAction] = useState(null);

  useEffect(() => {
    mixerRef.current = mixer;

    if (animations && animations.length) {
      const clip = animations[0];
      const action = mixer.clipAction(clip, scene);
      action.play();
      setClipAction(action);
    }

    return () => {
      mixer.stopAllAction();
      mixerRef.current = null;
    };
  }, [animations, mixer, scene]);

  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });


return (
  <mesh>
    <hemisphereLight intensity={0.15} color="red" groundColor="black" />
    <spotLight
      position={[-20, 50, 10]}
      angle={0.12}
      penumbra={1}
      intensity={1}
   
      shadow-mapSize={1024}
      color="red"
    />
    <pointLight intensity={1} />
    <primitive
      autoRotate={true}
      object={scene}
      scale={isMobile ? 0.5 : 1}
      position={isMobile ? [0, -3, -2.2] : [5, .25, 2.5]}
      rotation={[0, 2.5, 0]}
    />
  </mesh>
);
};

const camp = ({ isMobile }) => {
const { scene, animations } = useGLTF("/camp/scene.gltf");
const mixerRef = useRef();
const [mixer] = useState(() => new THREE.AnimationMixer(scene));
const [clipAction, setClipAction] = useState(null);

useEffect(() => {
  mixerRef.current = mixer;

  if (animations && animations.length) {
    const clip = animations[0];
    const action = mixer.clipAction(clip, scene);
    action.play();
    setClipAction(action);
  }

  return () => {
    mixer.stopAllAction();
    mixerRef.current = null;
  };
}, [animations, mixer, scene]);

useFrame((_, delta) => {
  if (mixerRef.current) {
    mixerRef.current.update(delta);
  }
});


return (
<mesh>
  <hemisphereLight intensity={2.15} color="red" groundColor="black" />
  <spotLight
    position={[-20, 50, 10]}
    angle={0.12}
    penumbra={1}
    intensity={10}
    castShadow
    shadow-mapSize={1024}
    color="red"
  />
  <pointLight intensity={1} />
  <primitive
    autoRotate={true}
    object={scene}
    scale={isMobile ? 0.5 : 0.35}
    position={isMobile ? [0, -3, -2.2] : [-0, -0.25, -0.5]}
    rotation={[-0.01, -0.2, 0]}
  />
</mesh>
);
};

const Particle = ({ isMobile }) => {
  const planet = useGLTF("./particle/scene.gltf");

  return (
    <mesh>


      <pointLight intensity={1} />
      <primitive
      
 
        object={planet.scene}
        scale={isMobile ? 95 : 595}
        position={isMobile ? [0, -3, -2.2] : [355, -50.25, -101.5]}
        rotation={[-0.01, -0.2, 0]}
      />
    </mesh>
  );
};



const RobotCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas

      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >

 
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls />
     

    
        <Robot2 />
  
      
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default RobotCanvas;