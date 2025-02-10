import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";

const SplashScreen = ({ navigation }: { navigation: any }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/splashImage.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Image
          source={require("../../assets/images/switch.png")}
          style={{ width: "80%", height: 85, margin: 50 }}
        />

        <View style={{ marginLeft: 50, marginTop: 30, marginRight: 10 }}>
          <Text style={styles.text}></Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontFamily: "OpenSans-Regular",
  },
});
