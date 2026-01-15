import React, { useState } from 'react';
import { analyzeThoughts } from './services/geminiService';
import { ClarityResult } from './types';
import ClarityView from './components/ClarityView';
import { SparklesIcon, ArrowRightIcon } from './components/Icons';

function App() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ClarityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const analysis = await analyzeThoughts(input);
      setResult(analysis);
    } catch (err) {
      setError("Unable to process your thoughts right now. Please check your API key or try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setInput('');
    setError(null);
  };

  return (
    <div className="min-h-screen text-slate-100 selection:bg-purple-500/30">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-900/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-lg shadow-lg shadow-purple-500/20">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Cognitive Clarity Engine
            </h1>
          </div>
          {/* Subtle hint */}
          <div className="hidden md:block text-xs text-gray-500 font-mono">
            GEMINI-3-PRO POWERED
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen flex flex-col items-center justify-center">
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center space-y-6 animate-pulse">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-t-2 border-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-r-2 border-blue-500 rounded-full animate-spin reverse"></div>
              <div className="absolute inset-4 border-b-2 border-white/50 rounded-full animate-spin"></div>
            </div>
            <p className="text-xl font-light text-purple-200 tracking-wide">
              Untangling threads...
            </p>
          </div>
        )}

        {/* Input State */}
        {!isLoading && !result && (
          <div className="w-full max-w-2xl animate-fade-in-up">
            <div className="text-center mb-10 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
                Find Clarity in Chaos
              </h2>
              <p className="text-lg text-gray-400 font-light max-w-lg mx-auto">
                Pour out your messy, emotional, or confused thoughts. We'll distill them into a structured path forward.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-2 shadow-2xl">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="I'm feeling overwhelmed about..."
                  className="w-full h-48 bg-transparent text-lg p-6 text-white placeholder-gray-600 focus:outline-none resize-none font-light leading-relaxed"
                />
                <div className="flex justify-between items-center px-6 pb-4 pt-2">
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                    {input.length} characters
                  </span>
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white text-slate-900 rounded-xl font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Clarify <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-lg text-center text-sm">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Result State */}
        {!isLoading && result && (
          <ClarityView data={result} onReset={handleReset} />
        )}

      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full py-4 text-center text-xs text-gray-600 pointer-events-none">
        <p>Built with Gemini 3 Pro</p>
      </footer>
    </div>
  );
}

export default App;
