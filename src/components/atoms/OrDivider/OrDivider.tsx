import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import useStyles from "../../../hooks/useStyles";
import { createStyles } from "./OrDivider.styles";
import { Divider, Text } from "react-native-paper";

type Props = {
  style?: StyleProp<ViewStyle>;
  dividerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const OrDivider = ({ style, dividerStyle, textStyle }: Props) => {
  const styles = useStyles(createStyles);

  return (
    <View style={[styles.row, style]}>
      <Divider style={[styles.divider, dividerStyle]} />
      <Text style={textStyle}>or</Text>
      <Divider style={[styles.divider, dividerStyle]} />
    </View>
  );
};

export default OrDivider;
