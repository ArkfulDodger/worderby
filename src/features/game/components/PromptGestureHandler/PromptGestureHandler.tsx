import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { ReactNode, useMemo, useState } from "react";
import metrics from "../../../../utils/metrics";

export type Props = {
  children?: ReactNode;
  promptLength: number;
  pIndex: number;
  updatePromptInput: (index: number) => void;
  // focusInput: () => void;
};

// max/min pixels a user can swipe to change letters, regardless of word length
const MAX_PPL = 40;
const MIN_PPL = 10;

const PromptGestureHandler = ({
  children,
  pIndex,
  promptLength,
  updatePromptInput,
}: // focusInput,
Props) => {
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
    updatePromptInput(pIndex);
    setPIndexStart(pIndex);
  };

  // // focus the player input after a gesure has been performed
  // const onEnded = () => {
  //   focusInput();
  // };

  // how to handle the pan gesture over the prompt
  const onGestureEvent = (
    event: GestureEvent<PanGestureHandlerEventPayload>
  ) => {
    const { translationX } = event.nativeEvent;
    const indexChange = Math.floor(translationX / pixelPerLetter);
    const targetIndex = pIndexStart + indexChange;

    // console.log(
    //   "ppl:",
    //   pixelPerLetter,
    //   "| indexChange:",
    //   indexChange,
    //   "| targetIndex:",
    //   targetIndex,
    //   "| transX:",
    //   translationX
    // );

    // clamp target pIndex
    if (targetIndex < 0) {
      setPIndexStart((prev) => prev + 1);
      updatePromptInput(0);
    } else if (targetIndex > promptLength - 1) {
      setPIndexStart((prev) => prev - 1);
      updatePromptInput(promptLength - 1);
    } else {
      updatePromptInput(targetIndex);
    }
  };

  return (
    <PanGestureHandler
      onBegan={onBegan}
      // onEnded={onEnded}
      onGestureEvent={onGestureEvent}
    >
      {children}
    </PanGestureHandler>
  );
};

export default PromptGestureHandler;
