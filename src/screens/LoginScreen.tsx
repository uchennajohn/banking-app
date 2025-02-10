import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, selectUserState } from "../Redux/userSlice";
import { RootState } from "../Redux/store";
import { Entypo } from "@expo/vector-icons";

const API_URL = "https://67a758b6203008941f6756f1.mockapi.io/api/v1/users";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => selectUserState(state));

  const handleLogin = async () => {
    try {
      const { data: users } = await axios.get(API_URL);
      const matchingUser = users.find(
        (usr: { username: string; password: string }) =>
          usr.username === username && usr.password === password
      );

      if (matchingUser) {
        dispatch(login({ name: matchingUser.name }));
        navigation.navigate("DasboardDrawer");
      } else {
        Alert.alert("Login failed", "Invalid credentials.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch users.");
      console.error(error);
    }
  };
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 16) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/app-logo-white-bg.webp")}
        style={{
          width: 60,
          height: 60,
          borderRadius: 200,
          position: "absolute",
          top: "10%",
          left: "5%",
        }}
      />
      <View style={styles.greetingsContainer}>
        {user.loggedIn && <Text style={styles.greeting}>{getGreeting()},</Text>}
        {user.loggedIn && <Text style={styles.name}>{user.name}</Text>}
        {user.loggedIn && <Text style={styles.greeting}>Welcome back</Text>}

        {!user.loggedIn && (
          <Text
            style={{
              fontSize: 38,
              fontWeight: "500",
              color: "#FFDAB9",
              fontStyle: "italic",
            }}
          >
            Welcome!
          </Text>
        )}
        {!user.loggedIn && (
          <Text style={{ fontSize: 18, color: "white", fontWeight: "400" }}>
            Please login to enjoy premium banking experience with Switch
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <View
          style={[
            styles.input,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <TextInput
            placeholder={"Password"}
            secureTextEntry={passwordVisible}
            onChangeText={setPassword}
            value={password}
            keyboardAppearance="light"
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Entypo
              name={passwordVisible ? "eye" : "eye-with-line"}
              size={20}
              style={styles.passIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        activeOpacity={0.2}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#164782",
    justifyContent: "center",
    //height: "100%",
  },
  input: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  passIcon: {
    marginLeft: "auto",
  },
  greetingsContainer: {
    marginHorizontal: 30,
    marginTop: "0%",
  },
  greeting: {
    fontSize: 30,
    textAlign: "left",
    color: "#ffffff",
    fontFamily: "Inter_400Regular",
  },
  name: {
    fontSize: 40,
    color: "#FFB74D",
    fontWeight: "500",
  },
  inputContainer: {
    marginTop: "0%",
    justifyContent: "center",
    padding: 30,
  },
  button: {
    backgroundColor: "#0056B3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginHorizontal: "10%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
