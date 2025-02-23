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
    .forEach((match) => {
      if (match.result?.completed) {
        const nextWinnerMatch = matches.find(
          (m) =>
            m.bracket === 'winners' &&
            m.round === match.round + 1 &&
            (m.team1?.id === match.result?.winner || m.team2?.id === match.result?.winner)
        );

        if (nextWinnerMatch) {
          edges.push({
            id: `e${match.id}-${nextWinnerMatch.id}`,
            source: match.id,
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
    .forEach((match) => {
      if (match.result?.completed) {
        const nextLoserMatch = matches.find(
          (m) =>
            m.bracket === 'losers' &&
            m.round === match.round + 1 &&
            (m.team1?.id === match.result?.winner || m.team2?.id === match.result?.winner)
        );

        if (nextLoserMatch) {
          edges.push({
            id: `e${match.id}-${nextLoserMatch.id}`,
            source: match.id,
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
