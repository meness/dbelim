'use client';

import type { Match } from '@/common/types/type';
import {
  filterFinalMatches,
  filterLoserMatches,
  filterWinnerMatches,
  makeEdgesForFinals,
  makeEdgesForLosers,
  makeEdgesForWinners,
  positionFinalMatches,
  positionLoserBracketMatches,
  positionWinnerBracketMatches
} from '@/helpers';
import { mockedMatches } from '@/mock/data';
import {
  type Edge,
  MiniMap,
  type Node,
  NodeToolbar,
  type NodeTypes,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState
} from '@xyflow/react';
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
  const [activeMatch, setActiveMatch] = useState<Match>();

  const [matches] = useState<Match[]>(mockedMatches);

  const updateLayout = useCallback(() => {
    // Group matches by bracket and round
    const winnerMatches = filterWinnerMatches(matches);
    const loserMatches = filterLoserMatches(matches);
    const finalMatches = filterFinalMatches(matches);

    // Create nodes with fixed positions
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    nodes.push(
      ...positionWinnerBracketMatches(winnerMatches, nodes),
      ...positionLoserBracketMatches(loserMatches, nodes),
      ...positionFinalMatches(finalMatches, loserMatches, winnerMatches)
    );

    edges.push(...makeEdgesForWinners(matches), ...makeEdgesForLosers(matches), ...makeEdgesForFinals(matches));

    setNodes(nodes);
    setEdges(edges);
  }, [matches]);

  useEffect(() => {
    updateLayout();
  }, [updateLayout]);

  const handleNodeMouseEnter = (_: React.MouseEvent, node: Node) => {
    const match = matches.find((match) => match.id === node.id);

    if (match) {
      setActiveMatch(match);
    }
  };

  const handleNodeMouseLeave = () => {
    setActiveMatch(undefined);
  };

  return (
    <>
      <NodeToolbar
        isVisible={!!activeMatch}
        position={Position.Right}
        nodeId={activeMatch?.id}>
        <MatchPopup match={activeMatch!} />
      </NodeToolbar>
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
        <MiniMap
          pannable
          zoomable
        />
      </ReactFlow>
    </>
  );
};
