import { useState, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { notebookCells } from "./notebookData";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border border-white/10 hover:border-white/20"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-400">Copiado</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copiar
        </>
      )}
    </button>
  );
}

function CellComponent({ cell, isActive }: { cell: typeof notebookCells[0]; isActive: boolean }) {
  const cellRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cellRef}
      id={`cell-${cell.id}`}
      className={`group relative rounded-xl overflow-hidden transition-all duration-300 ${
        isActive
          ? "ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/10"
          : "ring-1 ring-white/5 hover:ring-white/10"
      } bg-[#1e1e2e]`}
    >
      {/* Cell Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#181825] border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
            isActive ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-gray-500"
          }`}>
            {cell.id}
          </div>
          <h3 className="text-sm font-semibold text-gray-300">{cell.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton text={cell.code} />
          <div className={`w-2 h-2 rounded-full ${isActive ? "bg-green-400 animate-pulse" : "bg-gray-600"}`} />
        </div>
      </div>

      {/* Code Block */}
      <div className="relative overflow-x-auto">
        <SyntaxHighlighter
          language="python"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1.25rem",
            background: "transparent",
            fontSize: "0.8rem",
            lineHeight: "1.6",
            borderRadius: 0,
          }}
          wrapLongLines={false}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: "2.5em",
            paddingRight: "1em",
            color: "#4a4a5a",
            userSelect: "none",
          }}
        >
          {cell.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

function Sidebar({ cells, activeCell, onCellClick }: {
  cells: typeof notebookCells;
  activeCell: number;
  onCellClick: (id: number) => void;
}) {
  return (
    <aside className="hidden lg:flex flex-col w-72 bg-[#11111b] border-r border-white/5 h-screen sticky top-0">
      {/* Logo / Title */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">Gemma 4 Agent</h1>
            <p className="text-xs text-gray-500">Kaggle Notebook</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Celdas</p>
        <ul className="space-y-1">
          {cells.map((cell) => (
            <li key={cell.id}>
              <button
                onClick={() => onCellClick(cell.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 ${
                  activeCell === cell.id
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  activeCell === cell.id ? "bg-blue-500/20" : "bg-white/5"
                }`}>
                  {cell.id}
                </span>
                <span className="truncate">{cell.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/5">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-3 border border-white/5">
          <p className="text-xs text-gray-400">
            <span className="text-blue-400 font-semibold">Modelo:</span> gemma-4-31b-it-qat-w4a16-ct
          </p>
          <p className="text-xs text-gray-400 mt-1">
            <span className="text-purple-400 font-semibold">Método:</span> QLoRA 4-bit NF4
          </p>
          <p className="text-xs text-gray-400 mt-1">
            <span className="text-green-400 font-semibold">GPU:</span> T4 / P100 (16GB)
          </p>
        </div>
      </div>
    </aside>
  );
}

function MobileNav({ cells, activeCell, onCellClick }: {
  cells: typeof notebookCells;
  activeCell: number;
  onCellClick: (id: number) => void;
}) {
  return (
    <div className="lg:hidden sticky top-0 z-50 bg-[#11111b]/95 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <select
          value={activeCell}
          onChange={(e) => onCellClick(Number(e.target.value))}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          {cells.map((cell) => (
            <option key={cell.id} value={cell.id} className="bg-[#1e1e2e]">
              C{cell.id}: {cell.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function App() {
  const [activeCell, setActiveCell] = useState(1);

  const handleCellClick = (id: number) => {
    setActiveCell(id);
    const element = document.getElementById(`cell-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCopyAll = async () => {
    const allCode = notebookCells.map((c) => c.code).join("\n\n");
    try {
      await navigator.clipboard.writeText(allCode);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = allCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar cells={notebookCells} activeCell={activeCell} onCellClick={handleCellClick} />

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <MobileNav cells={notebookCells} activeCell={activeCell} onCellClick={handleCellClick} />

          {/* Header */}
          <header className="px-6 py-8 lg:px-10 lg:py-12 border-b border-white/5">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                  ● Ejecutable
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  GPU T4/P100
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  QLoRA 4-bit
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                Google Gemma 4 Developer Agent Competition
              </h1>
              <p className="text-gray-400 text-sm lg:text-base max-w-2xl">
                Fine-tuning de <code className="px-1.5 py-0.5 rounded bg-white/5 text-blue-300 text-xs">google/gemma-4-31b-it-qat-w4a16-ct</code> con
                QLoRA para crear un agente de código que usa herramientas de grafo
                (<code className="px-1.5 py-0.5 rounded bg-white/5 text-purple-300 text-xs">search_similar_code</code>,
                <code className="px-1.5 py-0.5 rounded bg-white/5 text-purple-300 text-xs ml-1">get_code_subgraph</code>)
                y edición (<code className="px-1.5 py-0.5 rounded bg-white/5 text-purple-300 text-xs">edit_file</code>,
                <code className="px-1.5 py-0.5 rounded bg-white/5 text-purple-300 text-xs ml-1">read_file</code>).
              </p>

              {/* Action buttons */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={handleCopyAll}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copiar Todo el Código
                </button>
                <button
                  onClick={() => handleCellClick(1)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium transition-all duration-200 border border-white/10"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Run All
                </button>
              </div>
            </div>
          </header>

          {/* Notebook Cells */}
          <div className="px-6 py-8 lg:px-10 space-y-6 max-w-5xl mx-auto">
            {notebookCells.map((cell) => (
              <CellComponent
                key={cell.id}
                cell={cell}
                isActive={activeCell === cell.id}
              />
            ))}
          </div>

          {/* Footer */}
          <footer className="px-6 py-8 lg:px-10 border-t border-white/5 mt-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-gray-500 text-sm">
                Kaggle Notebook • Google Gemma 4 Developer Agent Competition • 8 celdas ejecutables
              </p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <span className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Gradient Checkpointing
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Paged AdamW 8-bit
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  NF4 Double Quantization
                </span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
