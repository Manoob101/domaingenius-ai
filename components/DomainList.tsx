import React from 'react';
import { AvailabilityStatus, DomainResult } from '../types';
import { Check, X, Loader2, ExternalLink, Globe } from 'lucide-react';

interface DomainListProps {
  domains: DomainResult[];
}

const DomainItem: React.FC<{ domain: DomainResult; index: number }> = ({ domain, index }) => {
  const isAvailable = domain.status === AvailabilityStatus.AVAILABLE;
  const isTaken = domain.status === AvailabilityStatus.TAKEN;
  const isChecking = domain.status === AvailabilityStatus.CHECKING;
  const isIdle = domain.status === AvailabilityStatus.IDLE;

  const godaddyUrl = `https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=${domain.name}.com`;

  return (
    <div 
      className="group flex items-center justify-between p-4 bg-gray-900/40 border border-gray-800/50 rounded-xl hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-200"
    >
      <div className="flex items-center gap-4">
        <span className="text-gray-500 font-mono text-sm w-8 text-right">#{index + 1}</span>
        <div className="flex flex-col">
          <span className={`text-lg font-semibold tracking-tight ${isTaken ? 'text-gray-500 line-through decoration-gray-600' : 'text-gray-100'}`}>
            {domain.name}
            <span className="text-gray-500">.com</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Status Indicator */}
        <div className="w-32 flex justify-end">
          {isIdle && <span className="text-xs text-gray-600 uppercase tracking-wider font-medium">Waiting</span>}
          
          {isChecking && (
            <div className="flex items-center gap-2 text-brand-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-xs font-medium">Checking...</span>
            </div>
          )}
          
          {isAvailable && (
            <div className="flex items-center gap-2 text-green-400">
              <Check className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wide">Available</span>
            </div>
          )}
          
          {isTaken && (
            <div className="flex items-center gap-2 text-red-400">
              <X className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">Taken</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <a
          href={godaddyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isAvailable 
              ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
          }`}
        >
          {isAvailable ? 'Buy Now' : 'Check'}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

const DomainList: React.FC<DomainListProps> = ({ domains }) => {
  if (domains.length === 0) return null;

  return (
    <div className="space-y-4 max-w-4xl mx-auto animate-fade-in-up">
      <div className="flex items-center justify-between text-sm text-gray-500 px-4 mb-2">
        <span>Results ({domains.length})</span>
        <span className="flex items-center gap-1">
           Real-time DNS Check <Globe className="w-3 h-3"/>
        </span>
      </div>
      <div className="grid gap-3">
        {domains.map((domain, index) => (
          <DomainItem key={domain.id} domain={domain} index={index} />
        ))}
      </div>
    </div>
  );
};

export default DomainList;