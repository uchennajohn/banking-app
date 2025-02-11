import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

const API_URL = "https://67a758b6203008941f6756f1.mockapi.io/api/v1/users";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => selectUserState(state));

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      return Alert.alert(
        "Empty/Incomplete login details",
        "Username and password are required."
      );
    }
    try {
      const { data: users } = await axios.get(API_URL);
      const matchingUser = users.find(
        (usr: { username: string; password: string }) =>
          usr.username === username && usr.password === password
      );

      if (matchingUser) {
        await AsyncStorage.setItem("userId", matchingUser.id);
        dispatch(login({ name: matchingUser.name }));
        navigation.navigate("DashboardDrawer");
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

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const fallBackToDefaultAuth = () => {
    console.log("No Finger biodata available, fall back to password ");
  };

  const alertComponent = (
    title: string,
    msg: string | undefined,
    btnTxt: string,
    btnFunc: { (): void; (): void }
  ) => {
    return Alert.alert(title, msg, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };

  const handleBiometricAuth = async () => {
    const isBiometricAuthAvailable =
      await LocalAuthentication.hasHardwareAsync();

    if (!isBiometricAuthAvailable) {
      return alertComponent(
        "Please manually enter your username and password",
        "Finger Authentication not supported on this device",
        "OK",
        () => fallBackToDefaultAuth()
      );
    }

    let supportedBiometrics;
    if (isBiometricAuthAvailable) {
      supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
    }
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();

    if (!savedBiometrics) {
      return alertComponent(
        "No finger print record found",
        "Please login with your username and password",
        "OK",
        () => fallBackToDefaultAuth()
      );
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with Biometric",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });

    if (biometricAuth.success) {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        try {
          const response = await axios.get(`${API_URL}/${storedUserId}`);
          const user = response.data;
          dispatch(login({ name: user.name }));
          navigation.navigate("DashboardDrawer");
        } catch (error) {
          Alert.alert("Error", "Failed to fetch user data.");
        }
      } else {
        Alert.alert("Error", "No user found. Please log in manually.");
      }
    }
  };

  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };

    checkBiometricSupport();
  }, []);

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
        <Text style={{ marginBottom: 4, fontSize: 15, color: "white" }}>
          Username
        </Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <Text style={{ marginBottom: 4, fontSize: 15, color: "white" }}>
          Password
        </Text>
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
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <TouchableOpacity
          onPress={handleBiometricAuth}
          style={{ marginHorizontal: "10%", paddingVertical: 12 }}
        >
          <View style={{ flexDirection: "row" }}>
            <Entypo
              name="fingerprint"
              size={20}
              color="white"
              style={{ marginRight: 3 }}
            />
            <Text style={{ fontSize: 14, color: "white" }}>Login with </Text>
            <Text style={{ fontSize: 14, color: "white", fontWeight: 800 }}>
              FingerPrint
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        activeOpacity={0.2}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
          borderBottomWidth: 1,
          paddingBottom: 10,
          marginHorizontal: "5%",
          borderColor: "gray",
        }}
      >
        <TouchableOpacity>
          <Text style={{ fontSize: 14, color: "white" }}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
          gap: 4,
        }}
      >
        <Text style={{ fontSize: 14, color: "white" }}>New to Switch?</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 14, color: "white", fontWeight: 800 }}>
            Sign up now.
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#164782",
    justifyContent: "center",
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
    padding: 30,
  },
  button: {
    backgroundColor: "#0056B3",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginHorizontal: "7%",
    height: 60,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
