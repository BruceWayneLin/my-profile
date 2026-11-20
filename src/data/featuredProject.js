export const TK_CASINO = {
  name: 'TK CASINO',
  nameEn: '瀧尾娛樂 · Independently Built Casino & Games',
  icon: '♠',
  tech: 'React · TypeScript · Cocos Creator · PixiJS · Unity WebGL · Fastify · Redis / Lua · WebSocket · Solidity · Arbitrum One',
  desc: '整座娛樂城與全部遊戲皆由我獨立開發：區塊鏈 PvP 競技場（鏈上比大小、鏈上暗棋、戰士 PK，Arbitrum One 結算、每局可在鏈上驗證）、經典遊戲區七款（NOVA 百家樂、三款拉霸、三款桌上遊戲）、大廳、錢包、角色商店、即時後端、管理後台與雲端部署。 — Independently built the entire casino and every game: an on-chain PvP Blockchain Arena (High-Low, Dark Chess, Warrior Duel PK, settled on Arbitrum One with every round verifiable on-chain), a classic floor of seven games (NOVA Baccarat, three slots, three table games), lobby, wallet, avatar shop, real-time backend, admin console and cloud deployment.',
  url: 'https://tk-casino.com/',
  tag: 'live',
  group: 'indie',
}

export const TK_GAMES = [
  { id: 'nova', zh: '星際百家樂', name: 'NOVA Baccarat', kind: 'BACCARAT', color: '#7bbcff', background: '/img/projects/tk-games/nova-arena.png' },
  { id: 'alien', zh: '星際掠奪', name: 'Alien Harvest', kind: 'SLOTS', color: '#79e8ff' },
  { id: 'cowboy', zh: '西部懸賞', name: 'Wanted Gold', kind: 'SLOTS', color: '#edbb79' },
  { id: 'dragon', zh: '龍賜財', name: 'Fortune Dragon', kind: 'SLOTS', color: '#f28a78' },
  { id: 'blackjack', zh: '二十一點', name: 'Blackjack', kind: 'TABLE GAME', color: '#af91ff' },
  { id: 'dragontiger', zh: '龍虎', name: 'Dragon Tiger', kind: 'TABLE GAME', color: '#ffc775' },
  { id: 'yacht', zh: '快艇骰子', name: 'Yacht', kind: 'TABLE GAME', color: '#72d8c5' },
].map(game => game.id === 'nova' ? game : {
  ...game,
  background: `/img/projects/tk-games/${game.id}-bg.webp`,
  hero: `/img/projects/tk-games/${game.id}-hero.webp`,
})

// 區塊鏈競技場：全部玩家對玩家、平台不當莊，鏈上重洗牌驗證
export const TK_CHAIN_GAMES = [
  { id: 'hilo', zh: '鏈上比大小', name: 'High-Low', note: '52 張牌由合約 deriveDeck() 重洗，任何人都能用 eth_call 免費驗算；對不上就 challenge() 沒收保證金', noteEn: 'The contract re-derives the 52-card deck with deriveDeck(); anyone can verify for free via eth_call, and a mismatch lets players challenge() and slash our bond.', color: '#7bbcff' },
  { id: 'banqi', zh: '鏈上暗棋', name: 'Dark Chess', note: '開局先公布盤面指紋，終局在鏈上重洗 32 顆棋比對；30 秒思考、斷線 30 秒可接回', noteEn: 'A board fingerprint is published before the game and the 32-piece layout is re-shuffled on-chain at the end; 30-second turns and 30-second reconnects.', color: '#ffc775' },
  { id: 'pk', zh: '戰士 PK', name: 'Warrior Duel PK', note: '時代進化的全身角色，裝備、強化與坐騎都會影響戰力；伺服器權威結算', noteEn: 'Full-body avatars that evolve through eras; gear, upgrades and mounts all feed into combat power; server-authoritative settlement.', color: '#f28a78' },
]

// 大廳裡另外兩款自製遊戲世界
export const TK_WORLDS = [
  { id: 'apocalypse', zh: '天啓 · 多人線上 RPG', name: 'Apocalypse · Browser MMORPG', note: 'Unity 6 WebGL 客戶端＋.NET 8 權威伺服器，桌機與手機瀏覽器都能玩，正式上線營運中', url: 'https://apocalypse.tk-casino.com/', noteEn: 'Unity 6 WebGL client with a .NET 8 authoritative server, playable in desktop and mobile browsers, live in production.', color: '#b44aff' },
  { id: 'hovr', zh: 'HOVR · 飛行遊戲', name: 'HOVR · Northern Reach', note: 'Unity WebGL 垂直起降飛行，觸控／鍵盤操作、免下載、飛行員排行榜', url: 'https://tk-casino.com/hovr', noteEn: 'Unity WebGL VTOL flight game: touch or keyboard, no download, pilot leaderboard.', color: '#72d8c5' },
]

export const TK_STACK = [
  { label: 'Interface', items: ['React', 'TypeScript', 'Vite', 'React Router'] },
  { label: 'Services', items: ['Node.js', 'Fastify', 'WebSocket', 'Ed25519 JWT'] },
  { label: 'Wallet & data', items: ['Redis', 'Lua', 'Redis Streams', 'MySQL'] },
  { label: 'On-chain', items: ['Solidity', 'Arbitrum One', 'USDT', 'Merkle anchoring', 'EVM cross-check tests'] },
  { label: 'Deployment', items: ['AWS EC2', 'Docker Compose', 'Caddy', 'GitHub Actions'] },
  { label: 'Kubernetes configuration', items: ['Kubernetes', 'Helm', 'Kustomize', 'ArgoCD', 'KEDA'] },
  { label: 'Testing & observability', items: ['Vitest', 'k6', 'Prometheus', 'Grafana'] },
]
