import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { deposit, withdraw } from "../../../../../balanceSlice";

const TestScreen = () => {
  const dispatch = useAppDispatch();
  const balance = useAppSelector((state) => state.balance.value);

  const onAddTen = () => {
    dispatch(deposit(10));
  };

  const onSubtractTen = () => {
    dispatch(withdraw(10));
  };

  return (
    <View style={styles.container}>
      <Text>Balance: {balance}</Text>
      <Pressable onPress={onAddTen}>
        <Text>Add 10</Text>
      </Pressable>
      <Pressable onPress={onSubtractTen}>
        <Text>Subtract 10</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default TestScreen;
