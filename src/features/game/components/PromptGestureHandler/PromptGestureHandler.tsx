import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { ReactNode, useMemo, useState } from "react";
import metrics from "../../../../utils/metrics";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { selectPIndex, selectPrompt } from "../../gameSelectors";
import { handlePromptInput } from "../../../../store/slices/gameSlice";

type Props = {
  children?: ReactNode;
};

// max/min pixels a user can swipe to change letters, regardless of word length
const MAX_PPL = 60;
const MIN_PPL = 10;

const PromptGestureHandler = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const promptLength = useAppSelector(selectPrompt).length;
  const pIndex = useAppSelector(selectPIndex);

  // how many pixels to gesture before panning to the next letter
  // should be able to pan whole word in half the screen length
  const pixelPerLetter = useMemo(() => {
    let ppl = Math.round((metrics.screenWidth / (promptLength - 1)) * 0.5);
    return Math.min(MAX_PPL, Math.max(MIN_PPL, ppl));
  }, [promptLength]);

  // the index against which to measure index changes
  const [pIndexStart, setPIndexStart] = useState<number>(pIndex);

  // anchor the starting index at the start of the pan gesture
  const onBegan = () => {
    dispatch(handlePromptInput(pIndex)); // set input to current effective index (if input previously out of bounds)
    setPIndexStart(pIndex); // ensure the starting index is set to the current effective index
  };

  // how to handle the pan gesture over the prompt
  const onGestureEvent = (
    event: GestureEvent<PanGestureHandlerEventPayload>
  ) => {
    const { translationX } = event.nativeEvent;
    const indexChange = Math.floor(translationX / pixelPerLetter);
    const targetIndex = pIndexStart + indexChange;

    // clamp target pIndex
    if (targetIndex < 0) {
      setPIndexStart((prev) => prev + 1); // offset starting index so gesture right begins immediately
      dispatch(handlePromptInput(0)); // clamp input to 0
    } else if (targetIndex > promptLength - 1) {
      setPIndexStart((prev) => prev - 1); // offset starting index so gesture left begins immediately
      dispatch(handlePromptInput(promptLength - 1)); // clamp input so last letter remains selected
    } else {
      dispatch(handlePromptInput(targetIndex));
    }
  };

  return (
    <PanGestureHandler onBegan={onBegan} onGestureEvent={onGestureEvent}>
      {children}
    </PanGestureHandler>
  );
};

export default PromptGestureHandler;
