import React from "react";
import { StyleSheet, View, Text } from "react-native";

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Notification</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotificationScreen;
