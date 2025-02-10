import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import axios from "axios";

interface User {
  id: string;
  name: string;
  avatar: string;
  username: string;
  balance: Balance[];
}

interface Balance {
  currency: string;
  amount: number;
  symbol: string;
  accountNum: number;
}

const API_URL = "https://67a758b6203008941f6756f1.mockapi.io/api/v1/users";
const Profile = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const loggedInUser = useSelector((state: RootState) => state.user.name);

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<User[]>(API_URL);
        const user = data.find((user) => user?.name === loggedInUser);

        if (!user) {
          Alert.alert("No Data", "No bank account found for this user.");
        }

        setUserData(user || null);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch user data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (loggedInUser) {
      fetchUser();
    }
  }, [loggedInUser]);
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0066CC"
          style={{
            marginTop: "80%",
          }}
        />
      ) : userData ? (
        <>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              padding: 30,
            }}
          >
            <View>
              <Image source={{ uri: userData.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{userData.name}</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                //onPress={handleLogin}
                activeOpacity={0.2}
              >
                <Text style={styles.buttonText}>Reset password</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              marginHorizontal: "5%",
              alignItems: "center",
              marginTop: "5%",
              marginBottom: "5%",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 300 }}>Username :</Text>
            <Text
              style={{ fontSize: 20, fontWeight: 500, fontStyle: "italic" }}
            >
              {userData?.username}
            </Text>
          </View>
          <View>
            <FlatList
              data={userData.balance}
              keyExtractor={(item) => item.currency}
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginBottom: 20,
                    gap: 5,
                    marginHorizontal: "5%",
                    borderBottomColor: "black",
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 9,
                    backgroundColor: "#bfdeec",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 10,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 20, fontWeight: 300 }}>
                      Account Type:
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontStyle: "italic",
                        fontWeight: 500,
                      }}
                    >
                      {item?.currency} Account
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: 300 }}>
                      Account Number:
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontStyle: "italic",
                        fontWeight: 500,
                      }}
                    >
                      {item?.accountNum}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 20, fontWeight: 300 }}>
                      Amount:
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontStyle: "italic",
                        fontWeight: 500,
                      }}
                    >
                      {item.symbol}
                      {item?.amount}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </>
      ) : (
        <Text>No user Profile</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginBottom: 15,
    marginTop: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  button: {
    backgroundColor: "#0056B3",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: 500,
  },
});

export default Profile;
