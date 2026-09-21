export const TK_CASINO = {
  name: 'TK CASINO',
  nameEn: '瀧尾娛樂 · Independently Built Casino & Games',
  icon: '♠',
  tech: 'React · TypeScript · Cocos Creator · PixiJS · Fastify · Redis / Lua · WebSocket',
  desc: '整座娛樂城與全部遊戲皆由我獨立開發，涵蓋 NOVA 百家樂、三款拉霸、三款桌上遊戲、大廳、錢包、上莊系統、即時後端、管理後台與雲端部署。 — Independently built the entire casino and every game: NOVA Baccarat, three slots, three table games, the lobby, shared wallet, banker system, real-time backend, admin console, and cloud deployment.',
  url: 'https://tk-casino.com/',
  tag: 'live',
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

export const TK_STACK = [
  { label: 'Interface', items: ['React', 'TypeScript', 'Vite', 'React Router'] },
  { label: 'Services', items: ['Node.js', 'Fastify', 'WebSocket', 'Ed25519 JWT'] },
  { label: 'Wallet & data', items: ['Redis', 'Lua', 'Redis Streams', 'MySQL'] },
  { label: 'Deployment', items: ['AWS EC2', 'Docker Compose', 'Caddy', 'GitHub Actions'] },
  { label: 'Kubernetes configuration', items: ['Kubernetes', 'Helm', 'Kustomize', 'ArgoCD', 'KEDA'] },
  { label: 'Testing & observability', items: ['Vitest', 'k6', 'Prometheus', 'Grafana'] },
]
