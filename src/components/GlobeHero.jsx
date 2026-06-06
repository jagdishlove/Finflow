import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import { useMemo, useRef } from 'react'

function GlobeCore() {
  const globeRef = useRef()
  const ring1 = useRef()
  const ring2 = useRef()

  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.08
    if (ring1.current) ring1.current.rotation.z += delta * 0.12
    if (ring2.current) ring2.current.rotation.x += delta * 0.09
  })

  const points = useMemo(() => {
    const positions = []
    for (let i = 0; i < 320; i++) {
      const phi = Math.acos(-1 + (2 * i) / 320)
      const theta = Math.sqrt(320 * Math.PI) * phi
      const radius = 2.02
      positions.push(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      )
    }
    return new Float32Array(positions)
  }, [])

  const arcs = useMemo(
    () => [
      { position: [0.8, 1.2, 1.5], rotation: [0.3, 0.4, 0.1], scale: 1 },
      { position: [-1.3, -0.5, 1.2], rotation: [0.5, -0.3, 0.6], scale: 0.8 },
      { position: [1.2, -1.1, -0.8], rotation: [-0.2, 0.7, 0.2], scale: 0.9 },
    ],
    []
  )

  return (
    <group>
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.18}>
        <group ref={globeRef}>
          <mesh>
            <sphereGeometry args={[1.92, 96, 96]} />
            <meshStandardMaterial
              color="#0b1324"
              metalness={0.22}
              roughness={0.72}
              emissive="#2563eb"
              emissiveIntensity={0.12}
            />
          </mesh>

          <mesh>
            <sphereGeometry args={[1.98, 96, 96]} />
            <meshPhysicalMaterial
              color="#93c5fd"
              transparent
              opacity={0.06}
              roughness={0.18}
              transmission={0.35}
            />
          </mesh>

          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length / 3}
                array={points}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial color="#bfdbfe" size={0.022} sizeAttenuation />
          </points>
        </group>
      </Float>

      <group ref={ring1}>
        <mesh rotation-x={Math.PI / 2.8}>
          <torusGeometry args={[2.65, 0.012, 12, 260]} />
          <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.45} />
        </mesh>
      </group>

      <group ref={ring2}>
        <mesh rotation-y={0.8} rotation-x={Math.PI / 3.4}>
          <torusGeometry args={[3.05, 0.01, 12, 260]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.35} />
        </mesh>
      </group>

      {arcs.map((arc, index) => (
        <group
          key={index}
          position={arc.position}
          rotation={arc.rotation}
          scale={arc.scale}
        >
          <mesh>
            <torusGeometry args={[0.48, 0.01, 8, 100, Math.PI]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? '#8b5cf6' : '#38bdf8'}
              emissive={index % 2 === 0 ? '#8b5cf6' : '#38bdf8'}
              emissiveIntensity={0.45}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 5, 4]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-4, 2, 4]} intensity={1.5} color="#2563eb" />
      <pointLight position={[3, -2, 2]} intensity={1.1} color="#10b981" />

      <GlobeCore />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.38}
      />
    </>
  )
}

const GlobeHero = () => {
  return (
    <div className="globe-shell globe-shell-clean">
      <Canvas camera={{ position: [0, 0, 7], fov: 42 }} gl={{ alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  )
}

export default GlobeHero
