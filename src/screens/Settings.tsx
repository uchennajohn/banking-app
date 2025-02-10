import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LogoutModal from "../components/LogoutModal";

interface User {
  id: string;
  name: string;
  avatar: string;
  username: string;
}

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const [isBiometricEnabled, setIsBiometricEnabled] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const handleClose = () => {
    setModalVisible(false);
    navigation.navigate("AuthStack", { screen: "Login" });
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <SettingsItem title="Change PIN" icon="lock" onPress={() => {}} />
          <SettingsItem
            title="Enable Biometric Login"
            icon="fingerprint"
            isSwitch
            switchValue={isBiometricEnabled}
            onToggle={(value) => setIsBiometricEnabled(value)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <SettingsItem
            title="Currency"
            icon="attach-money"
            onPress={() => {}}
          />
          <SettingsItem
            title="Notifications"
            icon="notifications"
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingsItem title="Help Center" icon="help" onPress={() => {}} />
          <SettingsItem
            title="Terms & Conditions"
            icon="article"
            onPress={() => {}}
          />
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <LogoutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirmClose={handleClose}
      />
    </>
  );
};
const SettingsItem = ({
  title,
  icon,
  onPress,
  isSwitch = false,
  switchValue,
  onToggle,
}: {
  title: string;
  icon: string;
  onPress?: () => void;
  isSwitch?: boolean;
  switchValue?: boolean;
  onToggle?: (value: boolean) => void;
}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} disabled={isSwitch}>
      <MaterialIcons name={icon as any} size={24} color="black" />
      <Text style={styles.itemText}>{title}</Text>
      {isSwitch ? (
        <Switch value={switchValue} onValueChange={onToggle} />
      ) : (
        <AntDesign name="right" size={16} color="gray" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#164782",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#d9534f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
