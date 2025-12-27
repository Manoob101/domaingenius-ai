import React, { useState, useEffect, useRef } from 'react';
import { generateDomainNames } from './services/geminiService';
import { checkDomainAvailability } from './services/dnsService';
import ControlPanel from './components/ControlPanel';
import DomainList from './components/DomainList';
import { AvailabilityStatus, DomainResult, GeneratorConfig } from './types';
import { Globe, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [config, setConfig] = useState<GeneratorConfig>({
    keywords: '',
    wordCount: 2,
    style: 'auto'
  });
  
  const [domains, setDomains] = useState<DomainResult[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Track if the checking loop is active (though useEffect dependency handles this mostly)
  // We use this to prevent double-firing in strict mode development if needed,
  // but the state-based logic is robust.
  const isLoopRunning = useRef(false);

  const handleGenerate = async () => {
    setDomains([]);
    setIsGenerating(true);

    try {
      // Call Gemini API
      const names = await generateDomainNames(config.keywords, config.wordCount, config.style);
      
      // Transform to DomainResult objects with IDLE status
      const initialResults: DomainResult[] = names.map(name => ({
        id: crypto.randomUUID(),
        name: name.toLowerCase().replace(/[^a-z0-9-]/g, ''), // Ensure clean SLD
        tld: 'com',
        status: AvailabilityStatus.IDLE
      }));

      setDomains(initialResults);
    } catch (error) {
      console.error("Failed to generate domains", error);
      alert("Something went wrong while contacting the AI. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Sequential Check Logic
  useEffect(() => {
    const processQueue = async () => {
      // 1. Check if we are already checking a domain (Sequential enforcement)
      const currentlyChecking = domains.find(d => d.status === AvailabilityStatus.CHECKING);
      if (currentlyChecking) return;

      // 2. Find the next IDLE domain
      const nextDomain = domains.find(d => d.status === AvailabilityStatus.IDLE);
      if (!nextDomain) return; // All processed

      // 3. Mark it as CHECKING
      setDomains(prev => prev.map(d => 
        d.id === nextDomain.id ? { ...d, status: AvailabilityStatus.CHECKING } : d
      ));

      // 4. Perform the real DNS check
      // Add a small artificial delay to avoid hammering the DNS API too fast if needed, 
      // but usually the fetch latency is enough.
      const isAvailable = await checkDomainAvailability(nextDomain.name);

      // 5. Update the result
      setDomains(prev => prev.map(d => 
        d.id === nextDomain.id ? { 
          ...d, 
          status: isAvailable ? AvailabilityStatus.AVAILABLE : AvailabilityStatus.TAKEN 
        } : d
      ));
    };

    processQueue();
  }, [domains]);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black pb-20">
      
      {/* Header */}
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-brand-500 to-emerald-500 rounded-lg shadow-lg shadow-brand-500/20">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              DomainGenius<span className="text-brand-500">.ai</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
               <Heart className="w-3 h-3 fill-brand-400/50" />
               Made by Manu
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        
        {/* Hero Text */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Find your perfect <span className="text-brand-400">.com</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Generate 100 creative domain ideas instantly using AI. 
            We verify availability in real-time so you can claim your name before it's gone.
          </p>
        </div>

        {/* Controls */}
        <ControlPanel 
          config={config} 
          setConfig={setConfig} 
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />

        {/* Results */}
        <DomainList domains={domains} />

      </main>
    </div>
  );
};

export default App;