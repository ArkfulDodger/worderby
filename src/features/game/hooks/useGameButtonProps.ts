import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { RoundPhase } from "../enums";
import { useDispatch } from "react-redux";
import { startTurn } from "../../../store/slices/gameSlice";
import {
  selectActiveTurn,
  selectCanAttemptSubmit,
  selectCanStartTurn,
  selectGameLoading,
  selectRoundPhase,
} from "../gameSelectors";
import usePlayTurn from "./usePlayTurn";

// get props for the primary game button based on phase and state
const useGameButtonProps = () => {
  const dispatch = useDispatch();
  const phase = useAppSelector(selectRoundPhase);
  const loading = useAppSelector(selectGameLoading);
  const canAttemptSubmit = useAppSelector(selectCanAttemptSubmit);
  const canStartTurn = useAppSelector(selectCanStartTurn);
  const activeTurn = useAppSelector(selectActiveTurn);
  const { attemptWord } = usePlayTurn();

  const [newGameModalVisible, setNewGameModalVisible] = useState(false);
  const showNewGameModal = () => setNewGameModalVisible(true);
  const hideNewGameModal = () => setNewGameModalVisible(false);
  useEffect(() => {
    hideNewGameModal();
  }, [phase]);

  // the text to display on the button
  const buttonText = useMemo(() => {
    switch (phase) {
      case RoundPhase.PlayerTurn:
        return "SUBMIT";
      case RoundPhase.NewGame:
        return "BEGIN";
      case RoundPhase.OpponentTurn:
        return "CONTINUE";
      case RoundPhase.Results:
        return "PLAY AGAIN";
      default:
        return "LOADING";
    }
  }, [phase]);

  // the action to take when the button is pressed
  const onButtonPress = useCallback(() => {
    switch (phase) {
      case RoundPhase.PlayerTurn:
        onSubmitPress();
        break;
      case RoundPhase.OpponentTurn:
      case RoundPhase.NewGame:
        onStartPress();
        break;
      case RoundPhase.Results:
        onContinuePress();
        break;
      default:
        break;
    }
  }, [phase, activeTurn]);

  const isButtonDisabled = useMemo(() => {
    switch (phase) {
      case RoundPhase.PlayerTurn:
        return loading || !canAttemptSubmit;
      case RoundPhase.OpponentTurn:
        return loading || !canStartTurn;
      default:
        return loading;
    }
  }, [phase, loading, canAttemptSubmit, canStartTurn]);

  // TODO: submit button logic
  const onSubmitPress = () => attemptWord();

  // start next round on start press
  const onStartPress = () => dispatch(startTurn());

  // continue past the results screen to either quit or start a new game
  const onContinuePress = () => showNewGameModal();

  return {
    onButtonPress,
    isButtonDisabled,
    buttonText,
    newGameModalVisible,
    hideNewGameModal,
  };
};

export default useGameButtonProps;
