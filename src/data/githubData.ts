export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  issues: number;
  lastUpdate: string;
  isPrivate: boolean;
  topics: string[];
  url: string;
}

export interface Deployment {
  id: string;
  projectName: string;
  status: "ready" | "building" | "error" | "queued";
  url: string;
  branch: string;
  commitMessage: string;
  commitHash: string;
  createdAt: string;
  duration: string;
  region: string;
}

export interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface Pipeline {
  id: string;
  name: string;
  status: "success" | "failed" | "running" | "pending";
  branch: string;
  duration: string;
  startedAt: string;
  steps: PipelineStep[];
}

export interface PipelineStep {
  name: string;
  status: "success" | "failed" | "running" | "pending" | "skipped";
  duration: string;
}

export interface Activity {
  id: string;
  type: "push" | "pr" | "issue" | "deploy" | "review";
  title: string;
  repo: string;
  time: string;
  user: string;
  avatar: string;
}

export const repositories: Repository[] = [
  {
    id: "repo-1",
    name: "onda-global",
    fullName: "user/onda-global",
    description: "Plataforma de cadena radiofónica geolocal con publicidad segmentada",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 234,
    forks: 45,
    issues: 12,
    lastUpdate: "hace 2 horas",
    isPrivate: false,
    topics: ["react", "typescript", "vercel", "radio"],
    url: "https://github.com/user/onda-global",
  },
  {
    id: "repo-2",
    name: "api-geolocation",
    fullName: "user/api-geolocation",
    description: "API REST para servicios de geolocalización y segmentación publicitaria",
    language: "Python",
    languageColor: "#3572A5",
    stars: 189,
    forks: 32,
    issues: 8,
    lastUpdate: "hace 5 horas",
    isPrivate: false,
    topics: ["python", "fastapi", "geolocation", "api"],
    url: "https://github.com/user/api-geolocation",
  },
  {
    id: "repo-3",
    name: "audio-streaming-sdk",
    fullName: "user/audio-streaming-sdk",
    description: "SDK para streaming de audio en tiempo real con baja latencia",
    language: "Rust",
    languageColor: "#dea584",
    stars: 567,
    forks: 89,
    issues: 23,
    lastUpdate: "hace 1 día",
    isPrivate: false,
    topics: ["rust", "audio", "streaming", "sdk"],
    url: "https://github.com/user/audio-streaming-sdk",
  },
  {
    id: "repo-4",
    name: "vercel-deploy-action",
    fullName: "user/vercel-deploy-action",
    description: "GitHub Action optimizado para despliegues en Vercel",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 1203,
    forks: 234,
    issues: 5,
    lastUpdate: "hace 3 días",
    isPrivate: false,
    topics: ["github-actions", "vercel", "deployment", "ci-cd"],
    url: "https://github.com/user/vercel-deploy-action",
  },
  {
    id: "repo-5",
    name: "analytics-dashboard",
    fullName: "user/analytics-dashboard",
    description: "Dashboard de analíticas en tiempo real para emisoras de radio",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 445,
    forks: 67,
    issues: 15,
    lastUpdate: "hace 6 horas",
    isPrivate: true,
    topics: ["analytics", "dashboard", "real-time", "charts"],
    url: "https://github.com/user/analytics-dashboard",
  },
];

export const deployments: Deployment[] = [
  {
    id: "deploy-1",
    projectName: "onda-global",
    status: "ready",
    url: "https://onda-global.vercel.app",
    branch: "main",
    commitMessage: "feat: add geolocation-based ad targeting",
    commitHash: "a1b2c3d",
    createdAt: "hace 2 minutos",
    duration: "45s",
    region: "cdg1",
  },
  {
    id: "deploy-2",
    projectName: "api-geolocation",
    status: "building",
    url: "https://api-geo-git-feat-new-endpoints.user.vercel.app",
    branch: "feat/new-endpoints",
    commitMessage: "feat: add radius-based filtering",
    commitHash: "e4f5g6h",
    createdAt: "hace 5 minutos",
    duration: "en progreso",
    region: "sfo1",
  },
  {
    id: "deploy-3",
    projectName: "analytics-dashboard",
    status: "ready",
    url: "https://analytics-onda.vercel.app",
    branch: "main",
    commitMessage: "fix: correct listener count calculation",
    commitHash: "i7j8k9l",
    createdAt: "hace 1 hora",
    duration: "38s",
    region: "iad1",
  },
  {
    id: "deploy-4",
    projectName: "onda-global",
    status: "error",
    url: "https://onda-global-git-hotfix.user.vercel.app",
    branch: "hotfix/audio-buffer",
    commitMessage: "fix: resolve audio buffer overflow",
    commitHash: "m0n1o2p",
    createdAt: "hace 3 horas",
    duration: "12s",
    region: "cdg1",
  },
  {
    id: "deploy-5",
    projectName: "vercel-deploy-action",
    status: "ready",
    url: "https://vercel-action.vercel.app",
    branch: "main",
    commitMessage: "docs: update README with examples",
    commitHash: "q3r4s5t",
    createdAt: "hace 1 día",
    duration: "28s",
    region: "cle1",
  },
];

export const pipelines: Pipeline[] = [
  {
    id: "pipeline-1",
    name: "CI/CD Production",
    status: "success",
    branch: "main",
    duration: "3m 45s",
    startedAt: "hace 10 minutos",
    steps: [
      { name: "Checkout", status: "success", duration: "2s" },
      { name: "Install Dependencies", status: "success", duration: "45s" },
      { name: "Lint", status: "success", duration: "15s" },
      { name: "Type Check", status: "success", duration: "20s" },
      { name: "Unit Tests", status: "success", duration: "1m 30s" },
      { name: "Build", status: "success", duration: "45s" },
      { name: "Deploy to Vercel", status: "success", duration: "8s" },
    ],
  },
  {
    id: "pipeline-2",
    name: "PR Validation",
    status: "running",
    branch: "feat/new-features",
    duration: "en progreso",
    startedAt: "hace 2 minutos",
    steps: [
      { name: "Checkout", status: "success", duration: "2s" },
      { name: "Install Dependencies", status: "success", duration: "42s" },
      { name: "Lint", status: "success", duration: "12s" },
      { name: "Type Check", status: "running", duration: "en progreso" },
      { name: "Unit Tests", status: "pending", duration: "-" },
      { name: "E2E Tests", status: "pending", duration: "-" },
      { name: "Preview Deploy", status: "pending", duration: "-" },
    ],
  },
  {
    id: "pipeline-3",
    name: "Nightly Build",
    status: "failed",
    branch: "develop",
    duration: "2m 15s",
    startedAt: "hace 8 horas",
    steps: [
      { name: "Checkout", status: "success", duration: "2s" },
      { name: "Install Dependencies", status: "success", duration: "50s" },
      { name: "Lint", status: "success", duration: "18s" },
      { name: "Type Check", status: "success", duration: "22s" },
      { name: "Integration Tests", status: "failed", duration: "1m 30s" },
      { name: "Build", status: "skipped", duration: "-" },
      { name: "Deploy Staging", status: "skipped", duration: "-" },
    ],
  },
];

export const activities: Activity[] = [
  {
    id: "act-1",
    type: "deploy",
    title: "Deployment successful",
    repo: "onda-global",
    time: "hace 2 minutos",
    user: "vercel[bot]",
    avatar: "▲",
  },
  {
    id: "act-2",
    type: "pr",
    title: "Merged PR #142: Add geolocation features",
    repo: "onda-global",
    time: "hace 15 minutos",
    user: "carlos-dev",
    avatar: "👨‍💻",
  },
  {
    id: "act-3",
    type: "push",
    title: "Pushed 3 commits to main",
    repo: "api-geolocation",
    time: "hace 1 hora",
    user: "maria-engineer",
    avatar: "👩‍💻",
  },
  {
    id: "act-4",
    type: "issue",
    title: "Opened issue #89: Audio buffering problem",
    repo: "audio-streaming-sdk",
    time: "hace 2 horas",
    user: "pedro-user",
    avatar: "🧑",
  },
  {
    id: "act-5",
    type: "review",
    title: "Approved PR #141: Fix memory leak",
    repo: "analytics-dashboard",
    time: "hace 3 horas",
    user: "ana-reviewer",
    avatar: "👩‍🔬",
  },
  {
    id: "act-6",
    type: "deploy",
    title: "Preview deployment created",
    repo: "onda-global",
    time: "hace 4 horas",
    user: "vercel[bot]",
    avatar: "▲",
  },
];

// Generate contribution data for the last 365 days
export const generateContributions = (): Contribution[] => {
  const contributions: Contribution[] = [];
  const today = new Date();
  
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Simulate realistic contribution pattern
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseCount = isWeekend ? Math.random() * 3 : Math.random() * 8;
    const count = Math.floor(baseCount);
    
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count === 0) level = 0;
    else if (count <= 2) level = 1;
    else if (count <= 4) level = 2;
    else if (count <= 6) level = 3;
    else level = 4;
    
    contributions.push({
      date: date.toISOString().split('T')[0],
      count,
      level,
    });
  }
  
  return contributions;
};

export const stats = {
  totalStars: 2638,
  totalForks: 467,
  totalCommits: 1247,
  totalPRs: 234,
  totalIssues: 63,
  totalDeployments: 892,
  successRate: 98.7,
  avgBuildTime: "2m 34s",
};
