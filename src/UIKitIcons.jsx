import { Root, Container, Text } from '@react-three/uikit'
import { useMemo, useState } from 'react'

const iconEmojis = ['⚙️', '👤', '🔔', '✉️', '📷', '❤️', '⭐', '☁️']

function UIKitIcon({ position, emoji }) {
  const [hovered, setHovered] = useState(false)

  return (
    <group position={position}>
      <Root pixelSize={0.01} centerAnchor>
        <Container 
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          backgroundColor="white" 
          backgroundOpacity={hovered ? 0.2 : 0.05}
          borderRadius={100}
          padding={12}
          borderWidth={2}
          borderColor="white"
          borderOpacity={hovered ? 0.5 : 0.2}
          alignItems="center"
          justifyContent="center"
          width={60}
          height={60}
          panelBlur={10}
          cursor="pointer"
          transformScale={hovered ? 1.2 : 1}
        >
          <Text fontSize={32}>{emoji}</Text>
        </Container>
      </Root>
    </group>
  )
}

export function UIKitIconGrid({ count = 800, visible = true }) {
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
        <UIKitIcon key={i} {...data} />
      ))}
    </>
  )
}
