import { useMemo, useState } from 'react'
import { Text } from '@react-three/drei'

const iconEmojis = ['⚙️', '👤', '🔔', '✉️', '📷', '❤️', '⭐', '☁️']

function TextureIcon({ position, emoji }) {
  const [hovered, setHovered] = useState(false)
  const handleClick = () => console.log(`Mesh (Texture) Clicked: ${emoji}`)
  
  return (
    <group 
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.1, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#4ecdc4" : "#222"} 
          metalness={0.9} 
          roughness={0.1} 
          emissive={hovered ? "#4ecdc4" : "#111"}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
        {/* Simple texture simulation with wireframe overlay */}
        {/* <meshStandardMaterial 
          color="white" 
          transparent 
          opacity={0.1} 
          wireframe 
        /> */}
      </mesh>

      <Text
        position={[0, 0.11, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.6}
        color="white"
        anchorX="center"
        anchorY="middle"
        transformScale={hovered ? 1.2 : 1}
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
