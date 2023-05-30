import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppWrapper from "./src/features/app-wrapper/AppWrapper";

export default function App() {
  return (
    <AppWrapper>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </AppWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
