import React, { useState, useEffect } from 'react';
import { SAMPLE_KEY, parsePGPKey, PGPInfo } from '../utils/pgpParser';
import { analyzeKeyWithGemini } from '../services/geminiService';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Code2, 
  FileJson, 
  Cpu, 
  Search, 
  Loader2,
  Lock,
  ShieldCheck
} from 'lucide-react';

export const KeyValidator: React.FC = () => {
  const [inputText, setInputText] = useState(SAMPLE_KEY);
  const [info, setInfo] = useState<PGPInfo | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (inputText) {
      const result = parsePGPKey(inputText);
      setInfo(result);
      setAiAnalysis(null);
    } else {
      setInfo(null);
    }
  }, [inputText]);

  const handleAiAnalysis = async () => {
    if (!inputText || !info) return;
    setIsAnalyzing(true);
    try {
      const technicalContext = `
        Format detected: ${info.format}
        Headers: ${JSON.stringify(info.headers)}
        Is JSON Body: ${info.isJsonBody}
        Decoded Body Preview: ${info.decodedBody ? info.decodedBody.slice(0, 200) : 'N/A'}
      `;
      const result = await analyzeKeyWithGemini(inputText, technicalContext);
      setAiAnalysis(result || "No analysis returned.");
    } catch (err) {
      setAiAnalysis("Failed to perform AI analysis. Please check your API key configuration or try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusColor = (format: PGPInfo['format']) => {
    switch (format) {
      case 'standard': return 'text-emerald-400';
      case 'json_wrapped': return 'text-amber-400';
      case 'invalid': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (format: PGPInfo['format']) => {
    switch (format) {
      case 'standard': return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
      case 'json_wrapped': return <AlertTriangle className="w-6 h-6 text-amber-500" />;
      case 'invalid': return <XCircle className="w-6 h-6 text-red-500" />;
      default: return <Search className="w-6 h-6 text-gray-500" />;
    }
  };

  const getTitle = (format: PGPInfo['format']) => {
    switch (format) {
      case 'standard': return 'Standard OpenPGP Key';
      case 'json_wrapped': return 'Non-Standard Custom Key (JSON)';
      case 'invalid': return 'Invalid Key Block';
      default: return 'Unknown Format';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Input */}
      <div className="flex flex-col gap-4">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-100 font-semibold flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" />
              Input Key Block
            </h2>
            <button 
              onClick={() => setInputText(SAMPLE_KEY)}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Reset to Sample
            </button>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-[500px] bg-gray-950 text-gray-300 font-mono text-xs md:text-sm p-4 rounded-lg border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none scrollbar-thin scrollbar-thumb-gray-800"
            spellCheck={false}
            placeholder="-----BEGIN PGP PUBLIC KEY BLOCK-----..."
          />
        </div>
      </div>

      {/* Right Column: Analysis */}
      <div className="flex flex-col gap-6">
        {info && (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-full bg-gray-950 border border-gray-800 ${getStatusColor(info.format)}`}>
                {getStatusIcon(info.format)}
              </div>
              <div>
                <h3 className={`text-xl font-bold ${getStatusColor(info.format)}`}>
                  {getTitle(info.format)}
                </h3>
                <p className="text-gray-400 text-sm">
                  {info.isValidHeader ? "Valid Armor Headers detected" : "Missing or Invalid PGP Headers"}
                </p>
              </div>
            </div>

            {/* Metadata Table */}
            <div className="space-y-4">
              <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                <h4 className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                  <Lock className="w-3 h-3" /> Header Metadata
                </h4>
                <div className="space-y-2">
                  {Object.entries(info.headers).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-[100px_1fr] gap-2 text-sm border-b border-gray-900 pb-2 last:border-0 last:pb-0">
                      <span className="text-gray-500 font-mono text-xs">{key}</span>
                      <span className="text-gray-300 font-mono break-all">{value}</span>
                    </div>
                  ))}
                  {Object.keys(info.headers).length === 0 && (
                    <span className="text-gray-600 text-sm italic">No metadata headers found.</span>
                  )}
                </div>
              </div>

              {/* Format Specific Details */}
              {info.format === 'json_wrapped' && (
                <div className="bg-gray-950 rounded-lg p-4 border border-amber-900/30">
                  <h4 className="text-amber-500 text-xs uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                    <FileJson className="w-3 h-3" /> JSON Payload Detected
                  </h4>
                  <p className="text-gray-400 text-sm mb-3">
                    This key contains a JSON object encoded in Base64 instead of standard OpenPGP binary packets. 
                    This is typical for experimental or proprietary Post-Quantum implementations.
                  </p>
                  <pre className="bg-black/50 p-3 rounded text-amber-100/90 text-xs font-mono overflow-x-auto border border-amber-900/20">
                    {info.decodedBody ? JSON.stringify(JSON.parse(info.decodedBody), null, 2) : 'Error parsing JSON'}
                  </pre>
                </div>
              )}

              {info.format === 'standard' && (
                <div className="bg-gray-950 rounded-lg p-4 border border-emerald-900/30">
                  <h4 className="text-emerald-500 text-xs uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                    <Cpu className="w-3 h-3" /> Standard RFC 4880
                  </h4>
                  <p className="text-gray-400 text-sm">
                    The body contains standard binary data structure starting with OpenPGP packet tags.
                  </p>
                </div>
              )}

              {/* AI Analysis Button */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-indigo-400 font-semibold text-sm">Deep Analysis</h4>
                  {process.env.API_KEY ? (
                     <button
                     onClick={handleAiAnalysis}
                     disabled={isAnalyzing}
                     className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Cpu className="w-4 h-4" />}
                     Analyze with Gemini
                   </button>
                  ) : (
                    <span className="text-gray-600 text-xs">API Key Required for AI Analysis</span>
                  )}
                 
                </div>
                
                {aiAnalysis && (
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 text-sm text-gray-300 leading-relaxed space-y-2">
                     <div className="prose prose-invert max-w-none text-sm">
                        <pre className="whitespace-pre-wrap font-sans text-gray-300">{aiAnalysis}</pre>
                     </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!info && (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 border border-gray-800 border-dashed rounded-xl p-8 bg-gray-900/30">
             <ShieldCheck className="w-12 h-12 mb-4 opacity-50" />
             <p className="text-sm">Paste a PGP key block to begin analysis.</p>
          </div>
        )}
      </div>
    </div>
  );
};