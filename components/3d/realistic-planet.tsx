"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { Ring, Stars } from "@react-three/drei"
import * as THREE from "three"

// Replace the SpaceBackground function with this implementation
function SpaceBackground() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Create a shader material with a gradient
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
    uniform vec3 colorD;
    
    void main() {
      vec3 color;
      
      if (vUv.y < 0.45) {
        float t = vUv.y / 0.45;
        color = mix(colorA, colorB, t);
      } else if (vUv.y < 0.65) {
        float t = (vUv.y - 0.45) / 0.2;
        color = mix(colorB, colorC, t);
      } else {
        float t = (vUv.y - 0.65) / 0.35;
        color = mix(colorC, colorD, t);
      }
      
      gl_FragColor = vec4(color, 1.0);
    }
  `

  // Define colors based on theme
  const colorA = new THREE.Color(isDark ? "#0f0c29" : "#2c3e50")
  const colorB = new THREE.Color(isDark ? "#302b63" : "#3498db")
  const colorC = new THREE.Color(isDark ? "#24243e" : "#2980b9")
  const colorD = new THREE.Color(isDark ? "#000000" : "#1e3c72")

  return (
    <mesh scale={[100, 100, 100]} rotation={[0, 0, 0]}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        side={THREE.BackSide}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          colorA: { value: colorA },
          colorB: { value: colorB },
          colorC: { value: colorC },
          colorD: { value: colorD },
        }}
      />
    </mesh>
  )
}

// Replace the Nebula function with this implementation
function Nebula() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const nebulaRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame(({ clock }) => {
    if (nebulaRef.current) {
      // Slow rotation for the nebula
      nebulaRef.current.rotation.z = clock.getElapsedTime() * 0.02
    }
  })

  // Create a shader for the nebula
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
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    void main() {
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);
      
      // Create a radial gradient
      vec3 color;
      if (dist < 0.3) {
        color = colorA;
      } else if (dist < 0.6) {
        float t = (dist - 0.3) / 0.3;
        color = mix(colorA, colorB, t);
      } else {
        float t = (dist - 0.6) / 0.4;
        color = mix(colorB, colorC, t);
      }
      
      // Add some noise
      float noise = random(vUv + time * 0.01) * 0.1;
      color += noise;
      
      gl_FragColor = vec4(color, 1.0 - dist);
    }
  `

  // Define colors based on theme
  const colorA = new THREE.Color(isDark ? "#9b59b6" : "#8e44ad")
  const colorB = new THREE.Color(isDark ? "#8e44ad" : "#9b59b6")
  const colorC = new THREE.Color(isDark ? "#3498db" : "#2980b9")

  return (
    <mesh ref={nebulaRef} position={[0, 0, -50]} scale={[80, 80, 1]}>
      <planeGeometry />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          colorA: { value: colorA },
          colorB: { value: colorB },
          colorC: { value: colorC },
          time: { value: 0 },
        }}
        transparent={true}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

function Planet() {
  const planetRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Generate procedural textures
  const planetTexture = useRef<THREE.Texture | null>(null)
  const bumpTexture = useRef<THREE.Texture | null>(null)
  const cloudsTexture = useRef<THREE.Texture | null>(null)

  useEffect(() => {
    // Create procedural planet texture
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext("2d")
    if (ctx) {
      // Base color
      const baseColor = isDark ? "#8e44ad" : "#9b59b6"
      ctx.fillStyle = baseColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add some variation
      for (let i = 0; i < 10000; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 2 + 0.5

        // Vary the color slightly
        const hue = isDark ? 270 + Math.random() * 30 : 280 + Math.random() * 30
        const saturation = 60 + Math.random() * 20
        const lightness = 30 + Math.random() * 30

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`
        ctx.fill()
      }

      // Create larger features
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = 20 + Math.random() * 40

        // Create darker or lighter patches
        const lightness = Math.random() > 0.5 ? 50 + Math.random() * 20 : 20 + Math.random() * 15

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${isDark ? 270 : 280}, 70%, ${lightness}%, 0.3)`
        ctx.fill()
      }

      // Create texture from canvas
      planetTexture.current = new THREE.CanvasTexture(canvas)
      planetTexture.current.wrapS = THREE.RepeatWrapping
      planetTexture.current.wrapT = THREE.RepeatWrapping
    }

    // Create bump map
    const bumpCanvas = document.createElement("canvas")
    bumpCanvas.width = 1024
    bumpCanvas.height = 512
    const bumpCtx = bumpCanvas.getContext("2d")
    if (bumpCtx) {
      bumpCtx.fillStyle = "#000000"
      bumpCtx.fillRect(0, 0, bumpCanvas.width, bumpCanvas.height)

      // Add craters
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * bumpCanvas.width
        const y = Math.random() * bumpCanvas.height
        const radius = 5 + Math.random() * 20

        const gradient = bumpCtx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.3)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        bumpCtx.beginPath()
        bumpCtx.arc(x, y, radius, 0, Math.PI * 2)
        bumpCtx.fillStyle = gradient
        bumpCtx.fill()
      }

      // Create mountain ranges
      for (let i = 0; i < 10; i++) {
        const startX = Math.random() * bumpCanvas.width
        const startY = Math.random() * bumpCanvas.height

        bumpCtx.beginPath()
        bumpCtx.moveTo(startX, startY)

        const points = 5 + Math.floor(Math.random() * 10)
        for (let j = 0; j < points; j++) {
          const x = startX + (Math.random() * 200 - 100)
          const y = startY + (Math.random() * 200 - 100)
          bumpCtx.lineTo(x, y)
        }

        bumpCtx.closePath()
        bumpCtx.fillStyle = "rgba(255, 255, 255, 0.4)"
        bumpCtx.fill()
      }

      bumpTexture.current = new THREE.CanvasTexture(bumpCanvas)
      bumpTexture.current.wrapS = THREE.RepeatWrapping
      bumpTexture.current.wrapT = THREE.RepeatWrapping
    }

    // Create clouds texture
    const cloudsCanvas = document.createElement("canvas")
    cloudsCanvas.width = 1024
    cloudsCanvas.height = 512
    const cloudsCtx = cloudsCanvas.getContext("2d")
    if (cloudsCtx) {
      cloudsCtx.fillStyle = "#000000"
      cloudsCtx.fillRect(0, 0, cloudsCanvas.width, cloudsCanvas.height)

      // Add cloud formations
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * cloudsCanvas.width
        const y = Math.random() * cloudsCanvas.height
        const radius = 10 + Math.random() * 40

        const gradient = cloudsCtx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)")
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.5)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        cloudsCtx.beginPath()
        cloudsCtx.arc(x, y, radius, 0, Math.PI * 2)
        cloudsCtx.fillStyle = gradient
        cloudsCtx.fill()
      }

      // Create larger cloud systems
      for (let i = 0; i < 5; i++) {
        const centerX = Math.random() * cloudsCanvas.width
        const centerY = Math.random() * cloudsCanvas.height

        for (let j = 0; j < 20; j++) {
          const x = centerX + (Math.random() * 100 - 50)
          const y = centerY + (Math.random() * 100 - 50)
          const radius = 15 + Math.random() * 25

          const gradient = cloudsCtx.createRadialGradient(x, y, 0, x, y, radius)
          gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
          gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.3)")
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          cloudsCtx.beginPath()
          cloudsCtx.arc(x, y, radius, 0, Math.PI * 2)
          cloudsCtx.fillStyle = gradient
          cloudsCtx.fill()
        }
      }

      cloudsTexture.current = new THREE.CanvasTexture(cloudsCanvas)
      cloudsTexture.current.wrapS = THREE.RepeatWrapping
      cloudsTexture.current.wrapT = THREE.RepeatWrapping
    }

    return () => {
      // Clean up textures
      planetTexture.current?.dispose()
      bumpTexture.current?.dispose()
      cloudsTexture.current?.dispose()
    }
  }, [isDark])

  useFrame(({ clock }) => {
    if (planetRef.current) {
      // Create a gentle rotation for the planet
      const t = clock.getElapsedTime()
      planetRef.current.rotation.y = t * 0.1
    }

    if (cloudsRef.current) {
      // Make clouds rotate slightly faster than the planet
      const t = clock.getElapsedTime()
      cloudsRef.current.rotation.y = t * 0.15
    }
  })

  // Colors for the planet
  const planetColor = isDark ? "#9b59b6" : "#8e44ad"
  const atmosphereColor = isDark ? "#d2b4de" : "#bb8fce"

  return (
    <group>
      {/* Main planet */}
      <mesh ref={planetRef} castShadow receiveShadow position={[0, 0, -2]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color={planetColor}
          map={planetTexture.current}
          bumpMap={bumpTexture.current}
          bumpScale={0.05}
          metalness={0.2}
          roughness={0.8}
          emissive={planetColor}
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Clouds layer */}
      <mesh ref={cloudsRef} position={[0, 0, -2]}>
        <sphereGeometry args={[2.05, 32, 32]} />
        <meshStandardMaterial
          map={cloudsTexture.current}
          transparent
          opacity={0.4}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Atmospheric glow */}
      <mesh ref={atmosphereRef} position={[0, 0, -2]}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshStandardMaterial
          color={atmosphereColor}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          emissive={atmosphereColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Rings */}
      <group rotation={[Math.PI / 4, 0, 0]}>
        <Ring args={[3, 3.4, 64]} position={[0, 0, -2]}>
          <meshStandardMaterial
            color={isDark ? "#3498db" : "#2980b9"}
            side={THREE.DoubleSide}
            transparent
            opacity={0.7}
            metalness={0.5}
            roughness={0.5}
          />
        </Ring>
        <Ring args={[3.5, 3.7, 64]} position={[0, 0, -2]}>
          <meshStandardMaterial
            color={isDark ? "#9b59b6" : "#8e44ad"}
            side={THREE.DoubleSide}
            transparent
            opacity={0.5}
            metalness={0.3}
            roughness={0.7}
          />
        </Ring>
      </group>

      {/* Moon */}
      <group rotation={[0, 0, Math.PI / 6]}>
        <mesh position={[5, 0, -2]} castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color={isDark ? "#ecf0f1" : "#bdc3c7"} metalness={0.1} roughness={0.9} />
        </mesh>
      </group>
    </group>
  )
}

// Fix the TwinklingStars component to address the "Cannot read properties of undefined (reading 'count')" error
function TwinklingStars() {
  const starsRef = useRef<THREE.Points>(null)
  const sizesRef = useRef<Float32Array | null>(null)

  // Create the stars with initial positions, sizes, and colors
  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)

  // Initialize positions array with random values
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] = (Math.random() - 0.5) * 100 // x
    positions[i + 1] = (Math.random() - 0.5) * 100 // y
    positions[i + 2] = (Math.random() - 0.5) * 100 // z
  }

  // Initialize sizes array
  const sizes = new Float32Array(particleCount)
  for (let i = 0; i < particleCount; i++) {
    sizes[i] = Math.random() * 2 + 0.5
  }

  // Initialize colors array (mostly white with hints of blue and purple)
  const colors = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    colors[i3] = Math.random() * 0.3 + 0.7 // r
    colors[i3 + 1] = Math.random() * 0.3 + 0.7 // g
    colors[i3 + 2] = Math.random() * 0.2 + 0.8 // b
  }

  // Store sizes for animation
  sizesRef.current = sizes

  useFrame(({ clock }) => {
    if (starsRef.current && sizesRef.current) {
      const time = clock.getElapsedTime()
      const geometry = starsRef.current.geometry as THREE.BufferGeometry
      const sizeAttribute = geometry.attributes.size

      if (sizeAttribute && sizeAttribute.array) {
        // Make stars twinkle by changing their sizes
        for (let i = 0; i < particleCount; i++) {
          const t = (time + i * 0.1) % 4
          const scale = 1 + 0.3 * Math.sin(t * Math.PI)
          sizeAttribute.array[i] = sizesRef.current[i] * scale
        }

        sizeAttribute.needsUpdate = true
      }
    }
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={particleCount} array={sizes} itemSize={1} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={1}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  const { camera } = useThree()
  const { theme } = useTheme()

  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 0, 10)
  }, [camera])

  return (
    <>
      <SpaceBackground />
      <Nebula />
      <TwinklingStars />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={theme === "dark" ? "#9b59b6" : "#8e44ad"} />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Planet />
    </>
  )
}

export function RealisticPlanet() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
