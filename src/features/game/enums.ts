export enum RoundPhase {
  NewGame,
  PlayerTurn,
  OpponentTurn,
  Results,
}

export enum GameMode {
  Demo,
  Casual,
  Competitive,
}
export enum GameEndType {
  Completed = 1,
  PlayerQuit,
  OpponentQuit,
  Unknown,
}

export enum GameResult {
  Ongoing,
  Win,
  Lose,
  Draw,
  PlayerQuit,
  OpponentQuit,
  Unknown,
}
