// raw data from the back end

import { GameMode } from "./enums";

export type RawWorderbotData = {
  version: number;
  title: string;
  avatar?: string;
};

export type RawPlayerData = {
  id: string;
  name: string;
  avatar?: string;
  bot_version?: number;
};

export type RawGameData = {
  id: number;
  mode: GameMode;
  is_single_player: boolean;
  player1_id: string;
  player2_id: string;
  starting_word: string;
  initial_restrictions: string[];
};

export type RawTurnData = {
  id: number;
  game_id: number;
  player_id: string;
  turn_number: number;
  started_at: Date;
  played_at: Date;
  word: string;
  p_num: number;
  raw_score: number;
  penalty?: number;
};
