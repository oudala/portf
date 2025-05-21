"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { AdditiveBlending, Vector3 } from "three"
import * as THREE from "three"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { easing } from "maath"

// Animated floating shape that morphs and moves
function FloatingShape({ position, scale, color, speed = 1, complexity = 1 }) {
  const mesh = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Create a unique animation pattern for this shape
  const offset = useMemo(() => new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1), [])

  useFrame((state, delta) => {
    if (!mesh.current) return

    // Gentle floating motion
    const time = state.clock.getElapsedTime()
    mesh.current.position.x = position[0] + Math.sin(time * 0.2 * speed + offset.x) * 0.5
    mesh.current.position.y = position[1] + Math.sin(time * 0.3 * speed + offset.y) * 0.5
    mesh.current.position.z = position[2] + Math.sin(time * 0.1 * speed + offset.z) * 0.5

    // Slow rotation
    mesh.current.rotation.x = Math.sin(time * 0.1 * speed) * 0.2
    mesh.current.rotation.y = time * 0.1 * speed
    mesh.current.rotation.z = Math.sin(time * 0.15 * speed) * 0.2

    // Subtle scale pulsing
    const scaleFactor = 1 + Math.sin(time * 0.3 * speed) * 0.05
    mesh.current.scale.set(scale * scaleFactor, scale * scaleFactor, scale * scaleFactor)
  })

  // Choose geometry based on complexity
  const geometry = useMemo(() => {
    switch (complexity) {
      case 1:
        return <octahedronGeometry args={[1, 0]} />
      case 2:
        return <dodecahedronGeometry args={[1, 0]} />
      case 3:
        return <icosahedronGeometry args={[1, 0]} />
      default:
        return <sphereGeometry args={[1, 16, 16]} />
    }
  }, [complexity])

  return (
    <mesh ref={mesh} position={position}>
      {geometry}
      <meshStandardMaterial
        color={color}
        roughness={0.4}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={isDark ? 0.4 : 0.2}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

// Particle system that reacts subtly to cursor movement
function ParticleField() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const points = useRef<THREE.Points>(null)
  const { mouse, viewport } = useThree()

  // Create particles
  const count = 2000
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 25
      positions[i3 + 1] = (Math.random() - 0.5) * 25
      positions[i3 + 2] = (Math.random() - 0.5) * 25
    }
    return positions
  }, [count])

  // Create sizes for particles
  const sizes = useMemo(() => {
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      sizes[i] = Math.random() * 0.5 + 0.1
    }
    return sizes
  }, [count])

  useFrame((state, delta) => {
    if (!points.current) return

    // Gentle rotation of the entire particle system
    points.current.rotation.y += delta * 0.02
    points.current.rotation.x += delta * 0.01

    // Subtle reaction to mouse movement
    easing.damp3(points.current.rotation, [mouse.y * 0.1, mouse.x * 0.1, 0], 0.2, delta)
  })

  const particleColor = isDark ? "#9c88ff" : "#6c5ce7"

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={particleColor}
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

// Gradient background with shader
function GradientBackground() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const mesh = useRef<THREE.Mesh>(null)

  // Shader for smooth gradient background
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    varying vec2 vUv;
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform vec3 colorC;
    uniform float time;
    
    void main() {
      // Create a moving gradient
      vec2 distortedUV = vUv;
      distortedUV.x += sin(vUv.y * 10.0 + time * 0.1) * 0.02;
      distortedUV.y += cos(vUv.x * 10.0 + time * 0.1) * 0.02;
      
      // Three-color gradient
      vec3 color;
      float y = distortedUV.y;
      
      if (y < 0.4) {
        float t = y / 0.4;
        color = mix(colorA, colorB, t);
      } else {
        float t = (y - 0.4) / 0.6;
        color = mix(colorB, colorC, t);
      }
      
      gl_FragColor = vec4(color, 1.0);
    }
  `

  // Define colors based on theme
  const colorA = new THREE.Color(isDark ? "#0f0c29" : "#2c3e50")
  const colorB = new THREE.Color(isDark ? "#302b63" : "#3498db")
  const colorC = new THREE.Color(isDark ? "#24243e" : "#2980b9")

  const uniforms = useMemo(
    () => ({
      colorA: { value: colorA },
      colorB: { value: colorB },
      colorC: { value: colorC },
      time: { value: 0 },
    }),
    [colorA, colorB, colorC],
  )

  useFrame((state) => {
    if (!mesh.current) return
    uniforms.time.value = state.clock.getElapsedTime()
  })

  return (
    <mesh ref={mesh} position={[0, 0, -10]} scale={[30, 30, 1]}>
      <planeGeometry />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  )
}

// Main scene component
function Scene() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 10)
  }, [camera])

  // Define colors based on theme
  const primaryColor = new THREE.Color(isDark ? "#9c88ff" : "#6c5ce7")
  const secondaryColor = new THREE.Color(isDark ? "#fd79a8" : "#e84393")
  const accentColor = new THREE.Color(isDark ? "#00cec9" : "#00b894")

  return (
    <>
      <GradientBackground />
      <ParticleField />

      {/* Floating geometric shapes */}
      <FloatingShape position={[-4, 2, -5]} scale={1.5} color={primaryColor} speed={0.8} complexity={2} />
      <FloatingShape position={[5, -2, -3]} scale={1.2} color={secondaryColor} speed={1.2} complexity={1} />
      <FloatingShape position={[0, 3, -6]} scale={2} color={accentColor} speed={0.5} complexity={3} />
      <FloatingShape position={[-6, -3, -4]} scale={1} color={primaryColor} speed={1} complexity={2} />
      <FloatingShape position={[4, 4, -7]} scale={1.8} color={secondaryColor} speed={0.7} complexity={1} />

      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.4} />

      {/* Directional lights for highlights */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} color={primaryColor} />
      <directionalLight position={[-5, -5, 5]} intensity={0.3} color={secondaryColor} />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </>
  )
}

export function AbstractBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
