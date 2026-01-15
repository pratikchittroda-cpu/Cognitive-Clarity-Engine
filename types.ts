export interface ClarityStep {
  title: string;
  description: string;
}

export interface ClarityResult {
  coreProblem: string;
  knowns: string[];
  unclear: string[];
  concepts: string[];
  clarityPath: ClarityStep[];
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  input: string;
  result: ClarityResult;
}
