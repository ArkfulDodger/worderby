import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import useSelfReplacingTimeout from "../../../hooks/useSelfReplacingTimeout";
import { selectPlayWord, selectRestrictions } from "../gameSelectors";
import RestrictionTextItem, {
  RestrictionTextItemProps,
} from "../components/RestrictionTextItem";

// take the current restrictions and player input, and generate text component lists
// to display in the restricted endings header area
const useRestrictionLists = () => {
  const restrictions = useAppSelector(selectRestrictions);
  const playWord = useAppSelector(selectPlayWord);
  const setRefreshMatchTimeout = useSelfReplacingTimeout();

  // the array of restricted endings with how they match the current play word input
  const [restritionItems, setRestrictionItems] = useState<
    RestrictionTextItemProps[]
  >([]);

  // assess each of the restrictions against the play word
  const getMatches = useCallback(
    (playWord: string) => {
      let matches = restrictions
        .map<RestrictionTextItemProps>((r) => {
          // flag any ending which perfectly matches the play word with Infinity
          if (playWord.endsWith(r))
            return {
              str: r,
              matchNum: Infinity,
            };
  
          // assign a match num to other endings based on how many characters match
          for (let i = r.length - 1; i > 0; i--) {
            const substring = r.slice(0, i);
            if (playWord.endsWith(substring))
              return {
                str: r,
                matchNum: i,
              };
          }
  
          // return a match num of 0 if the ending has no overlap with the play word
          return {
            str: r,
            matchNum: 0,
          };
        })
        .sort((a, b) => b.matchNum - a.matchNum);
  
      return matches;
    },
    [restrictions],
  )

  // when the play word input changes, update the restriction match array
  useEffect(() => {
    if (playWord !== undefined && playWord !== "") {
      // assess the matches on a delay in case the user is rapidly typing
      setRefreshMatchTimeout(() => {
        const refreshedMatches = getMatches(playWord);
        setRestrictionItems(refreshedMatches);
      }, 300);
    } else {
      // if no player input, all endings are assigned a value of 1
      setRestrictionItems(
        restrictions.map<RestrictionTextItemProps>((r) => ({
          str: r,
          matchNum: 1,
        }))
      );
    }
  }, [playWord]);

  // the text components for endings currently blocking play word submission
  const blockedEndings = restritionItems
    .filter((item) => item.matchNum === Infinity)
    .map((props) => <RestrictionTextItem key={props.str} {...props} />);

  // text components for endings of normal relevance to the user
  const regularEndings = restritionItems
    .filter((item) => item.matchNum < Infinity && item.matchNum > 0)
    .map((props) => <RestrictionTextItem key={props.str} {...props} />);

  // text components for endings not relevant to the user's current play word
  const fadedEndings = restritionItems
    .filter((item) => item.matchNum === 0)
    .map((props) => <RestrictionTextItem key={props.str} {...props} />);

  return {
    blockedEndings,
    regularEndings,
    fadedEndings,
  };
};

export default useRestrictionLists;
