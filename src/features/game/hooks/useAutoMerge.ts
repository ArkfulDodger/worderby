import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useSelfReplacingTimeout from "../../../hooks/useSelfReplacingTimeout";
import { handlePromptInput, setWordInput } from "../../../reducers/gameReducer";
import { selectPrompt, selectWordInput } from "../gameSelectors";

// handle logic for determining if updated word input is a swipe/voice entry which
// should be checked for auto merger with the prompt
const useAutoMerge = () => {
  const dispatch = useAppDispatch();
  const wordInput = useAppSelector(selectWordInput);
  const prompt = useAppSelector(selectPrompt);
  const setSRTimeout = useSelfReplacingTimeout();

  // adjust word input into a compatible prompt portion (for voice typing)
  const autoMerge = (str?: string) => {
    let text = str || wordInput || "";

    for (let i = 1; i < prompt.length; i++) {
      const possiblePrompt = prompt.slice(i);
      if (text.startsWith(possiblePrompt)) {
        dispatch(handlePromptInput(i));
        dispatch(setWordInput(text.slice(possiblePrompt.length)));
        return;
      }
    }
  };

  const checkInputForAutoMerge = (incomingInput: string) => {
    // assume an input change of more than one letter at a time might be a whole word
    if (Math.abs(incomingInput.length - (wordInput?.length || 0)) > 1) {
      setSRTimeout(() => autoMerge(incomingInput), 300);
    }
  };

  return { checkInputForAutoMerge };
};

export default useAutoMerge;
