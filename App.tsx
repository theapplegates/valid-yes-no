import React, { useState } from 'react';
import { KeyValidator } from './components/KeyValidator';
import { ShieldCheck, Terminal } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col font-sans">
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">PGP Inspector</h1>
              <p className="text-xs text-gray-400 font-mono">Quantum-Ready Analysis Tool</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="hidden md:flex items-center gap-2">
              <Terminal size={14} />
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <KeyValidator />
      </main>

      <footer className="border-t border-gray-800 bg-gray-900 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>Local analysis only. Keys are not uploaded to any server unless AI Analysis is requested.</p>
        </div>
      </footer>
    </div>
  );
}