import { Html } from '@react-three/drei'
import { useMemo, useState } from 'react'

const iconEmojis = ['⚙️', '👤', '🔔', '✉️', '📷', '❤️', '⭐', '☁️']

export function DreiIconGrid({ count = 800, visible = true, portal }) {
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
        <group key={i} position={data.position}>
          <Html 
            transform 
            distanceFactor={8} 
            pointerEvents="none"
            portal={portal}
          >
            <DreiIconContent emoji={data.emoji} />
          </Html>
        </group>
      ))}
    </>
  )
}

function DreiIconContent({ emoji }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div 
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      style={{ 
        background: hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)', 
        backdropFilter: 'blur(10px)',
        padding: '12px',
        borderRadius: '50%',
        border: `2px solid ${hovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '24px',
        color: 'white',
        width: '40px',
        height: '40px',
        transition: 'all 0.1s ease',
        transform: hovered ? 'scale(1.2)' : 'scale(1)'
      }}
    >
      {emoji}
    </div>
  )
}

