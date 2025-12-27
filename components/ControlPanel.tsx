import React from 'react';
import { GeneratorConfig, WordCountOption, DomainStyle } from '../types';
import { Search, Sparkles, Layers, Palette } from 'lucide-react';

interface ControlPanelProps {
  config: GeneratorConfig;
  setConfig: React.Dispatch<React.SetStateAction<GeneratorConfig>>;
  onGenerate: () => void;
  isGenerating: boolean;
}

const styles: { id: DomainStyle; label: string; sub: string }[] = [
  { id: 'auto', label: 'Auto / All', sub: 'Mixed styles' },
  { id: 'brandable', label: 'Brandable', sub: 'like Google, Rolex' },
  { id: 'evocative', label: 'Evocative', sub: 'like RedBull, Forever21' },
  { id: 'phrase', label: 'Short Phrase', sub: 'like Dollar Shave Club' },
  { id: 'compound', label: 'Compound', sub: 'like FedEx, Microsoft' },
  { id: 'alternate', label: 'Alt Spelling', sub: 'like Lyft, Fiverr' },
  { id: 'foreign', label: 'Non-English', sub: 'like Toyota, Audi' },
  { id: 'real', label: 'Real Words', sub: 'like Apple, Amazon' },
];

const ControlPanel: React.FC<ControlPanelProps> = ({ config, setConfig, onGenerate, isGenerating }) => {
  
  const handleWordCountChange = (count: WordCountOption) => {
    setConfig(prev => ({ ...prev, wordCount: count }));
  };

  const handleStyleChange = (style: DomainStyle) => {
    setConfig(prev => ({ ...prev, style }));
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto mb-8 space-y-8">
      
      {/* Top Row: Word Count & Keywords */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Word Count Selection (First) */}
        <div className="w-full md:w-auto">
          <label className="block text-sm font-bold text-brand-400 mb-2 flex items-center gap-2 uppercase tracking-wider">
            <span className="bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded text-xs">Step 1</span>
            Length
          </label>
          <div className="flex bg-gray-950 p-1 rounded-lg border border-gray-800">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => handleWordCountChange(num as WordCountOption)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  config.wordCount === num
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/50 ring-1 ring-brand-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {num} {num === 1 ? 'Word' : 'Words'}
              </button>
            ))}
          </div>
        </div>

        {/* Keywords Input (Second) */}
        <div className="flex-1 w-full">
          <label className="block text-sm font-bold text-brand-400 mb-2 flex items-center gap-2 uppercase tracking-wider">
            <span className="bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded text-xs">Step 2</span>
            Keywords or Theme
          </label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-400 transition-colors" />
            <input
              type="text"
              value={config.keywords}
              onChange={(e) => setConfig(prev => ({ ...prev, keywords: e.target.value }))}
              placeholder="e.g., ai, crypto, fast food, yoga"
              className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
              onKeyDown={(e) => e.key === 'Enter' && !isGenerating && onGenerate()}
            />
          </div>
        </div>

      </div>

      {/* Style Selection Grid */}
      <div className="border-t border-gray-800/50 pt-6">
        <label className="block text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Naming Style (Optional)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => handleStyleChange(style.id)}
              className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 ${
                config.style === style.id
                  ? 'bg-brand-900/30 border-brand-500 ring-1 ring-brand-500'
                  : 'bg-gray-950 border-gray-800 hover:border-gray-700 hover:bg-gray-900'
              }`}
            >
              <span className={`text-sm font-semibold ${config.style === style.id ? 'text-brand-300' : 'text-gray-200'}`}>
                {style.label}
              </span>
              <span className="text-xs text-gray-500 mt-1 truncate w-full">
                {style.sub}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="w-full">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-brand-900/20 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Dreaming up names...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Domain Names
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;