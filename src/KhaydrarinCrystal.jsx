import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

/* ────────────────────────────────────────────────────────────
   大軌道參數
   軌道在 XZ 平面，略微傾斜，繞著鏡頭前方的空間中心運行
   近點距鏡頭 ~3 單位 → 很大很亮
   遠點距鏡頭 ~20 單位 → 一顆小星
──────────────────────────────────────────────────────────── */
const OC = { x: 0.4, y: -1.4, z: -1.0 }   // 軌道中心
const OR = 9.2                               // 軌道半徑（近點距鏡頭約 2.2 單位）
const OS = 0.044                             // 角速度 rad/s（約 143 秒繞一圈）
const OT = 0.28                              // 軌道傾斜角
const OA = 0.18                              // 起始角度

function orbitAt(t) {
  const a = OA + t * OS
  return {
    x: OC.x + OR * Math.cos(a),
    y: OC.y + OR * Math.sin(a) * Math.sin(OT),
    z: OC.z + OR * Math.sin(a) * Math.cos(OT),
  }
}

/* ── Pylon（無鑽石，只留環 + 發光核心）─────────────────── */
function Pylon({ mouseRef, starPos, mobile }) {
  const coreRef  = useRef()
  const halo1Ref = useRef()
  const ringRef  = useRef()
  const lightRef = useRef()
  const groupRef = useRef()

  useFrame(({ clock }, delta) => {
    const t  = clock.elapsedTime
    const rs = mobile ? 0.55 : 1
    const op = orbitAt(t)
    const px = OC.x + (op.x - OC.x) * rs + mouseRef.current.x * 0.6
    const py = OC.y + (op.y - OC.y) * rs + mouseRef.current.y * 0.35 + Math.sin(t * 0.55) * 0.05
    const pz = OC.z + (op.z - OC.z) * rs

    if (groupRef.current) {
      groupRef.current.position.set(px, py, pz)
      groupRef.current.rotation.y += delta * 0.12
      /* 跟視角：滑鼠/陀螺儀讓環傾斜 */
      const tx = mouseRef.current.y *  0.40
      const tz = mouseRef.current.x * -0.28
      groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.05
      groupRef.current.rotation.z += (tz - groupRef.current.rotation.z) * 0.05
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
  })

  return (
    <group ref={groupRef}>
      {/* 發光核心球 */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.22, 18, 18]} />
        <meshBasicMaterial color="#ddeeff" />
      </mesh>

      {/* 內暈 */}
      <mesh ref={halo1Ref}>
        <sphereGeometry args={[0.50, 14, 14]} />
        <meshBasicMaterial color="#99bbff" transparent opacity={0.20} side={THREE.BackSide} />
      </mesh>

      {/* 異星主環 — 六角截面電漿環 */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.54, 0.072, 6, 96]} />
        <meshStandardMaterial
          color="#002222" emissive="#00ffcc" emissiveIntensity={1.4}
          metalness={0.2} roughness={0.05}
          transparent opacity={0.92}
        />
      </mesh>

      {/* 外層能量環 — 稍大、紫色、慢轉 */}
      <mesh rotation={[Math.PI / 2.7, 0.5, 0]}>
        <torusGeometry args={[0.85, 0.018, 6, 96]} />
        <meshStandardMaterial
          color="#110022" emissive="#cc44ff" emissiveIntensity={1.2}
          transparent opacity={0.75}
        />
      </mesh>

      {/* 內層細環 — 反向傾斜 */}
      <mesh rotation={[-Math.PI / 3.5, -0.4, 0]}>
        <torusGeometry args={[0.38, 0.010, 6, 96]} />
        <meshStandardMaterial
          color="#001133" emissive="#00aaff" emissiveIntensity={1.0}
          transparent opacity={0.65}
        />
      </mesh>

      <pointLight ref={lightRef} color="#5599ff" intensity={12} distance={20} decay={2} />
      <pointLight color="#ffaa33" intensity={3}   distance={10} decay={2} position={[0, 0, 0.3]} />
    </group>
  )
}

/* ── 繞 Pylon 公轉的粒子環 ──────────────────────────────── */
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

    /* 跟著 Pylon 平滑移動 */
    smooth.current.x += (pylonPos.current.x - smooth.current.x) * 0.06
    smooth.current.y += (pylonPos.current.y - smooth.current.y) * 0.06
    smooth.current.z += (pylonPos.current.z - smooth.current.z) * 0.06

    const cx = smooth.current.x
    const cy = smooth.current.y
    const cz = smooth.current.z
    const pos = geo.attributes.position.array

    for (let i = 0; i < count; i++) {
      angles[i] += delta * speeds[i]
      const a = angles[i], r = radii[i]
      pos[i * 3]     = cx + r * Math.cos(a)
      pos[i * 3 + 1] = cy + r * Math.sin(a) * Math.sin(incX)
      pos[i * 3 + 2] = cz + r * Math.sin(a) * Math.cos(incZ)
    }
    geo.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={color} size={size} transparent opacity={opacity} sizeAttenuation />
    </points>
  )
}

/* ── 彗星尾巴 ───────────────────────────────────────────── */
const TAIL = 120  // 尾巴點數

function CometTail({ pylonPos }) {
  const ref = useRef()
  const history = useRef(new Array(TAIL).fill(null).map(() => ({ x: 0, y: -99, z: 0 })))

  const { geo, positions, colors } = useMemo(() => {
    const positions = new Float32Array(TAIL * 3)
    const colors    = new Float32Array(TAIL * 3)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3))
    return { geo, positions, colors }
  }, [])

  useFrame(() => {
    /* 更新歷史位置 */
    for (let i = TAIL - 1; i > 0; i--) {
      history.current[i] = history.current[i - 1]
    }
    history.current[0] = { ...pylonPos.current }

    for (let i = 0; i < TAIL; i++) {
      const h = history.current[i]
      positions[i * 3]     = h.x
      positions[i * 3 + 1] = h.y
      positions[i * 3 + 2] = h.z

      /* 越舊越暗：白 → 藍白 → 消失 */
      const f = Math.pow(1 - i / TAIL, 1.4)
      colors[i * 3]     = 0.85 * f
      colors[i * 3 + 1] = 0.90 * f
      colors[i * 3 + 2] = 1.0  * f
    }
    geo.attributes.position.needsUpdate = true
    geo.attributes.color.needsUpdate    = true
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.10} transparent opacity={0.65}
        sizeAttenuation vertexColors
      />
    </points>
  )
}

/* ── Scene root ─────────────────────────────────────────── */
function Scene({ mouseRef, mobile }) {
  const starPos = useRef({ x: OC.x + OR, y: OC.y, z: OC.z })
  const m  = mobile ? 0.45 : 1   // 粒子數係數
  const rs = mobile ? 0.55 : 1   // 半徑縮放係數

  return (
    <>
      <ambientLight intensity={0.04} color="#112244" />
      <Pylon mouseRef={mouseRef} starPos={starPos} mobile={mobile} />
      <CometTail pylonPos={starPos} />
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

/* ── Export ─────────────────────────────────────────────── */
export default function KhaydrarinCrystal() {
  const mouseRef = useRef({ x: 0, y: 0 })
  const mobile   = window.innerWidth <= 768

  useEffect(() => {
    /* 桌機：滑鼠 */
    const onMove = e => {
      mouseRef.current = {
        x:  e.clientX / window.innerWidth  - 0.5,
        y: -(e.clientY / window.innerHeight - 0.5),
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    /* 手機：陀螺儀 */
    const onOrientation = e => {
      if (e.gamma == null) return
      mouseRef.current = {
        x: Math.max(-1, Math.min(1,  e.gamma / 40)),
        y: Math.max(-1, Math.min(1, (e.beta - 45) / 40)),
      }
    }
    window.addEventListener('deviceorientation', onOrientation, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('deviceorientation', onOrientation)
    }
  }, [])

  return (
    <div className="crystal-canvas-wrap">
      <Canvas
        camera={{ position: [0, 0.5, 10], fov: 52 }}
        dpr={mobile ? 1 : [1, 1.5]}
        gl={{ antialias: !mobile, alpha: true }}
      >
        <Scene mouseRef={mouseRef} mobile={mobile} />
      </Canvas>
    </div>
  )
}
