import { useMemo, useState } from 'react'
import { Text3D, Center } from '@react-three/drei'

const iconEmojis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] 
const FONT_URL = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json'

function Text3DIcon({ position, char }) {
  const [hovered, setHovered] = useState(false)
  const handleClick = () => console.log(`Text3D (Geometry) Clicked: ${char}`)

  return (
    <group 
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleClick}
      scale={hovered ? 1.2 : 1}
    >
      {/* Button Background */}
      <mesh castShadow receiveShadow position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.2, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#a29bfe" : "#222"} 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>

      <Center position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Text3D
          font={FONT_URL}
          size={0.5}
          height={0.15}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {char}
          <meshStandardMaterial color="white" metalness={0.8} roughness={0.2} />
        </Text3D>
      </Center>
    </group>
  )
}

export function TextGeometryIconGrid({ count = 800, visible = true }) {
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
        char: iconEmojis[i % iconEmojis.length]
      }
    })
  }, [count])

  if (!visible) return null

  return (
    <>
      {iconData.map((data, i) => (
        <Text3DIcon key={i} {...data} />
      ))}
    </>
  )
}
