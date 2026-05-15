import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const OC = { x: 0.4, y: -1.4, z: -1.0 }
const OR = 9.2
const OS = 0.044
const OT = 0.28
const OA = 0.18

const AURORA_LAYERS = [
  [0.80, 0.005, 0.00, '#6600ff', 3.0, 0.35, 0.0],
  [0.85, 0.007, 0.18, '#9933ff', 3.5, 0.50, 1.1],
  [0.89, 0.006, -0.12, '#bb55ff', 2.8, 0.40, 2.3],
  [0.93, 0.005, 0.30, '#7711ee', 2.5, 0.28, 0.7],
  [0.97, 0.004, -0.22, '#4400cc', 2.2, 0.18, 1.8],
]

/* ── 重力透鏡：獨立追蹤位置，不繼承 group 旋轉 ─────────── */
function GravityLens({ pylonPos }) {
  const meshRef = useRef()
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(
        pylonPos.current.x,
        pylonPos.current.y,
        pylonPos.current.z,
      )
    }
  })
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.35, 64, 64]} />
      <meshPhysicalMaterial
        transmission={0.96}
        thickness={2.2}
        ior={2.8}
        roughness={0.0}
        color="#aaccff"
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

function Pylon({ starPos, mobile }) {
  const coreRef    = useRef()
  const halo1Ref   = useRef()
  const ringRef    = useRef()
  const lightRef   = useRef()
  const groupRef   = useRef()
  const auroraRefs = useRef([])
  const angleRef   = useRef(OA)

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime
    const a = angleRef.current
    const curZ    = OC.z + OR * Math.sin(a) * Math.cos(OT)
    const distCam = Math.max(1, 10 - curZ)
    const divisor  = mobile ? 3.2 : 5.5
    const speedMul = Math.min(5.0, Math.max(0.22, distCam / divisor))
    angleRef.current += delta * OS * speedMul

    const na = angleRef.current
    const px = OC.x + OR * Math.cos(na)
    const py = OC.y + OR * Math.sin(na) * Math.sin(OT) + Math.sin(t * 0.55) * 0.05
    const pz = OC.z + OR * Math.sin(na) * Math.cos(OT)

    if (groupRef.current) {
      groupRef.current.position.set(px, py, pz)
      groupRef.current.rotation.y += delta * 0.12
    }
    starPos.current.x = px
    starPos.current.y = py
    starPos.current.z = pz

    if (coreRef.current) {
      const s = 0.88 + Math.sin(t * 2.2) * 0.14
      coreRef.current.scale.setScalar(s)
    }
    if (halo1Ref.current)
      halo1Ref.current.material.opacity = 0.20 + Math.sin(t * 1.4) * 0.08
    if (ringRef.current)
      ringRef.current.rotation.z += delta * 0.25
    if (lightRef.current)
      lightRef.current.intensity = 12 + Math.sin(t * 1.7) * 3.5

    auroraRefs.current.forEach((m, i) => {
      if (!m) return
      const [,,,, baseInt, baseOp, ph] = AURORA_LAYERS[i]
      m.material.opacity           = baseOp  * (0.55 + 0.45 * Math.abs(Math.sin(t * 0.8  + ph * 1.3)))
      m.material.emissiveIntensity = baseInt * (1.8  + 1.2  * Math.sin(t * 1.1  + ph))
    })
  })

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.22, 18, 18]} />
        <meshBasicMaterial color="#ddeeff" />
      </mesh>
      <mesh ref={halo1Ref}>
        <sphereGeometry args={[0.50, 14, 14]} />
        <meshBasicMaterial color="#99bbff" transparent opacity={0.20} side={THREE.BackSide} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.54, 0.028, 6, 96]} />
        <meshStandardMaterial color="#002222" emissive="#00ffcc" emissiveIntensity={2.0} metalness={0.2} roughness={0.05} transparent opacity={0.95} />
      </mesh>
      {AURORA_LAYERS.map(([radius, tube, rotZ, emissive, intensity, opacity], i) => (
        <mesh key={i} ref={el => auroraRefs.current[i] = el} rotation={[Math.PI / 2.7, 0.5, rotZ]}>
          <torusGeometry args={[radius, tube, 4, 128]} />
          <meshStandardMaterial color="#080010" emissive={emissive} emissiveIntensity={intensity} transparent opacity={opacity} depthWrite={false} />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 3.5, -0.4, 0]}>
        <torusGeometry args={[0.38, 0.010, 6, 96]} />
        <meshStandardMaterial color="#001133" emissive="#00aaff" emissiveIntensity={1.0} transparent opacity={0.65} />
      </mesh>
      <pointLight ref={lightRef} color="#5599ff" intensity={12} distance={20} decay={2} />
      <pointLight color="#ffaa33" intensity={3} distance={10} decay={2} position={[0, 0, 0.3]} />
    </group>
  )
}

function OrbitRing({ pylonPos, count, radius, spread, incX, incZ, color, size, opacity, speed }) {
  const ref    = useRef()
  const smooth = useRef({ x: OC.x, y: OC.y, z: OC.z })
  const { geo, angles, radii, speeds } = useMemo(() => {
    const angles = new Float32Array(count)
    const radii  = new Float32Array(count)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      angles[i] = (i / count) * Math.PI * 2 + Math.random() * 0.9
      radii[i]  = radius + (Math.random() - 0.5) * spread
      speeds[i] = speed * (0.65 + Math.random() * 0.7)
    }
    const pos = new Float32Array(count * 3)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return { geo, angles, radii, speeds }
  }, [count, radius, spread, speed])

  useFrame((_, delta) => {
    if (!ref.current) return
    smooth.current.x += (pylonPos.current.x - smooth.current.x) * 0.06
    smooth.current.y += (pylonPos.current.y - smooth.current.y) * 0.06
    smooth.current.z += (pylonPos.current.z - smooth.current.z) * 0.06
    const { x: cx, y: cy, z: cz } = smooth.current
    const pos = geo.attributes.position.array
    for (let i = 0; i < count; i++) {
      angles[i] += delta * speeds[i]
      const a = angles[i], r = radii[i]
      pos[i*3]   = cx + r * Math.cos(a)
      pos[i*3+1] = cy + r * Math.sin(a) * Math.sin(incX)
      pos[i*3+2] = cz + r * Math.sin(a) * Math.cos(incZ)
    }
    geo.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={color} size={size} transparent opacity={opacity} sizeAttenuation />
    </points>
  )
}

function Scene({ mobile }) {
  const starPos = useRef({ x: OC.x + OR, y: OC.y, z: OC.z })
  const m  = mobile ? 0.45 : 1
  const rs = mobile ? 0.55 : 1
  return (
    <>
      <ambientLight intensity={0.04} color="#112244" />
      <GravityLens pylonPos={starPos} />
      <Pylon starPos={starPos} mobile={mobile} />
      <OrbitRing pylonPos={starPos} count={Math.ceil(120 * m)} radius={1.6  * rs} spread={0.25 * rs} incX={0.15} incZ={0.98} color="#88ccff" size={0.022} opacity={0.80} speed={0.60} />
      <OrbitRing pylonPos={starPos} count={Math.ceil(85  * m)} radius={3.0  * rs} spread={0.45 * rs} incX={0.68} incZ={0.73} color="#aaddff" size={0.016} opacity={0.55} speed={0.34} />
      <OrbitRing pylonPos={starPos} count={Math.ceil(55  * m)} radius={5.0  * rs} spread={0.70 * rs} incX={1.22} incZ={0.42} color="#7799cc" size={0.012} opacity={0.35} speed={0.18} />
      {!mobile && <OrbitRing pylonPos={starPos} count={35} radius={7.5} spread={1.0} incX={-0.5} incZ={0.88} color="#4455aa" size={0.008} opacity={0.18} speed={0.09} />}
      <EffectComposer>
        <Bloom intensity={mobile ? 3.5 : 5.5} luminanceThreshold={0.05} luminanceSmoothing={0.92} mipmapBlur={!mobile} />
      </EffectComposer>
    </>
  )
}

export default function KhaydrarinCrystal() {
  const mobile = window.innerWidth <= 768
  return (
    <div className="crystal-canvas-wrap">
      <Canvas camera={{ position: [0, 0.5, 10], fov: 52 }} dpr={mobile ? 1 : [1, 1.5]} gl={{ antialias: !mobile, alpha: true }}>
        <Scene mobile={mobile} />
      </Canvas>
    </div>
  )
}
