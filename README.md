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

### Right: WebGL-Based UI (`@react-three/uikit`)
*   **Method**: Uses `@react-three/uikit` to render UI as geometric meshes.
*   **How it works**: UI elements are rendered using Signed Distance Fields (SDF) directly on the GPU. Text and shapes are essentially textures drawn on planes.
*   **Constraint**: **GPU (Theoretical)**. Because the workload stays within WebGL, it can be highly optimized through batching and doesn't trigger browser layout recalculations. It maintains 60 FPS even with thousands of icons.

## 📊 How to read the Performance (Stats)
*   **FPS**: The frames per second. Expect the DOM side to drop significantly as you move the camera or increase the icon count.
*   **CPU**: Shows the time spent on the main thread processing the JS and layout. The DOM side will show much higher peaks here.
*   **GPU**: Note the draw calls. UIKit is highly optimized and will show very efficient rendering even with high icon counts.

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
