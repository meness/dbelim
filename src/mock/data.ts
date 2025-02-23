import { Match, Team } from '@/common/types/type';

export const teams: Team[] = [
  { id: 't1', name: 'Cloud9' },
  { id: 't2', name: 'Team Liquid' },
  { id: 't3', name: 'Evil Geniuses' },
  { id: 't4', name: '100 Thieves' },
  { id: 't5', name: 'TSM' },
  { id: 't6', name: 'FlyQuest' },
  { id: 't7', name: 'Dignitas' },
  { id: 't8', name: 'Counter Logic Gaming' },
  { id: 't9', name: 'Immortals' },
  { id: 't10', name: 'Golden Guardians' },
  { id: 't11', name: 'NRG Esports' }
];

export const mockedMatches: Match[] = [
  // Winners Bracket Round 1
  {
    id: 'w1_1',
    round: 1,
    matchNumber: 1,
    team1: teams[0],
    team2: teams[9],
    date: '2024-02-24',
    time: '14:00',
    bracket: 'winners',
    result: {
      team1Score: 2,
      team2Score: 0,
      winner: 't1',
      completed: true
    }
  },
  {
    id: 'w1_2',
    round: 1,
    matchNumber: 2,
    team1: teams[4],
    team2: teams[5],
    date: '2024-02-24',
    time: '15:00',
    bracket: 'winners',
    result: {
      team1Score: 1,
      team2Score: 2,
      winner: 't6',
      completed: true
    }
  },
  {
    id: 'w1_3',
    round: 1,
    matchNumber: 3,
    team1: teams[2],
    team2: teams[7],
    date: '2024-02-24',
    time: '16:00',
    bracket: 'winners',
    result: {
      team1Score: 2,
      team2Score: 1,
      winner: 't3',
      completed: true
    }
  },
  {
    id: 'w1_4',
    round: 1,
    matchNumber: 4,
    team1: teams[3],
    team2: teams[6],
    date: '2024-02-24',
    time: '17:00',
    bracket: 'winners',
    result: {
      team1Score: 2,
      team2Score: 0,
      winner: 't4',
      completed: true
    }
  },

  // Winners Bracket Round 2
  {
    id: 'w2_1',
    round: 2,
    matchNumber: 5,
    team1: teams[0],
    team2: teams[5],
    date: '2024-02-25',
    time: '14:00',
    bracket: 'winners',
    result: {
      team1Score: 2,
      team2Score: 1,
      winner: 't1',
      completed: true
    }
  },
  {
    id: 'w2_2',
    round: 2,
    matchNumber: 6,
    team1: teams[2],
    team2: teams[3],
    date: '2024-02-25',
    time: '15:00',
    bracket: 'winners',
    result: {
      team1Score: 1,
      team2Score: 2,
      winner: 't4',
      completed: true
    }
  },

  // Winners Bracket Round 3 (Winners Final)
  {
    id: 'w3_1',
    round: 3,
    matchNumber: 7,
    team1: teams[0],
    team2: teams[3],
    date: '2024-02-26',
    time: '16:00',
    bracket: 'winners',
    result: {
      team1Score: 2,
      team2Score: 0,
      winner: 't1',
      completed: true
    }
  },

  // Losers Bracket Round 1
  {
    id: 'l1_1',
    round: 1,
    matchNumber: 8,
    team1: teams[9],
    team2: teams[4],
    date: '2024-02-25',
    time: '14:00',
    bracket: 'losers',
    result: {
      team1Score: 0,
      team2Score: 2,
      winner: 't5',
      completed: true
    }
  },
  {
    id: 'l1_2',
    round: 1,
    matchNumber: 9,
    team1: teams[7],
    team2: teams[6],
    date: '2024-02-25',
    time: '15:00',
    bracket: 'losers',
    result: {
      team1Score: 2,
      team2Score: 1,
      winner: 't8',
      completed: true
    }
  },

  // Losers Bracket Round 2
  {
    id: 'l2_1',
    round: 2,
    matchNumber: 10,
    team1: teams[4],
    team2: teams[5],
    date: '2024-02-26',
    time: '14:00',
    bracket: 'losers',
    result: {
      team1Score: 2,
      team2Score: 1,
      winner: 't5',
      completed: true
    }
  },
  {
    id: 'l2_2',
    round: 2,
    matchNumber: 11,
    team1: teams[7],
    team2: teams[2],
    date: '2024-02-26',
    time: '15:00',
    bracket: 'losers',
    result: {
      team1Score: 0,
      team2Score: 2,
      winner: 't3',
      completed: true
    }
  },

  // Losers Bracket Round 3 (Losers Semi-Final)
  {
    id: 'l3_1',
    round: 3,
    matchNumber: 12,
    team1: teams[4],
    team2: teams[2],
    date: '2024-02-27',
    time: '14:00',
    bracket: 'losers',
    result: {
      team1Score: 1,
      team2Score: 2,
      winner: 't3',
      completed: true
    }
  },

  // Losers Bracket Round 4 (Losers Final)
  {
    id: 'l4_1',
    round: 4,
    matchNumber: 13,
    team1: teams[2],
    team2: teams[3],
    date: '2024-02-28',
    time: '14:00',
    bracket: 'losers',
    result: {
      team1Score: 2,
      team2Score: 1,
      winner: 't3',
      completed: true
    }
  },

  // Grand Final
  {
    id: 'f1',
    round: 5,
    matchNumber: 14,
    team1: teams[0],
    team2: teams[2],
    date: '2024-02-29',
    time: '16:00',
    bracket: 'final',
    result: {
      team1Score: 3,
      team2Score: 1,
      winner: 't1',
      completed: true
    }
  }
];
