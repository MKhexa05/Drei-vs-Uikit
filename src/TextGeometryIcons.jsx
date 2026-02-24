import { useMemo } from 'react'
import { Text3D, Center } from '@react-three/drei'

const iconEmojis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] 
const FONT_URL = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json'

function Text3DIcon({ position, char }) {
  return (
    <group position={position}>
      <Center>
        <Text3D
          font={FONT_URL}
          size={0.6}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {char}
          <meshStandardMaterial color="#ff6b6b" metalness={0.8} roughness={0.2} />
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
