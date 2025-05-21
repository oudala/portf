"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { Sphere, Ring, Stars } from "@react-three/drei"
import * as THREE from "three"

function Planet() {
  const planetRef = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Colors for the planet
  const planetColor = isDark ? "#9b59b6" : "#8e44ad"
  const craterColor = isDark ? "#8e44ad" : "#7d3c98"
  const highlightColor = isDark ? "#d2b4de" : "#bb8fce"

  useFrame(({ clock }) => {
    if (planetRef.current) {
      // Create a gentle floating motion
      const t = clock.getElapsedTime()
      planetRef.current.position.y = Math.sin(t * 0.5) * 0.5
      planetRef.current.rotation.y = t * 0.2
    }
  })

  return (
    <group>
      {/* Main planet */}
      <Sphere ref={planetRef} args={[2, 64, 64]} position={[0, 0, -2]}>
        <meshStandardMaterial
          color={planetColor}
          metalness={0.4}
          roughness={0.7}
          emissive={planetColor}
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Surface details - craters */}
      <Sphere args={[2.01, 32, 32]} position={[0.5, 0.3, -1.7]}>
        <meshStandardMaterial color={craterColor} metalness={0.3} roughness={0.8} transparent opacity={0.7} />
      </Sphere>

      {/* Surface highlights */}
      <Sphere args={[2.01, 32, 32]} position={[-0.7, -0.4, -1.5]}>
        <meshStandardMaterial color={highlightColor} metalness={0.5} roughness={0.5} transparent opacity={0.3} />
      </Sphere>

      {/* Atmospheric glow */}
      <Sphere args={[2.2, 32, 32]} position={[0, 0, -2]}>
        <meshStandardMaterial color={highlightColor} transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>
    </group>
  )
}

function Orbits() {
  const orbitRef = useRef<THREE.Mesh>(null)
  const orbit2Ref = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Colors for the orbits
  const orbitColor = isDark ? "#3498db" : "#2980b9"
  const orbit2Color = isDark ? "#1abc9c" : "#16a085"

  useFrame(({ clock }) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.z = clock.getElapsedTime() * 0.1
    }
    if (orbit2Ref.current) {
      orbit2Ref.current.rotation.z = -clock.getElapsedTime() * 0.15
    }
  })

  return (
    <group>
      {/* Main orbit */}
      <Ring ref={orbitRef} args={[2.8, 2.9, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color={orbitColor} transparent opacity={0.6} side={THREE.DoubleSide} />
      </Ring>

      {/* Secondary orbit */}
      <Ring ref={orbit2Ref} args={[3.2, 3.25, 64]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color={orbit2Color} transparent opacity={0.4} side={THREE.DoubleSide} />
      </Ring>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9b59b6" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Planet />
      <Orbits />
    </>
  )
}

export function SimpleMoon() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
