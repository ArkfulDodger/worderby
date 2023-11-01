import { Turn } from "../reducers/gameReducer";

export const getWorderbyte = (startingWord: string, turns: Turn[]) => {
  // set the worderbyte as the starting word
  let worderbyte = startingWord;

  // for each turn, add the new letters to the worderbyte
  for (let i = 0; i < turns.length; i++) {
    const { word, pNum } = turns[i];
    worderbyte = `${worderbyte}${word.slice(pNum)}`;
  }

  return worderbyte;
};
