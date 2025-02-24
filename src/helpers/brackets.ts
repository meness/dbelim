import { Match } from '@/common/types/type';
import { ConnectionLineType, Edge, Node } from '@xyflow/react';

const BRACKET_SEPARATOR = 200;
const VERTICAL_SPACING = 180;
const HORIZONTAL_SPACING = 300;
// FIX Determine final rounds programmatically
const FINAL_WINNERS_ROUND = 3;
const FINAL_LOSERS_ROUND = 4;

export const makeEdgesForWinners = (matches: Match[]) => {
  const edges: Edge[] = [];

  matches
    .filter((match) => match.bracket === 'winners')
    .forEach((winnerMatch) => {
      if (winnerMatch.result?.completed) {
        const nextWinnerMatch = matches.find(
          (match) =>
            match.bracket === 'winners' &&
            match.round === winnerMatch.round + 1 &&
            (match.team1?.id === winnerMatch.result?.winner || match.team2?.id === winnerMatch.result?.winner)
        );

        if (nextWinnerMatch) {
          edges.push({
            id: `e${winnerMatch.id}-${nextWinnerMatch.id}`,
            source: winnerMatch.id,
            target: nextWinnerMatch.id,
            type: ConnectionLineType.SmoothStep,
            style: { stroke: '#22c55e' }
          });
        }
      }
    });

  return edges;
};

export const makeEdgesForLosers = (matches: Match[]) => {
  const edges: Edge[] = [];

  matches
    .filter((match) => match.bracket === 'losers')
    .forEach((loserMatch) => {
      if (loserMatch.result?.completed) {
        const nextLoserMatch = matches.find(
          (match) =>
            match.bracket === 'losers' &&
            match.round === loserMatch.round + 1 &&
            (match.team1?.id === loserMatch.result?.winner || match.team2?.id === loserMatch.result?.winner)
        );

        if (nextLoserMatch) {
          edges.push({
            id: `e${loserMatch.id}-${nextLoserMatch.id}`,
            source: loserMatch.id,
            target: nextLoserMatch.id,
            type: ConnectionLineType.SmoothStep,
            style: { stroke: '#ef4444' }
          });
        }
      }
    });

  return edges;
};

export const makeEdgesForFinals = (matches: Match[]) => {
  const edges: Edge[] = [];

  const winnersFinal = matches.find((match) => match.bracket === 'winners' && match.round === FINAL_WINNERS_ROUND);
  const losersFinal = matches.find((match) => match.bracket === 'losers' && match.round === FINAL_LOSERS_ROUND);
  const grandFinal = matches.find((match) => match.bracket === 'final');

  if (winnersFinal && grandFinal) {
    edges.push({
      id: `e${winnersFinal.id}-${grandFinal.id}`,
      source: winnersFinal.id,
      target: grandFinal.id,
      type: ConnectionLineType.SmoothStep,
      style: { stroke: '#22c55e' }
    });
  }

  if (losersFinal && grandFinal) {
    edges.push({
      id: `e${losersFinal.id}-${grandFinal.id}`,
      source: losersFinal.id,
      target: grandFinal.id,
      type: ConnectionLineType.SmoothStep,
      style: { stroke: '#ef4444' }
    });
  }

  return edges;
};

export const positionLoserBracketMatches = (loserMatches: Record<number, Match[]>, nodes: Node[]) => {
  const output: Node[] = [];

  Object.entries(loserMatches).forEach(([round, matches]) => {
    const roundNum = Number.parseInt(round);
    const prevRoundMatches = loserMatches[roundNum - 1] || []; // Get previous round matches

    matches.forEach((match, index) => {
      // Find the two previous matches that feed into this match
      const [prevMatch1, prevMatch2] = [prevRoundMatches[index * 2], prevRoundMatches[index * 2 + 1]];

      // Get their Y positions
      const prevY1 = prevMatch1 ? [...output, ...nodes].find((n) => n.id === prevMatch1.id)?.position.y : undefined;
      const prevY2 = prevMatch2 ? [...output, ...nodes].find((n) => n.id === prevMatch2.id)?.position.y : undefined;

      const isLocatedInMiddle =
        prevMatch1 &&
        prevMatch2 &&
        [prevMatch1.team1?.id, prevMatch1.team2?.id, prevMatch2.team1?.id, prevMatch2.team2?.id].includes(
          match.team1?.id
        ) &&
        [prevMatch1.team1?.id, prevMatch1.team2?.id, prevMatch2.team1?.id, prevMatch2.team2?.id].includes(
          match.team2?.id
        );

      // Compute the middle Y position or fallback
      const averageY =
        isLocatedInMiddle && prevY1 !== undefined && prevY2 !== undefined
          ? (prevY1 + prevY2) / 2
          : Object.values(loserMatches).flat().length * VERTICAL_SPACING + BRACKET_SEPARATOR + index * VERTICAL_SPACING;

      output.push({
        id: match.id,
        type: 'matchCard',
        data: match,
        position: {
          x: (roundNum - 1) * HORIZONTAL_SPACING,
          y: averageY
        }
      });
    });
  });

  return output;
};

export const positionWinnerBracketMatches = (winnerMatches: Record<number, Match[]>, nodes: Node[]) => {
  const output: Node[] = [];

  Object.entries(winnerMatches).forEach(([round, matches]) => {
    const roundNum = Number.parseInt(round);
    const prevRoundMatches = winnerMatches[roundNum - 1] || []; // Get previous round matches

    matches.forEach((match, index) => {
      // Find the two previous matches that feed into this match
      const [prevMatch1, prevMatch2] = [prevRoundMatches[index * 2], prevRoundMatches[index * 2 + 1]];

      // Get their Y positions
      const prevY1 = prevMatch1 ? [...output, ...nodes].find((n) => n.id === prevMatch1.id)?.position.y : undefined;
      const prevY2 = prevMatch2 ? [...output, ...nodes].find((n) => n.id === prevMatch2.id)?.position.y : undefined;

      // Compute the middle Y position or fallback for first-round matches
      const averageY = prevY1 !== undefined && prevY2 !== undefined ? (prevY1 + prevY2) / 2 : index * VERTICAL_SPACING;

      output.push({
        id: match.id,
        type: 'matchCard',
        data: match,
        position: {
          x: (roundNum - 1) * HORIZONTAL_SPACING,
          y: averageY
        }
      });
    });
  });

  return output;
};

export const positionFinalMatches = (
  finalMatches: Match[],
  loserMatches: Record<number, Match[]>,
  winnerMatches: Record<number, Match[]>
) => {
  const output: Node[] = [];

  finalMatches.forEach((match) => {
    output.push({
      id: match.id,
      type: 'matchCard',
      data: match,
      position: {
        x: Object.keys(loserMatches).length * HORIZONTAL_SPACING,
        y: (Object.values(winnerMatches).reduce((acc, matches) => acc + matches.length, 0) * VERTICAL_SPACING) / 2
      }
    });
  });

  return output;
};

export const filterLoserMatches = (matches: Match[]) => {
  return matches
    .filter((match) => match.bracket === 'losers')
    .reduce(
      (acc, match) => {
        acc[match.round] = acc[match.round] || [];
        acc[match.round].push(match);
        return acc;
      },
      {} as Record<number, Match[]>
    );
};

export const filterWinnerMatches = (matches: Match[]) => {
  return matches
    .filter((match) => match.bracket === 'winners')
    .reduce(
      (acc, match) => {
        acc[match.round] = acc[match.round] || [];
        acc[match.round].push(match);
        return acc;
      },
      {} as Record<number, Match[]>
    );
};

export const filterFinalMatches = (matches: Match[]) => {
  return matches.filter((match) => match.bracket === 'final');
};
