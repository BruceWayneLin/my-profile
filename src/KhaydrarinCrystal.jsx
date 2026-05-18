import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

useGLTF.preload('/models/battlecruiser.glb')

/* 軌道參數 — 跟原本的球完全一樣 */
const OC = { x: 0.4, y: -1.4, z: -1.0 }
const OR = 9.2
const OS = 0.044
const OT = 0.28
const OA = 0.18

/* ── 引擎核心（完整光球 + 環）─────────────────────────────── */
const AURORA_LAYERS = [
  [0.80, 0.005, 0.00, '#6600ff', 3.0, 0.35, 0.0],
  [0.85, 0.007, 0.18, '#9933ff', 3.5, 0.50, 1.1],
  [0.89, 0.006, -0.12, '#bb55ff', 2.8, 0.40, 2.3],
  [0.93, 0.005, 0.30, '#7711ee', 2.5, 0.28, 0.7],
]

/* 推力噴射束 — 從引擎向後延伸 */
const THRUST_BEAMS = [
  { ox:  0.00, oy:  0.00, len: 3.2, color: '#aaeeff', intensity: 5.0 }, // 主軸
  { ox:  0.12, oy:  0.06, len: 2.4, color: '#00ffee', intensity: 4.0 },
  { ox: -0.12, oy:  0.06, len: 2.4, color: '#00ffee', intensity: 4.0 },
  { ox:  0.22, oy: -0.05, len: 1.8, color: '#4488ff', intensity: 3.0 },
  { ox: -0.22, oy: -0.05, len: 1.8, color: '#4488ff', intensity: 3.0 },
  { ox:  0.06, oy:  0.18, len: 1.5, color: '#3377dd', intensity: 2.5 },
  { ox: -0.06, oy:  0.18, len: 1.5, color: '#3377dd', intensity: 2.5 },
]

function EngineCore() {
  const coreRef   = useRef()
  const haloRef   = useRef()
  const lightRef  = useRef()
  const beamRefs  = useRef([])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (coreRef.current) coreRef.current.scale.setScalar(0.88 + Math.sin(t * 2.2) * 0.14)
    if (haloRef.current) haloRef.current.material.opacity = 0.22 + Math.sin(t * 1.4) * 0.08
    if (lightRef.current) lightRef.current.intensity = 14 + Math.sin(t * 1.7) * 4

    // 噴射脈動
    beamRefs.current.forEach((m, i) => {
      if (!m) return
      const pulse = 1 + Math.sin(t * 3 + i * 0.8) * 0.15
      m.scale.z = pulse
      m.material.opacity = 0.75 + Math.sin(t * 2.5 + i) * 0.2
    })
  })

  return (
    <group>
      {/* 發光核心球 */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.22, 18, 18]} />
        <meshBasicMaterial color="#ddeeff" />
      </mesh>
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.50, 14, 14]} />
        <meshBasicMaterial color="#99bbff" transparent opacity={0.22} side={THREE.BackSide} />
      </mesh>

      {/* 推力噴射束 — 向後 (-Z) 延伸，略微散開 */}
      {THRUST_BEAMS.map((b, i) => (
        <mesh
          key={i}
          ref={el => beamRefs.current[i] = el}
          position={[b.ox, b.oy, -b.len / 2]}  // 從引擎往後
        >
          <boxGeometry args={[0.016, 0.016, b.len]} />
          <meshStandardMaterial
            emissive={b.color}
            emissiveIntensity={b.intensity}
            color="#000"
            transparent opacity={0.85}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      <pointLight ref={lightRef} color="#5599ff" intensity={14} distance={22} decay={2} />
      <pointLight color="#00eeff" intensity={5}  distance={10} decay={2} />
    </group>
  )
}

function Battlecruiser({ starPos }) {
  const { scene }  = useGLTF('/models/battlecruiser.glb')
  const groupRef   = useRef()
  const angleRef   = useRef(OA)
  const nextPos    = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime
    const a = angleRef.current
    const curZ    = OC.z + OR * Math.sin(a) * Math.cos(OT)
    const distCam = Math.max(1, 10 - curZ)
    const speedMul = Math.min(5.0, Math.max(0.22, distCam / 5.5))
    angleRef.current += delta * OS * speedMul

    const na = angleRef.current
    const px = OC.x + OR * Math.cos(na)
    const py = OC.y + OR * Math.sin(na) * Math.sin(OT) + Math.sin(t * 0.55) * 0.05
    const pz = OC.z + OR * Math.sin(na) * Math.cos(OT)

    if (groupRef.current) {
      groupRef.current.position.set(px, py, pz)
      // 看向下一個位置，船頭朝飛行方向
      const na_next = na + 0.05
      nextPos.set(
        OC.x + OR * Math.cos(na_next),
        py,
        OC.z + OR * Math.sin(na_next) * Math.cos(OT)
      )
      groupRef.current.lookAt(nextPos)
    }

    starPos.current.x = px
    starPos.current.y = py
    starPos.current.z = pz
  })

  return (
    <group ref={groupRef} scale={[1, 1, 1]}>
      <primitive object={scene} />

      {/* 主要打光 — 照亮整艘船 */}
      <pointLight color="#ffffff" intensity={25} distance={40} decay={1.5} position={[3, 4, 2]} />
      <pointLight color="#aaccff" intensity={12} distance={30} decay={2}   position={[-2, 2, -1]} />
      <pointLight color="#224488" intensity={8}  distance={20} decay={2}   position={[0, -3, 0]} />

      {/* 藍色引擎發光點（沿船身散佈，像參考圖的藍圈）*/}
      <pointLight color="#4488ff" intensity={6} distance={6} decay={2} position={[1.2,  0.3, -1.5]} />
      <pointLight color="#4488ff" intensity={6} distance={6} decay={2} position={[-1.2, 0.3, -1.5]} />
      <pointLight color="#3377ff" intensity={5} distance={5} decay={2} position={[2.0,  0.5,  0.5]} />
      <pointLight color="#3377ff" intensity={5} distance={5} decay={2} position={[-2.0, 0.5,  0.5]} />
      <pointLight color="#5599ff" intensity={4} distance={4} decay={2} position={[0.5,  0.8,  1.5]} />
      <pointLight color="#5599ff" intensity={4} distance={4} decay={2} position={[-0.5, 0.8,  1.5]} />

      {/* 引擎核心光球 */}
      <group position={[0, 0, -1.0]}>
        <EngineCore />
      </group>
    </group>
  )
}

/* 粒子軌道環 */
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
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return { geo: g, angles, radii, speeds }
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

function Scene() {
  const starPos = useRef({ x: OC.x + OR, y: OC.y, z: OC.z })
  return (
    <>
      <ambientLight intensity={0.5} color="#223355" />
      <directionalLight intensity={3.5} position={[8, 6, 4]}   color="#ffffff" />
      <directionalLight intensity={1.5} position={[-5, -2, -3]} color="#4466aa" />
      <Battlecruiser starPos={starPos} />
      <OrbitRing pylonPos={starPos} count={120} radius={1.6}  spread={0.25} incX={0.15} incZ={0.98} color="#88ccff" size={0.022} opacity={0.80} speed={0.60} />
      <OrbitRing pylonPos={starPos} count={85}  radius={3.0}  spread={0.45} incX={0.68} incZ={0.73} color="#aaddff" size={0.016} opacity={0.55} speed={0.34} />
      <OrbitRing pylonPos={starPos} count={55}  radius={5.0}  spread={0.70} incX={1.22} incZ={0.42} color="#7799cc" size={0.012} opacity={0.35} speed={0.18} />
      <OrbitRing pylonPos={starPos} count={35}  radius={7.5}  spread={1.0}  incX={-0.5} incZ={0.88} color="#4455aa" size={0.008} opacity={0.18} speed={0.09} />
      <EffectComposer>
        <Bloom intensity={5.5} luminanceThreshold={0.05} luminanceSmoothing={0.92} mipmapBlur />
      </EffectComposer>
    </>
  )
}

export default function KhaydrarinCrystal() {
  return (
    <div className="crystal-canvas-wrap">
      <Canvas camera={{ position: [0, 0.5, 10], fov: 52 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  )
}
