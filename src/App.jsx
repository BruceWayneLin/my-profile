import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import emailjs from '@emailjs/browser'
import './index.css'

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const TIMELINE = [
  {
    date: '2010/3',
    gif: '/img/Thor.gif',
    en: 'University of Oregon, USA',
    zh: '畢業於美國奧瑞岡大學',
  },
  {
    date: '2010/11',
    gif: '/img/Viking.gif',
    en: 'Interpreter — Army Alternative Service, Chiayi County Gov.',
    zh: '嘉義縣府管考科外語替代役，英日中三語口譯',
  },
  {
    date: '2011/1',
    gif: '/img/Void_Ray.gif',
    en: 'Software Engineer — Walton Computing  ·  2011–2014',
    zh: '華頓雲端資訊 軟體工程師，長照管理系統 & 藥物互作分析平台，PHP / MySQL / jQuery',
  },
  {
    date: '2014/11',
    gif: '/img/Battlecruiser.gif',
    en: 'QA Inspector — Nippon Sharyo USA  ·  2014–2016',
    zh: '日本車輛（JR子公司）北美品質檢查員，Chicago / Vancouver / Toronto / California / Japan',
  },
  {
    date: '2016/5',
    gif: '/img/twil.gif',
    en: 'Frontend Engineer — Richart App / Fubon Bank  ·  2016',
    zh: '台新銀行 Richart App 前端 & 富邦銀行內部管理系統，Vue1 / Angular2 / jQuery',
  },
  {
    date: '2017/1',
    gif: '/img/Zealot.gif',
    en: 'Front-end Leader — CareLine UK Insurance  ·  2017–2018',
    zh: '英商凱萊保險 前端主管，機車 / 旅平 / 寵物險平台，Angular4–6 / Vue / Tailwind CSS，直屬英國主管',
  },
  {
    date: '2018/1',
    gif: '/img/Marauder.gif',
    en: 'Senior Engineer & Tech Lead — Sunny Software  ·  2018–Present',
    zh: 'Sunny Software 資深工程師 / 技術主管，Vue3 / React / Node.js / Go / K8s / AWS，帶領團隊開發高併發博弈平台與即時系統',
  },
]

const CAT_COLOR = {
  frontend: '#4a9eff',
  backend:  '#b44aff',
  devops:   '#00ffea',
  db:       '#ff4af8',
  other:    '#ffaa00',
}

const SKILLS = [
  { name: 'Vue 3',        cat: 'frontend' },
  { name: 'React',        cat: 'frontend' },
  { name: 'Angular',      cat: 'frontend' },
  { name: 'TypeScript',   cat: 'frontend' },
  { name: 'JavaScript',   cat: 'frontend' },
  { name: 'Tailwind CSS', cat: 'frontend' },
  { name: 'SCSS',         cat: 'frontend' },
  { name: 'jQuery',       cat: 'frontend' },
  { name: 'Node.js',      cat: 'backend'  },
  { name: 'Go (Golang)',  cat: 'backend'  },
  { name: 'Laravel/PHP',  cat: 'backend'  },
  { name: 'Express.js',   cat: 'backend'  },
  { name: 'C / C++',      cat: 'backend'  },
  { name: 'Docker',       cat: 'devops'   },
  { name: 'Kubernetes',   cat: 'devops'   },
  { name: 'AWS',          cat: 'devops'   },
  { name: 'CI/CD',        cat: 'devops'   },
  { name: 'MySQL',        cat: 'db'       },
  { name: 'PostgreSQL',   cat: 'db'       },
  { name: 'MongoDB',      cat: 'db'       },
  { name: 'Redis',        cat: 'db'       },
  { name: 'WebSocket',    cat: 'other'    },
  { name: 'Unity',        cat: 'other'    },
  { name: 'Pixi.js',      cat: 'other'    },
  { name: 'Git',          cat: 'other'    },
  { name: 'Linux',        cat: 'other'    },
]

// tag: 'live' | 'demo' | 'private'
const PORTFOLIO = [
  // ── Live sites ──────────────────────────────
  {
    name: 'Portfolio v1',
    nameEn: 'Original jQuery Portfolio',
    icon: '🏛️',
    tech: 'jQuery · Bootstrap · CSS3 · AniJS',
    desc: '2016 年手刻的第一版作品集，StarCraft GIF 時光機 + 3D Cube 作品展示 + 火箭彩蛋。現在這個網站的前身。',
    url: '/projects/portfolio-v1/',
    tag: 'demo',
  },
  {
    name: 'StockChicken.tw',
    nameEn: 'Stock Prediction Platform',
    icon: '📈',
    tech: 'Full Stack',
    desc: '股票預測分析平台，個人獨立開發',
    url: 'https://www.stockchicken.tw',
    tag: 'live',
  },
  {
    name: '量化交易平台',
    nameEn: 'Quantitative Trading Platform',
    icon: '🤖',
    tech: 'Algorithmic Trading · Quant Finance',
    desc: '量化交易策略平台，個人獨立開發',
    url: 'https://trade.jungwei.com.tw',
    tag: 'live',
  },
  // ── Local demos (靜態 build) ─────────────────
  {
    name: 'TGC 官方網站',
    nameEn: 'TGC Official Site',
    icon: '🎯',
    tech: 'React (CRA)',
    desc: '博弈平台公司官方網站，React 開發，完整版面設計',
    url: '/projects/tg-official/',
    tag: 'demo',
  },
  {
    name: 'CareLine 旅遊險',
    nameEn: 'Travel Insurance',
    icon: '✈️',
    tech: 'Angular 4',
    desc: '英商凱萊線上旅遊平安險投保流程，Angular 4 開發',
    url: null,
    tag: 'private',
  },
  {
    name: 'CareLine 機車險 v2',
    nameEn: 'Moto Insurance v2',
    icon: '🏍️',
    tech: 'Vue.js · SCSS',
    desc: 'Vue 重構版機車保險線上投保流程，多步驟表單',
    url: '/projects/moto/',
    tag: 'demo',
  },
  {
    name: '機車險 Prototype v1',
    nameEn: 'Moto Insurance v1',
    icon: '🛵',
    tech: 'Vue.js · jQuery',
    desc: '機車保險投保流程原型，含登入、填表、確認頁',
    url: '/projects/protoVersion1/',
    tag: 'demo',
  },
  {
    name: '遊戲桌台 UI',
    nameEn: 'Game Table UI',
    icon: '🃏',
    tech: 'Vue.js',
    desc: '博弈遊戲桌台介面，Vue CLI 開發',
    url: '/projects/game-table/',
    tag: 'demo',
  },
  {
    name: '博弈遊戲 Mock',
    nameEn: 'Casino Game Mock',
    icon: '🎲',
    tech: 'Vue.js',
    desc: '娛樂城遊戲界面完整 Mock，含遊戲列表與後台',
    url: '/projects/game/',
    tag: 'demo',
  },
  {
    name: '娛樂家官網',
    nameEn: 'Entertainment Co. Site',
    icon: '🌐',
    tech: 'jQuery · CSS3',
    desc: '娛樂公司形象官網，完整版面設計與動態效果',
    url: '/projects/mock/',
    tag: 'demo',
  },
  {
    name: 'Dream Web App',
    nameEn: 'Dream App',
    icon: '💫',
    tech: 'Vue.js',
    desc: '前端 Web App 展示範例，Vue + 搜尋功能',
    url: '/projects/dream/',
    tag: 'demo',
  },
  {
    name: '保險 Prototype',
    nameEn: 'Insurance Proto',
    icon: '📝',
    tech: 'Vue.js',
    desc: '保險投保流程 Prototype，多步驟問卷設計',
    url: '/projects/proto/',
    tag: 'demo',
  },
  // ── Private / Internal work ──────────────────
  {
    name: '即時遊戲平台',
    nameEn: 'Real-time Gaming Platform',
    icon: '⚡',
    tech: 'Vue3 · React · Node.js · Go · WebSocket · K8s · AWS',
    desc: '高併發遊戲平台，即時下注 / 聊天室 / 會員管理 / 後台，CI/CD + AWS 雲端架構',
    url: null,
    tag: 'private',
  },
  {
    name: '多人遊戲房間系統',
    nameEn: 'Game Room Mgmt',
    icon: '🕹️',
    tech: 'Node.js · Go · Redis · Kubernetes',
    desc: '多人即時遊戲房間，玩家狀態同步 / 事件傳遞，K8s 水平擴展',
    url: null,
    tag: 'private',
  },
  {
    name: '球鞋搶購系統',
    nameEn: 'Sneaker Bot',
    icon: '👟',
    tech: 'Go · Goroutine · Channel',
    desc: '高頻搶購系統，Go 併發（Goroutine/Channel）優化交易請求速度',
    url: null,
    tag: 'private',
  },
  {
    name: 'Unity 拉霸遊戲',
    nameEn: 'Unity Slot Game',
    icon: '🎰',
    tech: 'Unity · C++',
    desc: '鈊象拉霸遊戲，C++ 核心邏輯與動畫效果開發',
    url: null,
    tag: 'private',
  },
  {
    name: '銀行 / 保險系統',
    nameEn: 'Banking & Insurance',
    icon: '🏦',
    tech: 'Vue1 · Angular2 · jQuery · Angular 4–6',
    desc: 'Richart App、富邦銀行、CareLine 機車 / 旅平 / 寵物險系統前端開發',
    url: null,
    tag: 'private',
  },
  {
    name: '長照 / 勞健保系統',
    nameEn: 'Healthcare Systems',
    icon: '🏥',
    tech: 'PHP (Joomla) · MySQL · Angular 8',
    desc: '長照中心管理系統、藥物交互作用分析、政府勞健保申報平台',
    url: null,
    tag: 'private',
  },
]

/* ══════════════════════════════════════════
   STARFIELD CANVAS
══════════════════════════════════════════ */
function StarfieldCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let W, H

    const LAYERS = [
      { count: 200, speed: 0.08, sizeRange: [0.4, 1.0], alpha: 0.6 },
      { count: 100, speed: 0.18, sizeRange: [1.0, 2.0], alpha: 0.8 },
      { count:  40, speed: 0.35, sizeRange: [1.5, 3.0], alpha: 1.0 },
    ]

    let stars = []
    let shootingStars = []

    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    function initStars() {
      stars = []
      LAYERS.forEach(layer => {
        for (let i = 0; i < layer.count; i++) {
          stars.push({
            x: Math.random() * W,
            y: Math.random() * H,
            size: layer.sizeRange[0] + Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]),
            speed: layer.speed * (0.8 + Math.random() * 0.4),
            alpha: layer.alpha * (0.5 + Math.random() * 0.5),
            twinkle: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.02 + Math.random() * 0.03,
            hue: Math.random() < 0.15 ? (Math.random() < 0.5 ? 200 : 270) : 0,
          })
        }
      })
    }

    function spawnShootingStar() {
      if (shootingStars.length > 3) return
      const angle = -Math.PI / 5 + (Math.random() - 0.5) * 0.4
      shootingStars.push({
        x: Math.random() * W * 0.8,
        y: Math.random() * H * 0.4,
        vx: Math.cos(angle) * (8 + Math.random() * 6),
        vy: Math.sin(angle) * (8 + Math.random() * 6) + 2,
        len: 80 + Math.random() * 100,
        life: 1,
        decay: 0.02 + Math.random() * 0.015,
      })
    }

    let shootingTimer = 0

    function draw(ts) {
      ctx.clearRect(0, 0, W, H)

      // stars
      stars.forEach(s => {
        s.twinkle += s.twinkleSpeed
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle))
        if (s.hue === 0) {
          ctx.fillStyle = `rgba(255,255,255,${a})`
        } else if (s.hue === 200) {
          ctx.fillStyle = `rgba(100,180,255,${a})`
        } else {
          ctx.fillStyle = `rgba(180,100,255,${a})`
        }
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()

        s.y += s.speed
        if (s.y > H) { s.y = -2; s.x = Math.random() * W }
      })

      // shooting stars
      shootingTimer++
      if (shootingTimer > 90 + Math.random() * 120) {
        spawnShootingStar()
        shootingTimer = 0
      }

      shootingStars = shootingStars.filter(ss => ss.life > 0)
      shootingStars.forEach(ss => {
        const tailX = ss.x - ss.vx * (ss.len / Math.hypot(ss.vx, ss.vy))
        const tailY = ss.y - ss.vy * (ss.len / Math.hypot(ss.vx, ss.vy))
        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y)
        grad.addColorStop(0, `rgba(255,255,255,0)`)
        grad.addColorStop(0.6, `rgba(160,220,255,${ss.life * 0.5})`)
        grad.addColorStop(1, `rgba(255,255,255,${ss.life})`)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(ss.x, ss.y)
        ctx.stroke()
        ss.x += ss.vx
        ss.y += ss.vy
        ss.life -= ss.decay
      })

      raf = requestAnimationFrame(draw)
    }

    resize()
    initStars()
    raf = requestAnimationFrame(draw)

    window.addEventListener('resize', () => { resize(); initStars() })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="starfield-canvas" />
}

/* ══════════════════════════════════════════
   LASER GRID (perspective)
══════════════════════════════════════════ */
function LaserGrid({ color = '#4a9eff', opacity = 0.12 }) {
  return (
    <div className="laser-grid" style={{ '--grid-color': color, '--grid-opacity': opacity }}>
      <div className="laser-grid-inner" />
    </div>
  )
}

/* ══════════════════════════════════════════
   NEBULA BLOBS
══════════════════════════════════════════ */
function NebulaBlobs() {
  return (
    <div className="nebula-wrap" aria-hidden>
      <div className="nebula n1" />
      <div className="nebula n2" />
      <div className="nebula n3" />
      <div className="nebula n4" />
    </div>
  )
}

/* ══════════════════════════════════════════
   SCAN LINE
══════════════════════════════════════════ */
function ScanLine() {
  return <div className="scanline" aria-hidden />
}

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#timeline', label: '時光機' },
    { href: '#about',    label: 'About' },
    { href: '#skills',   label: 'Skills' },
    { href: '#portfolio',label: 'Portfolio' },
    { href: '#contact',  label: 'Contact' },
  ]
  return (
    <nav className="navbar">
      <a href="#top" className="navbar-brand">JW<span className="brand-dot">.</span>LIN</a>
      <ul className={`navbar-links${open ? ' open' : ''}`}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          </li>
        ))}
      </ul>
      <button className="navbar-toggle" onClick={() => setOpen(o => !o)}>☰</button>
    </nav>
  )
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function Hero() {
  const audioRef = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 120])

  const playAudio = () => {
    if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play() }
  }

  return (
    <section id="top" className="hero">
      <StarfieldCanvas />
      <NebulaBlobs />
      <ScanLine />
      <LaserGrid color="#4a9eff" opacity={0.06} />

      <motion.div className="hero-content" style={{ y }}>
        {/* orbit ring */}
        <div className="orbit-ring">
          <div className="orbit-dot" />
        </div>

        <motion.div
          className="portrait-wrapper"
          onClick={playAudio}
          title="Click for SCV ready!"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {[...Array(5)].map((_, i) => <div key={i} className="pulser" />)}
          <div className="portrait-holo-ring" />
          <img className="portrait-img" src="/img/marine.gif" alt="Jung-wei Lin" />
          <div className="portrait-overlay" />
        </motion.div>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Jung<span className="name-dash">-</span>wei<span className="hero-comma">,</span> Lin
        </motion.h1>

        <motion.div
          className="hero-tags"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <span className="htag">SENIOR SOFTWARE ENGINEER</span>
          <span className="htag-sep">◆</span>
          <span className="htag">Tech Lead · 10+ Yrs</span>
        </motion.div>

        <motion.div
          className="hero-coords"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span>23.6978° N</span>
          <span className="coord-sep">|</span>
          <span>120.9605° E</span>
          <span className="coord-sep">|</span>
          <span>TAIWAN</span>
        </motion.div>
      </motion.div>

      <audio ref={audioRef} src="/audio/scv.mp3" preload="auto" />

      <a href="#timeline" className="scroll-down">
        <span>SCROLL</span>
      </a>
    </section>
  )
}

/* ══════════════════════════════════════════
   SECTION HEADER
══════════════════════════════════════════ */
function SectionHeader({ title, sub }) {
  return (
    <div className="section-header">
      <div className="section-laser-line left" />
      <div className="section-title-wrap">
        <h2 className="section-title">{title}</h2>
        {sub && <p className="section-sub">{sub}</p>}
      </div>
      <div className="section-laser-line right" />
    </div>
  )
}

/* ══════════════════════════════════════════
   TIMELINE
══════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function TimelineItem({ item, index }) {
  const [ref, inView] = useInView(0.1)
  const isRight = index % 2 === 1
  return (
    <div
      ref={ref}
      className="timeline-item"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : `translateX(${isRight ? 60 : -60}px)`,
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        transitionDelay: `${index * 0.06}s`,
      }}
    >
      <div className="timeline-dot">
        <span className="tdot-date">{item.date}</span>
        <div className="tdot-pulse" />
      </div>
      <div className="timeline-card">
        <div className="tcard-glow" />
        <div className="tcard-corner tl" /><div className="tcard-corner tr" />
        <div className="tcard-corner bl" /><div className="tcard-corner br" />
        <img src={item.gif} alt="" />
        <h4>{item.date}</h4>
        <p className="ten">{item.en}</p>
        <p className="tzh">{item.zh}</p>
      </div>
    </div>
  )
}

function Timeline() {
  return (
    <section id="timeline" className="timeline-section">
      <LaserGrid color="#b44aff" opacity={0.07} />
      <SectionHeader title="時光機" sub="那一年，我幹過什麼好事" />
      <div className="timeline">
        {TIMELINE.map((item, i) => <TimelineItem key={i} item={item} index={i} />)}
        <div className="timeline-end-node">
          <span>NOW</span>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   ABOUT
══════════════════════════════════════════ */
function About() {
  const cards = [
    {
      flag: '🇹🇼', lang: 'ZH',
      content: (
        <dl>
          <dt>林容為（Takio Lin）</dt>
          <dd>擁有 10 年以上前後端與 DevOps 開發經驗，專注於即時系統、高併發平台、雲端架構與遊戲平台開發。</dd>
          <dt>核心技術</dt>
          <dd>Vue.js、React、Node.js、Golang、WebSocket、Docker、Kubernetes、AWS，具備系統架構設計、效能優化與團隊技術管理經驗。</dd>
          <dt>現職 Sunny Software｜2018 – 至今</dt>
          <dd>資深軟體工程師 / 技術主管，主導即時遊戲平台、雲端架構與 CI/CD 流程建置。</dd>
          <dt>人生觀</dt>
          <dd>人生就是不斷的挑戰跟學習，用謙卑的姿態探索世界 yolo</dd>
        </dl>
      ),
    },
    {
      flag: '🇺🇸', lang: 'EN',
      content: (
        <dl>
          <dt>Takio Lin (林容為)</dt>
          <dd>10+ years frontend, backend & DevOps experience. B.A. Literature, University of Oregon, 2010. Fluent in English, Chinese, Japanese, and Taiwanese.</dd>
          <dt>Sunny Software · 2018–Present</dt>
          <dd>Senior Engineer & Tech Lead. Vue3, React, Node.js, Go, WebSocket, Docker, Kubernetes, AWS. Led real-time gaming platform development, CI/CD pipelines, and team technical decisions.</dd>
          <dt>Previous Experience</dt>
          <dd>CareLine UK (Frontend Lead · Angular/Vue) → Nippon Sharyo USA (QA Inspector, Japan/USA/Canada) → Walton Computing (Software Engineer · PHP/MySQL)</dd>
          <dt>Links</dt>
          <dd>github.com/BruceWayneLin · jungwei.com.tw · stockchicken.tw</dd>
        </dl>
      ),
    },
    {
      flag: '🇯🇵', lang: 'JA',
      content: (
        <dl>
          <dt>リン・ジュンウェイ（林容為）</dt>
          <dd>アメリカのオレゴン大学（文学部）2010年卒業。英語・中国語・台湾語は精通、日本語は中級です。</dd>
          <dt>現職 — Sunny Software（2018〜現在）</dt>
          <dd>上級ソフトウェアエンジニア / テックリード。Vue3・React・Node.js・Go を活用した高並列ゲームプラットフォームを構築。Kubernetes・AWS・Docker を用いたクラウドアーキテクチャ設計を担当。</dd>
          <dt>2014/11 – 2016/03</dt>
          <dd>日本車輌（JRグループ）にてシカゴ・バンクーバー・トロント・カリフォルニア・日本での鉄道車両品質検査に従事。</dd>
          <dt>スキルセット</dt>
          <dd>Vue3・React・Angular・TypeScript・Node.js・Go・Laravel・Docker・K8s・AWS・MySQL・Redis</dd>
        </dl>
      ),
    },
  ]

  return (
    <section id="about" className="about-section">
      <NebulaBlobs />
      <SectionHeader title="關於我" sub="About — About — 自己紹介" />
      <div className="about-grid">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            className="about-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
          >
            <div className="acard-header">
              <span className="acard-flag">{c.flag}</span>
              <span className="acard-lang">{c.lang}</span>
            </div>
            {c.content}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   SKILLS
══════════════════════════════════════════ */
const SKILL_CAT_LABEL = {
  frontend: 'Frontend',
  backend:  'Backend',
  devops:   'DevOps',
  db:       'Database',
  other:    'Other',
}

function Skills() {
  const cats = ['frontend', 'backend', 'devops', 'db', 'other']
  return (
    <section id="skills" className="skills-section">
      <LaserGrid color="#00ffea" opacity={0.06} />
      <SectionHeader title="技術棧" sub="Tech Stack" />
      {cats.map(cat => (
        <div key={cat} className="skill-cat-row">
          <span className="skill-cat-label" style={{ color: CAT_COLOR[cat] }}>
            {SKILL_CAT_LABEL[cat]}
          </span>
          <div className="skills-row">
            {SKILLS.filter(s => s.cat === cat).map((s, i) => (
              <motion.span
                key={s.name}
                className="skill-tag"
                style={{ '--tag-color': CAT_COLOR[cat] }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.08 }}
              >
                {s.name}
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

/* ══════════════════════════════════════════
   PORTFOLIO
══════════════════════════════════════════ */
function VideoModal({ item, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="vm-overlay" onClick={onClose}>
      <div className="vm-modal" onClick={e => e.stopPropagation()}>
        <div className="vm-corner tl"/><div className="vm-corner tr"/>
        <div className="vm-corner bl"/><div className="vm-corner br"/>
        <div className="vm-scanline"/>
        <div className="vm-header">
          <span className="vm-icon">{item.icon}</span>
          <span className="vm-title">{item.name}</span>
          <button className="vm-close" onClick={onClose}>✕</button>
        </div>
        <video className="vm-video" src={item.video} controls autoPlay playsInline />
        <p className="vm-tech">{item.tech}</p>
      </div>
    </div>
  )
}

function PortfolioCard({ item, index, onPlay }) {
  return (
    <motion.div
      className={`flip-card${item.video ? ' has-video' : ''}`}
      tabIndex={0}
      onClick={item.video ? onPlay : undefined}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
    >
      <div className="flip-inner">
        <div className="flip-front">
          <div className="flip-corner-tl" /><div className="flip-corner-tr" />
          <div className="flip-corner-bl" /><div className="flip-corner-br" />
          {item.tag && (
            <span className={`proj-tag tag-${item.tag}`}>
              {item.tag === 'live' ? '🔴 LIVE' : item.tag === 'demo' ? '▶ DEMO' : '🔒 PRIVATE'}
            </span>
          )}
          {item.video && <span className="video-play-badge">▶</span>}
          <span className="proj-icon">{item.icon}</span>
          <h4>{item.name}</h4>
          <p className="proj-name-en">{item.nameEn}</p>
          <span className="tech-label">{item.tech}</span>
        </div>
        <div className="flip-back">
          <p>{item.desc}</p>
          {item.video
            ? <button className="visit-btn" onClick={onPlay}>▶ PLAY VIDEO</button>
            : item.url
              ? <a className="visit-btn" href={item.url} target="_blank" rel="noreferrer">VISIT →</a>
              : <span className="no-url">Internal / Private</span>
          }
        </div>
      </div>
    </motion.div>
  )
}

function Portfolio() {
  const [activeVideo, setActiveVideo] = useState(null)
  return (
    <section id="portfolio" className="portfolio-section">
      <SectionHeader title="作品集" sub="Portfolio" />
      <div className="portfolio-grid">
        {PORTFOLIO.map((item, i) => (
          <PortfolioCard key={i} item={item} index={i} onPlay={() => setActiveVideo(item)} />
        ))}
      </div>
      {activeVideo && <VideoModal item={activeVideo} onClose={() => setActiveVideo(null)} />}
    </section>
  )
}

/* ══════════════════════════════════════════
   CONTACT
══════════════════════════════════════════ */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [msg, setMsg] = useState(null)
  const [sending, setSending] = useState(false)
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setMsg({ type: 'error', text: '請填寫必填欄位 (Name, Email, Message)' })
      return
    }
    setSending(true)
    try {
      await emailjs.send(
        'service_60vwf2s',
        'template_wfdoxkm',
        { name: form.name, email: form.email, phone: form.phone, message: `Email: ${form.email}${form.phone ? '\nPhone: ' + form.phone : ''}\n\n${form.message}`, title: 'Portfolio Contact' },
        'yg6q6FCdodgToSCVx'
      )
      setMsg({ type: 'success', text: '感謝來信！Message received. I\'ll respond soon.' })
      setForm({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setMsg(null), 4000)
    } catch {
      setMsg({ type: 'error', text: '傳送失敗，請稍後再試。' })
    } finally {
      setSending(false)
    }
  }
  return (
    <section id="contact" className="contact-section">
      <LaserGrid color="#ff4af8" opacity={0.06} />
      <SectionHeader title="Contact" sub="聯絡我" />
      <div className="planet-wrap">
        <div className="planet">
          <div className="texture" />
        </div>
      </div>
      <div className="contact-links">
        <a className="contact-link-item" href="mailto:skandawei@gmail.com">
          <span className="cli-icon">✉</span>
          <span>skandawei@gmail.com</span>
        </a>
        <a className="contact-link-item" href="https://www.linkedin.com/in/jung-wei-lin-81891227b" target="_blank" rel="noreferrer">
          <span className="cli-icon">in</span>
          <span>jung-wei-lin-81891227b</span>
        </a>
        <a className="contact-link-item" href="https://github.com/BruceWayneLin" target="_blank" rel="noreferrer">
          <span className="cli-icon">⌥</span>
          <span>github.com/BruceWayneLin</span>
        </a>
        <a className="contact-link-item" href="https://www.jungwei.com.tw/" target="_blank" rel="noreferrer">
          <span className="cli-icon">⬡</span>
          <span>jungwei.com.tw</span>
        </a>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <div className="form-group">
          <label>NAME <span className="req">*</span></label>
          <input name="name" value={form.name} onChange={handle} placeholder="Your name" autoComplete="off" />
        </div>
        <div className="form-group">
          <label>EMAIL <span className="req">*</span></label>
          <input name="email" type="email" value={form.email} onChange={handle} placeholder="email@example.com" />
        </div>
        <div className="form-group">
          <label>PHONE</label>
          <input name="phone" value={form.phone} onChange={handle} placeholder="Phone number" />
        </div>
        <div className="form-group">
          <label>MESSAGE <span className="req">*</span></label>
          <textarea name="message" value={form.message} onChange={handle} placeholder="Your message..." />
        </div>
        {msg && <div className={`form-msg ${msg.type}`}>{msg.text}</div>}
        <button className="submit-btn" type="submit" disabled={sending}>
          <span className="btn-text">{sending ? 'SENDING...' : 'TRANSMIT'}</span>
          <span className="btn-arrow">→</span>
        </button>
      </form>
    </section>
  )
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer() {
  const [launched, setLaunched] = useState(false)
  const nuclearRef = useRef(null)
  const explosionRef = useRef(null)
  const rafRef = useRef(null)

  const launch = () => {
    if (launched) return
    if (nuclearRef.current) { nuclearRef.current.currentTime = 0; nuclearRef.current.play() }
    setLaunched(true)
    setTimeout(() => { if (explosionRef.current) explosionRef.current.play() }, 1800)

    const startY = window.scrollY
    const duration = 2400
    const startTime = performance.now()

    const scrollUp = now => {
      const t = Math.min((now - startTime) / duration, 1)
      window.scrollTo(0, startY * (1 - t * t))
      if (t < 1) rafRef.current = requestAnimationFrame(scrollUp)
    }
    rafRef.current = requestAnimationFrame(scrollUp)

    setTimeout(() => setLaunched(false), 2600)
  }

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  return (
    <footer className="footer-section">
      <audio ref={nuclearRef} src="/audio/nuclear.mp3" preload="auto" />
      <audio ref={explosionRef} src="/audio/explosion.mp3" preload="auto" />

      <div className="footer-laser-bar" />

      <div className="footer-inner">
        <div>
          <button className="rocket-btn" onClick={launch} disabled={launched}>🚀 發射火箭</button>
        </div>
        <p className="copyright">© Jung-wei, Lin 2016 – {new Date().getFullYear()}</p>
        <p className="copyright" style={{ opacity: 0.4 }}>Built with React + Vite</p>
      </div>

      <img
        className={`rocket-img${launched ? ' launching' : ''}`}
        src="/img/rocket.png"
        alt=""
      />
    </footer>
  )
}

/* ══════════════════════════════════════════
   BGM PLAYER
══════════════════════════════════════════ */
function BgmPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [volume, setVolume] = useState(0.35)

  // 第一次任何互動就自動播
  useEffect(() => {
    const tryPlay = () => {
      if (started) return
      const audio = audioRef.current
      if (!audio) return
      audio.volume = volume
      audio.play().then(() => {
        setPlaying(true)
        setStarted(true)
      }).catch(() => {})
    }
    window.addEventListener('mousemove', tryPlay, { once: true })
    window.addEventListener('click',     tryPlay, { once: true })
    window.addEventListener('keydown',   tryPlay, { once: true })
    window.addEventListener('touchstart',tryPlay, { once: true })
    return () => {
      window.removeEventListener('mousemove', tryPlay)
      window.removeEventListener('click',     tryPlay)
      window.removeEventListener('keydown',   tryPlay)
      window.removeEventListener('touchstart',tryPlay)
    }
  }, [started, volume])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
      setStarted(true)
    }
  }

  const handleVolume = e => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }

  return (
    <div className={`bgm-player ${playing ? 'bgm-playing' : ''}`}>
      <audio ref={audioRef} src="/audio/terran-bgm.mp3" loop preload="auto" />
      <button className="bgm-btn" onClick={toggle} title={playing ? 'Pause BGM' : 'Play BGM'}>
        {playing ? '♪' : '♩'}
      </button>
      <div className="bgm-info">
        <span className={`bgm-title ${playing ? 'bgm-scroll' : ''}`}>
          Terran BGM — StarCraft Live Concert
        </span>
        <input
          className="bgm-volume"
          type="range" min="0" max="1" step="0.05"
          value={volume}
          onChange={handleVolume}
        />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   APP
══════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <BgmPlayer />
      <Navbar />
      <Hero />
      <Timeline />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
    </>
  )
}
