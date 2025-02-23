'use client';

import type { Match } from '@/common/types/type';
import {
  makeEdgesForFinals,
  makeEdgesForLosers,
  makeEdgesForWinners,
  positionFinalMatches,
  positionLoserBracketMatches,
  positionWinnerBracketMatches
} from '@/helpers';
import { mockedMatches } from '@/mock/data';
import { type Edge, MiniMap, type Node, type NodeTypes, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from 'react';
import { MatchCard } from './match-card';
import { MatchPopup } from './match-popup';

const nodeTypes: NodeTypes = {
  matchCard: MatchCard
};

export const TournamentBracket = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [hoveredMatch, setHoveredMatch] = useState<Match | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [matches] = useState<Match[]>(mockedMatches);

  const updateLayout = useCallback(() => {
    // Group matches by bracket and round
    const winnerMatches = matches
      .filter((match) => match.bracket === 'winners')
      .reduce(
        (acc, match) => {
          acc[match.round] = acc[match.round] || [];
          acc[match.round].push(match);
          return acc;
        },
        {} as Record<number, Match[]>
      );

    const loserMatches = matches
      .filter((match) => match.bracket === 'losers')
      .reduce(
        (acc, match) => {
          acc[match.round] = acc[match.round] || [];
          acc[match.round].push(match);
          return acc;
        },
        {} as Record<number, Match[]>
      );

    const finalMatches = matches.filter((match) => match.bracket === 'final');

    // Create nodes with fixed positions
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    nodes.push(...positionWinnerBracketMatches(winnerMatches, nodes));
    nodes.push(...positionLoserBracketMatches(loserMatches, nodes));
    nodes.push(...positionFinalMatches(finalMatches, loserMatches, winnerMatches));

    edges.push(...makeEdgesForWinners(matches));
    edges.push(...makeEdgesForLosers(matches));
    edges.push(...makeEdgesForFinals(matches));

    setNodes(nodes);
    setEdges(edges);
  }, [matches, setNodes, setEdges]);

  useEffect(() => {
    updateLayout();
  }, [updateLayout]);

  const handleNodeMouseEnter = (event: React.MouseEvent, node: Node) => {
    const match = matches.find((m) => m.id === node.id);

    if (match) {
      setHoveredMatch(match);
      setMousePosition({ x: event.clientX + 10, y: event.clientY + 10 });
    }
  };

  const handleNodeMouseLeave = () => {
    setHoveredMatch(null);
  };

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodesDraggable={false}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        nodeOrigin={[0.5, 0.5]}
        nodesFocusable={false}
        nodesConnectable={false}
        onNodeMouseEnter={handleNodeMouseEnter}
        onNodeMouseLeave={handleNodeMouseLeave}
        fitView
        minZoom={0.5}
        maxZoom={1.5}>
        <MiniMap />
      </ReactFlow>
      {hoveredMatch && (
        <MatchPopup
          match={hoveredMatch}
          position={mousePosition}
        />
      )}
    </div>
  );
};
