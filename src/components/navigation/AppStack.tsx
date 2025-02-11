import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "../../screens/SplashScreen";
import LoginScreen from "../../screens/LoginScreen";
import DashboardScreen from "../../screens/Dashboard";
import Profile from "../../screens/Profile";
import Settings from "../../screens/Settings";
import NotificationScreen from "../../screens/NotificationScreen";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

interface User {
  id: string;
  name: string;
  avatar: string;
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

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size, focused }) => {
        let iconName: keyof typeof Ionicons.glyphMap | undefined;
        switch (route.name) {
          case "Home":
            iconName = focused ? "home" : "home-outline";
            break;
          case "Profile":
            iconName = focused ? "person" : "person-outline";
            break;
          case "Settings":
            iconName = focused ? "settings" : "settings-outline";
            break;
        }
        return <Ionicons name={iconName} size={25} color={color} />;
      },
      tabBarLabel: ({ children, color, focused }) => (
        <Text
          style={{
            fontSize: 10,
            color,
            fontWeight: focused ? "600" : "normal",
          }}
        >
          {children}
        </Text>
      ),
      tabBarStyle: styles.tabBarStyle,
      tabBarItemStyle: styles.tabBarItemsStyle,
      tabBarActiveTintColor: "#bfdeec",
      tabBarInactiveTintColor: "black",
      headerStyle: styles.headerStyle,
    })}
  >
    <Tab.Screen
      name="Home"
      component={DashboardScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

const MainDrawer = ({ navigation }: { navigation: any }) => {
  const [accountName, setAccountName] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const loggedInUser = useSelector((state: RootState) => state.user.name);

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
          setUserData(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (loggedInUser) {
      fetchUser();
    }
  }, [loggedInUser]);

  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={BottomTabs}
          options={{
            headerTitle: () => (
              <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>
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
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
                {userData?.avatar && (
                  <TouchableOpacity>
                    <Image
                      source={{ uri: userData.avatar }}
                      style={{ width: 30, height: 30, borderRadius: 50 }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ),
          }}
        />
        <Drawer.Screen name="Notifications" component={NotificationScreen} />
      </Drawer.Navigator>
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
        name="DashboardDrawer"
        component={MainDrawer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    backgroundColor: "#164782",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 40,
    borderTopWidth: 0,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  tabBarItemsStyle: {
    paddingVertical: 10,
    margin: 10,
    borderRadius: 40,
  },
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: "transparent",
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default AppNavigation;
