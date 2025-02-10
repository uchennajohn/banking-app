import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SplashScreen from "../../screens/SplashScreen";
import LoginScreen from "../../screens/LoginScreen";
import DashboardScreen from "../../screens/Dashboard";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Profile from "../../screens/Profile";
import Settings from "../../screens/Settings";
import React from "react";
import LogoutModal from "../LogoutModal";
import { useFonts } from "expo-font";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

interface User {
  id: string;
  name: string;
  avatar: string;
  //balance: Balance[];
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const MainStack = ({ navigation }: { navigation: any }) => {
  const [accountName, setAccountName] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const loggedInUser = useSelector((state: RootState) => state.user.name);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://67a758b6203008941f6756f1.mockapi.io/api/v1/users"
        );
        const user = response.data.find(
          (usr: { name: string }) => usr.name === loggedInUser
        );

        if (user) {
          setAccountName(user.name);
          setUserData(user || null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (loggedInUser) {
      fetchUser();
    }
  }, [loggedInUser]);

  const handleClose = () => {
    setModalVisible(false);
    navigation.navigate("AuthStack", { screen: "Login" });
  };

  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            headerTitle: () => (
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "black",
                }}
              >
                Hi, {accountName?.split(" ")[0] || "Dashboard"}
              </Text>
            ),
            headerRight: () => (
              <View
                style={{
                  flexDirection: "row",
                  marginRight: 15,
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {userData && (
                  <TouchableOpacity>
                    <Image
                      source={{ uri: userData?.avatar }}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 50,
                      }}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Feather name="log-out" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
      <LogoutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirmClose={handleClose}
      />
    </>
  );
};

function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DasboardDrawer"
        component={MainStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigation;
