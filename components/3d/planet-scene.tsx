"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { Vector3, type Mesh, type Group } from "three"
import { useTheme } from "next-themes"

function Planet({ position = [0, 0, 0], theme }: { position?: number[]; theme: string }) {
  const planetRef = useRef<Group>(null)
  const ringsRef = useRef<Mesh>(null)
  const moonRef = useRef<Mesh>(null)
  const moonOrbitRef = useRef<Group>(null)

  const isDark = theme === "dark"

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()

    // Safe rotation of objects with null checks
    if (planetRef.current) {
      planetRef.current.rotation.y = elapsedTime * 0.1
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.z = elapsedTime * 0.05
    }

    if (moonOrbitRef.current) {
      moonOrbitRef.current.rotation.y = elapsedTime * 0.15
    }
  })

  return (
    <group position={new Vector3(...position)}>
      {/* Planet */}
      <group ref={planetRef}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial color={isDark ? "#3498db" : "#2980b9"} metalness={0.2} roughness={0.8} />
        </mesh>
      </group>

      {/* Rings */}
      <mesh ref={ringsRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3, 0.4, 16, 100]} />
        <meshStandardMaterial
          transparent
          opacity={0.8}
          color={isDark ? "#9b59b6" : "#8e44ad"}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Moon Orbit */}
      <group ref={moonOrbitRef}>
        {/* Moon */}
        <mesh ref={moonRef} position={[5, 0, 0]} castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color={isDark ? "#ecf0f1" : "#bdc3c7"} metalness={0.1} roughness={0.9} />
        </mesh>
      </group>
    </group>
  )
}

function Scene() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { camera } = useThree()

  useEffect(() => {
    setMounted(true)

    // Set initial camera position
    camera.position.set(0, 0, 10)
  }, [camera])

  if (!mounted) return null

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={theme === "dark" ? "#9b59b6" : "#8e44ad"} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Planet position={[0, 0, 0]} theme={theme || "dark"} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

export function PlanetScene() {
  return (
    <div className="h-full w-full">
      <Canvas shadows dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  )
}
