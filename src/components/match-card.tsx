'use client';

import type { Match } from '@/common/types/type';
import { Card, CardContent } from '@/components';
import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';

type MatchCardProps = {
  data: Match;
};

export const MatchCard = memo(({ data }: MatchCardProps) => {
  const { team1, team2, result, round, matchNumber, bracket, date, time } = data;

  return (
    <Card
      className={`w-[250px] ${
        bracket === 'winners' ? 'border-primary' : bracket === 'losers' ? 'border-destructive' : 'border-secondary'
      }`}>
      <CardContent className="p-4">
        <div className="mb-2 text-sm font-medium">
          {bracket.charAt(0).toUpperCase() + bracket.slice(1)} Round {round} - Match {matchNumber}
        </div>
        <div className="space-y-2">
          <div className={`flex justify-between ${result?.winner === team1?.id ? 'font-bold text-primary' : ''}`}>
            <span>{team1?.name || 'TBD'}</span>
            <span>{result?.team1Score}</span>
          </div>
          <div className={`flex justify-between ${result?.winner === team2?.id ? 'font-bold text-primary' : ''}`}>
            <span>{team2?.name || 'TBD'}</span>
            <span>{result?.team2Score}</span>
          </div>
        </div>
        {date && time && (
          <div className="mt-2 text-xs text-muted-foreground">
            {date} at {time}
          </div>
        )}
      </CardContent>
      <Handle
        type="target"
        position={Position.Left}
      />
      {bracket !== 'final' && (
        <Handle
          type="source"
          position={Position.Right}
        />
      )}
    </Card>
  );
});

MatchCard.displayName = 'MatchCard';
