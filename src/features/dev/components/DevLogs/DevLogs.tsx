import { View } from "react-native";
import useStyles from "../../../../hooks/useStyles";
import { createStyles } from "./DevLogs.styles";
import { Text } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectDevLogs } from "../../../../store/slices/systemSlice";

type Props = {};

const DevLogs = ({}: Props) => {
  const styles = useStyles(createStyles);
  const devLogs = useAppSelector(selectDevLogs);

  return (
    <View>
      <Text>Logs</Text>
      <View style={styles.frame}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {devLogs.map((log, i) => (
            <Text numberOfLines={2} key={i.toString()}>
              {log}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default DevLogs;
