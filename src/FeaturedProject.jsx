import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { TK_CASINO, TK_GAMES, TK_STACK } from './data/featuredProject'

export default function FeaturedProject() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.05 })
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      ref={ref}
      className={`tk-project${inView && !reducedMotion ? ' tk-project-active' : ''}`}
      aria-labelledby="tk-project-title"
      initial={reducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: reducedMotion ? 0 : 0.6 }}
    >
      <div className="tk-sparks" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map(i => <i key={i} style={{ '--i': i }} />)}
      </div>
      <div className="flip-corner-tl" /><div className="flip-corner-tr" />
      <div className="flip-corner-bl" /><div className="flip-corner-br" />
      <div className="tk-project-header">
        <span className="tk-project-badge"><i /> SOLO-BUILT FLAGSHIP</span>
        <span className="tk-project-live">● LIVE / TK-CASINO.COM</span>
      </div>
      <div className="tk-project-overview">
        <a
          className="tk-project-image"
          href={TK_CASINO.url}
          target="_blank"
          rel="noreferrer"
          aria-label="Visit TK Casino (opens in a new tab)"
        >
          <img
            src="/img/projects/tk-casino-desktop.webp"
            alt="TK Casino 遊戲大廳，包含 NOVA 百家樂、拉霸與桌上遊戲"
            width="1440"
            height="1000"
            loading="lazy"
          />
          <span className="tk-image-caption">ENTER THE CASINO <span>↗</span></span>
        </a>
        <div className="tk-project-content">
          <h3 id="tk-project-title">TK CASINO</h3>
          <p className="tk-project-subtitle">瀧尾娛樂 · 全平台與全系列遊戲獨立開發</p>
          <p className="tk-project-authorship">The entire casino. Every game. Built by me.</p>
          <p className="tk-project-description">
            從百家樂、三款主題拉霸到三款桌上遊戲；從遊戲引擎、前端動畫、大廳、上莊系統，到原子錢包、即時後端、管理後台與雲端部署，全部由我獨立打造。
          </p>
          <div className="tk-project-stats">
            <span><strong>{String(TK_GAMES.length).padStart(2, '0')}</strong> ORIGINAL GAMES</span>
            <span><strong>FULL STACK</strong> PLATFORM + GAME ENGINES</span>
          </div>
          <p className="tech-label">{TK_CASINO.tech}</p>
          <a className="visit-btn tk-project-visit" href={TK_CASINO.url} target="_blank" rel="noreferrer">
            EXPLORE MY CASINO <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="tk-game-heading">
        <span>THE GAMES / 全系列自主開發</span>
        <span>BACCARAT · SLOTS · TABLE GAMES</span>
      </div>
      <div className="tk-game-grid">
        {TK_GAMES.map((game, i) => (
          <a
            key={game.id}
            className="tk-game"
            href={`${TK_CASINO.url}games/${game.id}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${game.name} (opens in a new tab)`}
            style={{ '--game-accent': game.color, '--game-index': i }}
          >
            <div className="tk-game-art">
              <img className="tk-game-bg" src={game.background} alt="" loading="lazy" />
              {game.hero && <img className="tk-game-character" src={game.hero} alt="" loading="lazy" />}
              {game.id === 'nova' && <span className="tk-nova-wordmark">NOVA</span>}
              <span className="tk-game-number">0{i + 1}</span>
              <span className="tk-game-arrow" aria-hidden="true">↗</span>
            </div>
            <div className="tk-game-label"><span>{game.kind}</span><h4>{game.zh}</h4><p>{game.name}</p></div>
          </a>
        ))}
      </div>
      <details className="tk-project-stack">
        <summary>TECH STACK / 完整技術細節</summary>
        <div className="tk-project-stack-grid">
          {TK_STACK.map(group => (
            <div key={group.label}>
              <h4>{group.label}</h4>
              <p>{group.items.join(' · ')}</p>
            </div>
          ))}
          <div>
            <h4>Game clients</h4>
            <p>NOVA: PixiJS · WebGL<br />TK Slots / TK Table: Cocos Creator · TypeScript</p>
          </div>
        </div>
      </details>
    </motion.article>
  )
}
