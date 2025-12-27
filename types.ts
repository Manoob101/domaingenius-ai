export enum AvailabilityStatus {
  IDLE = 'IDLE',
  CHECKING = 'CHECKING',
  AVAILABLE = 'AVAILABLE',
  TAKEN = 'TAKEN',
  ERROR = 'ERROR'
}

export interface DomainResult {
  id: string;
  name: string;
  tld: string;
  status: AvailabilityStatus;
  price?: string; // Simulated price
}

export type WordCountOption = 1 | 2 | 3;

export type DomainStyle = 
  | 'auto' 
  | 'brandable' 
  | 'evocative' 
  | 'phrase' 
  | 'compound' 
  | 'alternate' 
  | 'foreign' 
  | 'real';

export interface GeneratorConfig {
  keywords: string;
  wordCount: WordCountOption;
  style: DomainStyle;
}
