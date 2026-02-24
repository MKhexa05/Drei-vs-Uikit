import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

const iconEmojis = ['⚙️', '👤', '🔔', '✉️', '📷', '❤️', '⭐', '☁️']

function TextureIcon({ position, emoji }) {
  const meshRef = useRef()
  
  // Create a button-like geometry (rounded box or plane)
  return (
    <group position={position}>
      {/* Button Background */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial 
          color="#222" 
          metalness={0.8} 
          roughness={0.2} 
          emissive="#111"
        />
        {/* Border */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 0.1)]} />
          <lineBasicMaterial color="white" transparent opacity={0.3} />
        </lineSegments>
      </mesh>

      {/* Emoji Label (using Drei Text which uses Signed Distance Fields / Textures) */}
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {emoji}
      </Text>
    </group>
  )
}

export function TextureIconGrid({ count = 800, visible = true }) {
  const iconData = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const theta = Math.acos(1 - 2 * (i / count))
      const phi = Math.PI * (1 + Math.sqrt(5)) * i
      const r = 15
      return {
        position: [
          r * Math.sin(theta) * Math.cos(phi),
          r * Math.sin(theta) * Math.sin(phi) + 5,
          r * Math.cos(theta),
        ],
        emoji: iconEmojis[i % iconEmojis.length]
      }
    })
  }, [count])

  if (!visible) return null

  return (
    <>
      {iconData.map((data, i) => (
        <TextureIcon key={i} {...data} />
      ))}
    </>
  )
}
