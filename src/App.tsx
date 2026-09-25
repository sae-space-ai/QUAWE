import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github, Star, GitFork, AlertCircle, Clock, ExternalLink,
  CheckCircle2, XCircle, Loader2, GitBranch, Code2, Zap,
  TrendingUp, GitPullRequest, MessageSquare, PlayCircle,
  Package, Shield, Activity
} from "lucide-react";
import {
  repositories,
  deployments,
  pipelines,
  activities,
  generateContributions,
  stats,
  Repository,
  Deployment,
  Pipeline,
} from "./data/githubData";

// ============================================
// Contribution Graph Component
// ============================================
function ContributionGraph() {
  const contributions = generateContributions();
  const weeks = [];
  
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const getLevelColor = (level: number) => {
    const colors = [
      "bg-gray-800/50",
      "bg-green-900/60",
      "bg-green-700/70",
      "bg-green-500/80",
      "bg-green-400",
    ];
    return colors[level];
  };

  return (
    <div className="rounded-xl bg-gray-900/50 border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-green-400" />
          Contribuciones
        </h3>
        <span className="text-xs text-gray-400">
          {contributions.reduce((sum, c) => sum + c.count, 0)} contribuciones en el último año
        </span>
      </div>
      
      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-1">
            {week.map((day, dayIdx) => (
              <motion.div
                key={`${weekIdx}-${dayIdx}`}
                className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} cursor-pointer`}
                whileHover={{ scale: 1.3 }}
                title={`${day.count} contribuciones el ${day.date}`}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
        <span>Menos</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`} />
          ))}
        </div>
        <span>Más</span>
      </div>
    </div>
  );
}

// ============================================
// Repository Card Component
// ============================================
function RepoCard({ repo }: { repo: Repository }) {
  return (
    <motion.div
      className="rounded-xl bg-gray-900/50 border border-gray-800 p-5 hover:border-gray-700 transition-all"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-white">{repo.name}</h3>
          {repo.isPrivate && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
              Private
            </span>
          )}
        </div>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      
      <p className="text-xs text-gray-400 mb-4 line-clamp-2">{repo.description}</p>
      
      <div className="flex flex-wrap gap-1.5 mb-4">
        {repo.topics.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
          >
            {topic}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-gray-400">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: repo.languageColor }}
            />
            {repo.language}
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            <Star className="w-3 h-3" />
            {repo.stars}
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            <GitFork className="w-3 h-3" />
            {repo.forks}
          </span>
        </div>
        <span className="text-gray-500">{repo.lastUpdate}</span>
      </div>
    </motion.div>
  );
}

// ============================================
// Deployment Card Component
// ============================================
function DeploymentCard({ deployment }: { deployment: Deployment }) {
  const getStatusIcon = () => {
    switch (deployment.status) {
      case "ready":
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case "building":
        return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-400" />;
      case "queued":
        return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getStatusColor = () => {
    switch (deployment.status) {
      case "ready":
        return "text-green-400";
      case "building":
        return "text-blue-400";
      case "error":
        return "text-red-400";
      case "queued":
        return "text-yellow-400";
    }
  };

  return (
    <motion.div
      className="rounded-xl bg-gray-900/50 border border-gray-800 p-4 hover:border-gray-700 transition-all"
      whileHover={{ x: 4 }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <div>
            <h4 className="text-sm font-semibold text-white">{deployment.projectName}</h4>
            <p className="text-[10px] text-gray-500">{deployment.createdAt}</p>
          </div>
        </div>
        <span className={`text-xs font-medium ${getStatusColor()}`}>
          {deployment.status === "ready" ? "Listo" : 
           deployment.status === "building" ? "Construyendo" :
           deployment.status === "error" ? "Error" : "En cola"}
        </span>
      </div>
      
      <p className="text-xs text-gray-400 mb-3 line-clamp-1">{deployment.commitMessage}</p>
      
      <div className="flex items-center justify-between text-[10px] text-gray-500">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <GitBranch className="w-3 h-3" />
            {deployment.branch}
          </span>
          <span>•</span>
          <span className="font-mono">{deployment.commitHash}</span>
        </div>
        <span>{deployment.duration}</span>
      </div>
      
      {deployment.status === "ready" && (
        <a
          href={deployment.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Ver deployment
        </a>
      )}
    </motion.div>
  );
}

// ============================================
// Pipeline Card Component
// ============================================
function PipelineCard({ pipeline }: { pipeline: Pipeline }) {
  const getStatusIcon = () => {
    switch (pipeline.status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-400" />;
      case "running":
        return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      case "running":
        return "bg-blue-500 animate-pulse";
      case "pending":
        return "bg-gray-600";
      case "skipped":
        return "bg-gray-700";
    }
  };

  return (
    <div className="rounded-xl bg-gray-900/50 border border-gray-800 p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <h4 className="text-sm font-semibold text-white">{pipeline.name}</h4>
            <p className="text-xs text-gray-500">
              {pipeline.branch} • {pipeline.startedAt}
            </p>
          </div>
        </div>
        <span className="text-xs text-gray-400">{pipeline.duration}</span>
      </div>
      
      <div className="space-y-2">
        {pipeline.steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${getStepStatusColor(step.status)}`} />
            <span className="flex-1 text-xs text-gray-300">{step.name}</span>
            <span className="text-xs text-gray-500">{step.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Activity Item Component
// ============================================
function ActivityItem({ activity }: { activity: typeof activities[0] }) {
  const getIcon = () => {
    switch (activity.type) {
      case "deploy":
        return <Zap className="w-4 h-4 text-purple-400" />;
      case "pr":
        return <GitPullRequest className="w-4 h-4 text-green-400" />;
      case "push":
        return <Code2 className="w-4 h-4 text-blue-400" />;
      case "issue":
        return <AlertCircle className="w-4 h-4 text-orange-400" />;
      case "review":
        return <MessageSquare className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-800 last:border-0">
      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-sm flex-shrink-0">
        {activity.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-300">
          <span className="font-semibold text-white">{activity.user}</span>{" "}
          {activity.title}
        </p>
        <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500">
          <span>{activity.repo}</span>
          <span>•</span>
          <span>{activity.time}</span>
        </div>
      </div>
      {getIcon()}
    </div>
  );
}

// ============================================
// Main App Component
// ============================================
export default function App() {
  const [activeTab, setActiveTab] = useState<"repos" | "deployments" | "pipelines">("repos");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <Github className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">DevOps Dashboard</h1>
                <p className="text-xs text-gray-400">GitHub + Vercel Integration</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400">Sistema operativo</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Stars", value: stats.totalStars.toLocaleString(), icon: Star, color: "text-yellow-400" },
            { label: "Deployments", value: stats.totalDeployments.toLocaleString(), icon: Zap, color: "text-purple-400" },
            { label: "Success Rate", value: `${stats.successRate}%`, icon: CheckCircle2, color: "text-green-400" },
            { label: "Avg Build Time", value: stats.avgBuildTime, icon: Clock, color: "text-blue-400" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="rounded-xl bg-gray-900/50 border border-gray-800 p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <TrendingUp className="w-3 h-3 text-gray-600" />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Contribution Graph */}
        <div className="mb-6">
          <ContributionGraph />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-800">
          {[
            { id: "repos" as const, label: "Repositorios", icon: Package, count: repositories.length },
            { id: "deployments" as const, label: "Deployments", icon: Zap, count: deployments.length },
            { id: "pipelines" as const, label: "Pipelines", icon: PlayCircle, count: pipelines.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                activeTab === tab.id
                  ? "text-white border-white"
                  : "text-gray-400 border-transparent hover:text-gray-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeTab === "repos" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {repositories.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}

            {activeTab === "deployments" && (
              <div className="space-y-4">
                {deployments.map((deployment) => (
                  <DeploymentCard key={deployment.id} deployment={deployment} />
                ))}
              </div>
            )}

            {activeTab === "pipelines" && (
              <div className="space-y-4">
                {pipelines.map((pipeline) => (
                  <PipelineCard key={pipeline.id} pipeline={pipeline} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - Activity */}
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-gray-900/50 border border-gray-800 p-5 sticky top-24">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                Actividad Reciente
              </h3>
              <div className="space-y-1">
                {activities.slice(0, 6).map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-400">DevOps Dashboard</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                CI/CD Seguro
              </span>
              <span>•</span>
              <span>GitHub Actions</span>
              <span>•</span>
              <span>Vercel Deployments</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
