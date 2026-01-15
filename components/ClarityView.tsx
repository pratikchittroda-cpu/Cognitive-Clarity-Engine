import React from 'react';
import { ClarityResult } from '../types';
import { SparklesIcon, CheckCircleIcon, QuestionMarkIcon, BrainIcon } from './Icons';

interface ClarityViewProps {
  data: ClarityResult;
  onReset: () => void;
}

const ClarityView: React.FC<ClarityViewProps> = ({ data, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      
      {/* 1. Core Problem Distilled */}
      <div className="bg-slate-900/60 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-4 text-purple-300">
          <SparklesIcon className="w-6 h-6" />
          <h2 className="text-lg font-semibold tracking-wide uppercase">Core Problem Distilled</h2>
        </div>
        <p className="text-2xl md:text-3xl font-normal text-white leading-relaxed drop-shadow-sm">
          {data.coreProblem}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 2. What is Known */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4 text-green-400">
            <CheckCircleIcon className="w-5 h-5" />
            <h3 className="font-semibold uppercase text-sm tracking-wider">What is Known</h3>
          </div>
          <ul className="space-y-3">
            {data.knowns.map((item, idx) => (
              <li key={idx} className="text-gray-100 font-normal text-sm leading-6 flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 3. What is Unclear */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4 text-orange-300">
            <QuestionMarkIcon className="w-5 h-5" />
            <h3 className="font-semibold uppercase text-sm tracking-wider">What is Unclear</h3>
          </div>
          <ul className="space-y-3">
            {data.unclear.map((item, idx) => (
              <li key={idx} className="text-gray-100 font-normal text-sm leading-6 flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 shadow-[0_0_5px_rgba(249,115,22,0.5)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Concepts Required */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4 text-blue-300">
            <BrainIcon className="w-5 h-5" />
            <h3 className="font-semibold uppercase text-sm tracking-wider">Concepts Required</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.concepts.map((item, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-blue-500/20 text-blue-50 text-xs font-medium rounded-lg border border-blue-500/30">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Step-by-step Clarity Path */}
      <div className="bg-slate-900/60 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-8 border-b border-white/10 pb-4">
          Path to Clarity
        </h2>
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {data.clarityPath.map((step, idx) => (
            <div key={idx} className="relative flex gap-6 group">
              <div className="absolute left-0 ml-5 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-700 bg-slate-800 text-xs font-bold text-white shadow-md group-hover:border-purple-500 group-hover:text-purple-300 transition-colors z-10">
                {idx + 1}
              </div>
              <div className="flex-1 ml-4 bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-5 border border-white/5">
                <h4 className="text-lg font-medium text-purple-200 mb-2">{step.title}</h4>
                <p className="text-gray-200 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all backdrop-blur-sm border border-white/20 shadow-lg"
        >
          Analyze Another Thought
        </button>
      </div>
    </div>
  );
};

export default ClarityView;