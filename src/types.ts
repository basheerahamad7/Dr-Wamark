export interface CleanOptions {
  removeZeroWidth: boolean;
  removeHiddenFormat: boolean;
  normalizeWhitespace: boolean;
  trimTrailing: boolean;
  normalizeHomoglyphs: boolean;
  expertNormalization: boolean;
}

export interface MarkerBreakdown {
  label: string;
  count: number;
  description: string;
}

export interface CleanResult {
  originalText: string;
  cleanedText: string;
  totalRemoved: number;
  breakdown: MarkerBreakdown[];
  processingTimeMs: number;
  originalBytes: number;
  cleanedBytes: number;
}
