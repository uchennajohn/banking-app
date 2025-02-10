// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//});

import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LoginScreen from "./src/screens/LoginScreen";
import { store } from "./src/Redux/store";
import DashboardScreen from "./src/screens/Dashboard";
import AppNavigation from "./src/components/navigation/AppStack";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        </Drawer.Navigator> */}
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
