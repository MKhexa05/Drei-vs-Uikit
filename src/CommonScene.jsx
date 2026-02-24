import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

export function CommonScene({ animate = true }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!animate || !groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.children.forEach((child, i) => {
      if (child.isMesh && i > 0) { // Skip floor
        child.rotation.y = t * (i % 2 === 0 ? 0.5 : -0.5)
        child.position.y += Math.sin(t + i) * 0.002
      }
    })
  })

  return (
    <>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
      <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      
      <group ref={groupRef}>
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* 20 Production-like meshes */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2
          const radius = 8 + Math.random() * 4
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          const h = 1 + Math.random() * 3
          
          return (
            <mesh 
              key={i} 
              position={[x, h / 2 - 0.5, z]} 
              castShadow 
              receiveShadow
            >
              {i % 3 === 0 ? (
                <boxGeometry args={[1, h, 1]} />
              ) : i % 3 === 1 ? (
                <cylinderGeometry args={[0.5, 0.5, h, 32]} />
              ) : (
                <torusKnotGeometry args={[0.5, 0.2, 128, 32]} />
              )}
              <meshPhysicalMaterial 
                color={new THREE.Color().setHSL(i / 20, 0.7, 0.5)}
                metalness={0.9}
                roughness={0.1}
                clearcoat={1}
              />
            </mesh>
          )
        })}
      </group>

      <ContactShadows 
        position={[0, -0.49, 0]} 
        opacity={0.4} 
        scale={40} 
        blur={2} 
        far={10} 
        resolution={1024} 
        color="#000" 
      />
      <Environment preset="city" />
    </>
  )
}
