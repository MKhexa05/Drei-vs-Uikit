# R3F Performance Benchmark: DOM vs WebGL UI

This project is a high-fidelity benchmark comparing two different ways of rendering complex UI inside a React Three Fiber scene.

## 🧱 Architecture: Isolated Render Pipelines

To ensure a fair and scientifically accurate benchmark, this application uses **two completely separate `<Canvas />` components**:

1.  **Isolated WebGL Contexts**: Each canvas has its own `WebGLRenderer`, which ensures that GPU state, buffer management, and draw calls are not shared between the two systems.
2.  **Independent Render Loops**: Each canvas maintains its own internal loop. Performance metrics (FPS/Frame Time) are isolated to each view.
3.  **No Shared Scene Graph**: Objects, geometries, and materials are instantiated separately for each side.

## 🧪 The Comparison

### Left: DOM-Based UI (`@react-three/drei` `<Html />`)
*   **Method**: Uses Drei's `<Html />` component with the `transform` and `distanceFactor` props.
*   **How it works**: R3F calculates the world-to-screen projection. It then applies CSS 3D transforms to actual HTML `div` elements living in the DOM.
*   **Bottleneck**: **Main Thread / CPU**. Since every icon is a DOM element, moving the camera forces the browser's layout engine to update hundreds or thousands of styles every frame. This causes high "Layout" and "Script" time in the browser profile.

### Viewport 3: Mesh-Based (Drei `<Text />`)
*   **Method**: Uses standard 3D geometries (`CylinderGeometry`) with Drei's `<Text />` for labeling.
*   **Performance**: High. Since it's pure WebGL, it avoids DOM overhead entirely.

### Viewport 4: TextGeometry (3D Geometry)
*   **Method**: Uses Drei's `<Text3D>`, which generates real 3D vertex data from a font.
*   **Performance**: **GPU Bound**. While it avoids DOM layout costs, it creates millions of triangles at high icon counts. This benchmarks how raw geometry count affects the GPU pipeline.

## 🖱 Interactivity & Interaction
All buttons across all 4 systems feature:
1.  **Hover State**: Highlighting and scaling to show responsiveness.
2.  **Click Interaction**: Logging to console to verify event handling.
3.  **Visual Parity**: All icons are designed as rounded 3D buttons for a fair "apples-to-apples" comparison.

## 📊 How to read the Performance (Stats)
*   **FPS**: The frames per second.
*   **Drei board (Top-Left)**: Watch for "Scripting" and "Layout" lag on the DOM side.
*   **Geometry board (Bottom-Right)**: Watch for "Draw Calls" increasing, which strains the GPU driver.

## 🚀 Stress Testing
Use the **Leva Control Panel** to:
1.  Increase the **Icon Count** beyond 1000.
2.  Toggle **Auto Rotate** to see persistent frame drops.
3.  Toggle visibility of either side to confirm isolation (metrics on one side shouldn't change when the other is hidden).

## 🛠 Tech Stack
*   **Vite** - Dev Environment
*   **React Three Fiber** - 3D Framework
*   **@react-three/uikit** - WebGL UI implementation
*   **@react-three/drei** - DOM UI implementation
*   **Leva** - Debug GUI
*   **r3f-perf** - Performance Monitoring
