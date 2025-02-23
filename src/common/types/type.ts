export type Team = {
  id: string;
  name: string;
};

export type MatchResult = {
  team1Score?: number;
  team2Score?: number;
  winner?: string;
  completed: boolean;
};

export type Match = {
  id: string;
  round: number;
  matchNumber: number;
  team1?: Team;
  team2?: Team;
  date?: string;
  time?: string;
  result?: MatchResult;
  bracket: 'winners' | 'losers' | 'final';
};
