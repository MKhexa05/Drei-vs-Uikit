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
  const handleClick = () => console.log(`Drei (DOM) Clicked: ${emoji}`)
  
  return (
    <div 
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{ 
        background: hovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)', 
        backdropFilter: 'blur(12px)',
        padding: '12px',
        borderRadius: '50%',
        border: `2px solid ${hovered ? '#4ecdc4' : 'rgba(255,255,255,0.3)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '24px',
        color: 'white',
        width: '45px',
        height: '45px',
        transition: 'all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: hovered ? 'scale(1.25) translateY(-5px)' : 'scale(1)',
        boxShadow: hovered ? '0 10px 20px rgba(0,0,0,0.4)' : '0 4px 10px rgba(0,0,0,0.2)',
        pointerEvents: 'auto'
      }}
    >
      {emoji}
    </div>
  )
}

