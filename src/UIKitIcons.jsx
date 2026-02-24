import { Root, Container, Text } from '@react-three/uikit'
import { useMemo, useState } from 'react'

const iconEmojis = ['⚙️', '👤', '🔔', '✉️', '📷', '❤️', '⭐', '☁️']

function UIKitIcon({ position, emoji }) {
  const [hovered, setHovered] = useState(false)
  const handleClick = () => console.log(`UIKit (SDF) Clicked: ${emoji}`)

  return (
    <group position={position}>
      <Root pixelSize={0.01} centerAnchor>
        <Container 
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={handleClick}
          backgroundColor="white" 
          backgroundOpacity={hovered ? 0.3 : 0.1}
          borderRadius={100}
          padding={12}
          borderWidth={4}
          borderColor={hovered ? "#4ecdc4" : "white"}
          borderOpacity={hovered ? 0.8 : 0.3}
          alignItems="center"
          justifyContent="center"
          width={70}
          height={70}
          panelBlur={20}
          cursor="pointer"
          transformScale={hovered ? 1.25 : 1}
          transition={{
            transformScale: { type: 'spring', stiffness: 300, damping: 20 },
            backgroundOpacity: { duration: 0.15 }
          }}
        >
          <Text fontSize={36}>{emoji}</Text>
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
