import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./RestrictionsBlock.styles";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectPlayWord, selectRestrictions } from "../../gameSelectors";
import { useEffect, useMemo, useState } from "react";
import useSelfReplacingTimeout from "../../../../hooks/useSelfReplacingTimeout";
import RestrictionTextItem, {
  RestrictionTextItemProps,
} from "../RestrictionTextItem";

type Props = {};

const RestrictionsBlock = ({}: Props) => {
  const styles = useStyles(createStyles);
  const restrictions = useAppSelector(selectRestrictions);
  const playWord = useAppSelector(selectPlayWord);
  const setRefreshMatchTimeout = useSelfReplacingTimeout();

  // the array of ending matches
  const [restritionItems, setRestrictionItems] = useState<
    RestrictionTextItemProps[]
  >([]);

  const getMatches = () => {
    let matches = restrictions
      .map<RestrictionTextItemProps>((r) => {
        if (playWord.endsWith(r))
          return {
            str: r,
            matchNum: Infinity,
          };

        for (let i = r.length - 1; i > 0; i--) {
          const substring = r.slice(0, i);
          if (playWord.endsWith(substring))
            return {
              str: r,
              matchNum: i,
            };
        }

        return {
          str: r,
          matchNum: 0,
        };
      })
      .sort((a, b) => b.matchNum - a.matchNum);

    return matches;
  };

  useEffect(() => {
    if (playWord !== undefined && playWord !== "") {
      setRefreshMatchTimeout(() => {
        const refreshedMatches = getMatches();
        setRestrictionItems(refreshedMatches);
      }, 300);
    } else {
      setRestrictionItems(
        restrictions.map<RestrictionTextItemProps>((r) => ({
          str: r,
          matchNum: 1,
        }))
      );
    }
  }, [playWord]);

  const blockedEndings = useMemo(
    () =>
      restritionItems
        .filter((item) => item.matchNum === Infinity)
        .map((props) => <RestrictionTextItem key={props.str} {...props} />),
    [restritionItems]
  );
  const regularEndings = useMemo(
    () =>
      restritionItems
        .filter((item) => item.matchNum < Infinity && item.matchNum > 0)
        .map((props) => <RestrictionTextItem key={props.str} {...props} />),
    [restritionItems]
  );
  const fadedEndings = useMemo(
    () =>
      restritionItems
        .filter((item) => item.matchNum === 0)
        .map((props) => <RestrictionTextItem key={props.str} {...props} />),
    [restritionItems]
  );

  return (
    <View>
      <View style={styles.list}>{blockedEndings}</View>
      <View style={styles.list}>{regularEndings}</View>
      <View style={styles.list}>{fadedEndings}</View>
    </View>
  );
};

export default RestrictionsBlock;
