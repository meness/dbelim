'use client';

import type { Match } from '@/common/types/type';
import { Card, CardContent, CardHeader, CardTitle } from '@/components';

type MatchPopupProps = {
  match: Match;
};

export const MatchPopup = ({ match }: MatchPopupProps) => {
  const { round, matchNumber, team1, team2, result, bracket, date, time } = match;

  return (
    <Card className="z-50 w-[300px]">
      <CardHeader>
        <CardTitle className="text-lg">
          {bracket.charAt(0).toUpperCase() + bracket.slice(1)} Bracket - Round {round}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium">Match {matchNumber}</div>
            <div className="text-xs text-muted-foreground">
              {date} at {time}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{team1?.name || 'TBD'}</span>
              <span>{result?.team1Score}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{team2?.name || 'TBD'}</span>
              <span>{result?.team2Score}</span>
            </div>
          </div>
          {result?.completed && (
            <div className="text-sm">
              Winner: <span className="font-medium">{result.winner === team1?.id ? team1?.name : team2?.name}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
