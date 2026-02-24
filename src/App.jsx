import { useRef, Suspense } from 'react'
import { useControls } from 'leva'
import { DreiIconGrid } from './DreiIcons'
import { UIKitIconGrid } from './UIKitIcons'
import { TextureIconGrid } from './MeshIcons'
import { TextGeometryIconGrid } from './TextGeometryIcons'
import { CommonScene } from './CommonScene'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { LocalStats } from './LocalStats'

const Viewport = ({ type, iconCount, showIcons, autoRotate, perfPos, showGlobalPerf = false }) => {
  const portalContainer = useRef()

  return (
    <div 
      ref={portalContainer}
      className="view-container"
      style={{ 
        position: 'relative', 
        flex: 1,
        height: '100%', 
        border: '1px solid #222',
        overflow: 'hidden',
        background: '#050505',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas 
          shadows 
          camera={{ position: [30, 20, 30], fov: 45 }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          dpr={[1, 2]}
        >
          {showGlobalPerf && (
            <Perf 
              position="top-left" 
              theme="dark" 
              showGraph={true} 
              chart={{ hz: 60, length: 120 }}
            />
          )}

          <LocalStats position="bottom-left" />
          
          <CommonScene animate={autoRotate} />
          
          {type === 'drei' && <DreiIconGrid count={iconCount} visible={showIcons} portal={portalContainer} />}
          {type === 'uikit' && <UIKitIconGrid count={iconCount} visible={showIcons} />}
          {type === 'mesh' && <TextureIconGrid count={iconCount} visible={showIcons} />}
          {type === 'textgeom' && <TextGeometryIconGrid count={iconCount} visible={showIcons} />}
          
          <OrbitControls 
            makeDefault 
            autoRotate={autoRotate} 
            autoRotateSpeed={0.5} 
            enableDamping 
          />
        </Canvas>
      </div>
      
      <div style={{ 
        padding: '12px',
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid #222',
        pointerEvents: 'none',
        zIndex: 10
      }}>
        <h2 style={{ 
          margin: 0, 
          fontSize: '10px', 
          letterSpacing: '1px', 
          textTransform: 'uppercase', 
          color: type === 'drei' ? '#ff6b6b' : type === 'uikit' ? '#4ecdc4' : type === 'mesh' ? '#ffe66d' : '#a29bfe'
        }}>
          {type === 'drei' ? 'DOM-Based' : type === 'uikit' ? 'UIKit (SDF)' : type === 'mesh' ? 'Mesh Text' : 'TextGeometry (3D)'}
        </h2>
        <p style={{ margin: '4px 0 0 0', opacity: 0.5, fontSize: '9px' }}>
          {iconCount} Icons • Isolated
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const { iconCount, showDrei, showUIKit, showMesh, showTextGeom, autoRotate } = useControls({
    iconCount: { value: 200, min: 50, max: 2000, step: 50, label: 'Icon Count' },
    autoRotate: { value: true, label: 'Auto Rotate' },
    showDrei: { value: true, label: 'Drei (DOM)' },
    showUIKit: { value: true, label: 'UIKit (SDF)' },
    showMesh: { value: true, label: 'Mesh (Texture)' },
    showTextGeom: { value: true, label: 'Text3D (Geometry)' },
  })

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', flexDirection: 'column', overflow: 'hidden' }}>
      <header style={{ 
        height: '50px', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 20px', 
        background: '#0a0a0a', 
        borderBottom: '1px solid #222',
        zIndex: 100
      }}>
        <h1 style={{ fontSize: '16px', fontWeight: '300', margin: 0 }}>
          R3F Benchmark: <span style={{ opacity: 0.5 }}>DOM vs UIKit vs Mesh vs Geometry</span>
        </h1>
      </header>
      
      <main style={{ flex: 1, display: 'flex', width: '100%', height: 'calc(100% - 50px)', flexWrap: 'wrap' }}>
        {showDrei && <Viewport type="drei" iconCount={iconCount} showIcons={showDrei} autoRotate={autoRotate} perfPos={'top-left'} showGlobalPerf={true}/>}
        {showUIKit && <Viewport type="uikit" iconCount={iconCount} showIcons={showUIKit} autoRotate={autoRotate} perfPos={'top-right'}/>}
        {showMesh && <Viewport type="mesh" iconCount={iconCount} showIcons={showMesh} autoRotate={autoRotate} perfPos={'bottom-left'}/>}
        {showTextGeom && <Viewport type="textgeom" iconCount={iconCount} showIcons={showTextGeom} autoRotate={autoRotate} perfPos={'bottom-right'}/>}
      </main>
    </div>
  )
}

