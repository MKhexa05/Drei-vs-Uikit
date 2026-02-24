import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Html } from "@react-three/drei";

export function LocalStats({ position = "top-right" }) {
  const { gl } = useThree();
  const statsRef = useRef();

  useEffect(() => {
    gl.info.autoReset = false;
    return () => {
      gl.info.autoReset = true;
    };
  }, [gl]);

  useFrame(() => {
    if (gl.info.render.frame > 0 && statsRef.current) {
      statsRef.current.innerText = `Calls: ${gl.info.render.calls} | Tris: ${gl.info.render.triangles.toLocaleString()} | Geom: ${gl.info.memory.geometries}`;
      gl.info.reset();
    }
  });

  const style = {
    position: "absolute",
    padding: "4px 8px",
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "#00ff00",
    fontFamily: "monospace",
    fontSize: "10px",
    pointerEvents: "none",
    whiteSpace: "nowrap",
    ...(position.includes("top") ? { top: "5px" } : { bottom: "5px" }),
    ...(position.includes("left") ? { left: "5px" } : { right: "5px" }),
  };

  return (
    <Html fullscreen style={{ pointerEvents: "none" }}>
      <div ref={statsRef} style={style}>
        Loading GPU Stats...
      </div>
    </Html>
  );
}
