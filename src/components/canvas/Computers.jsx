import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations } from "@react-three/drei";
import CanvasLoader from "../Loader";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("/desktop_pc/scene.gltf");

  return (
    <mesh>
   

      <primitive
         autoRotate={true} // Set autoRotate to true
    
        object={computer.scene}
        scale={isMobile ? 0.5 : 0.02}
        position={isMobile ? [0, -3, -2.2] : [0, -0., 0.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};



const Ship2 = ({ isMobile }) => {
  const { scene, animations } = useGLTF("/Hole/scene.gltf");
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
 


      <primitive
        autoRotate={true}
        object={scene}
        scale={isMobile ? 1.5 : 10.95}
        position={isMobile ? [0, -3, -2.2] : [5, -15.25, -40.5]}
        rotation={[0.2, 0.0, 0]}
      />
    </mesh>
  );
};


const Robot3 = ({ isMobile }) => {
  const { scene, animations } = useGLTF("/robot3/scene.gltf");
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

    <primitive
      autoRotate={true}
      object={scene}
      scale={isMobile ? 0.5 : 0.35}
      position={isMobile ? [0, -3, -2.2] : [-5, -0.25, -0.5]}
      rotation={[-0.01, -0.2, 0]}
    />
  </mesh>
);
};





const Asteroid = ({ isMobile }) => {
  const { scene, animations } = useGLTF("/asteroid/scene.gltf");
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
 
    <primitive
      autoRotate={true}
      object={scene}
      scale={isMobile ? 0.5 : 1.35}
      position={isMobile ? [0, -3, -2.2] : [3, 2.25, -2.5]}
      rotation={[-0.01, -0.2, 1]}
    />
  </mesh>
);
};





const Planet3 = ({ isMobile }) => {
  const { scene, animations } = useGLTF("/planet3/scene.gltf");
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
    <hemisphereLight intensity={0.15} color="orange" groundColor="black" />


    <primitive
      autoRotate={true}
      object={scene}
      scale={isMobile ? 0.5 : 0.015}
      position={isMobile ? [0, -3, -2.2] : [5, 0.25, -16.5]}
      rotation={[-0.01, -0.2, 1]}
    />
  </mesh>
);
};




const Particle = ({ isMobile }) => {
  const planet = useGLTF("./particle/scene.gltf");

  return (
    <mesh>


  
      <primitive
      
 
        object={planet.scene}
        scale={isMobile ? 95 : 95}
        position={isMobile ? [0, -3, -2.2] : [30, -5.25,10.5]}
        rotation={[-0.01, -0.2, 0]}
      />
    </mesh>
  );
};

const RotatingGroup = ({ isMobile }) => {
  const groupRef = useRef();

  const animate = () => {
    const elapsedTime = performance.now() / 1000;

    groupRef.current.rotation.y = elapsedTime / 10;

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
  }, []);

  return (
    <group ref={groupRef}>
      
   
      <Computers  />
     
      <Particle  />
     
     
   

    </group>
  );
};



const ComputersCanvas = () => {
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
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
<Suspense fallback={<CanvasLoader />}>
        <OrbitControls
           autoRotate={true} // Set autoRotate to true
           autoRotateSpeed={-0.1} // Set the rotation speed
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Particle  />
        <Ship2  />
     
      
      </Suspense>
 
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
           autoRotate={true} // Set autoRotate to true
           autoRotateSpeed={-0.1} // Set the rotation speed
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          
        />
        <Robot3  />
     
   
    

         <Ship2  />
   
        <RotatingGroup  />
        <Asteroid />
      
        <Planet3 />
    
        
      
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
