import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import ATMCard from "../components/AtmCard";
import AntDesign from "@expo/vector-icons/AntDesign";
import ActionButtons from "../components/ActionButtons";
import SubActionButtons from "../components/SubActionButtons";
import AccountActivity from "../components/AccountActivity";
import LogoutModal from "../components/LogoutModal";

interface Balance {
  currency: string;
  amount: number;
  symbol: string;
  accountNum: number;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  balance: Balance[];
}

const API_URL = "https://67a758b6203008941f6756f1.mockapi.io/api/v1/users";

const DashboardScreen = ({ navigation }: { navigation: any }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const loggedInUser = useSelector((state: RootState) => state?.user?.name);
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

  const flatListRef = React.useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!userData?.balance?.length) return;

      setCurrentIndex((prevIndex) => {
        let nextIndex = prevIndex + 1;
        if (nextIndex >= userData.balance.length) {
          nextIndex = 0;
        }

        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });

        return nextIndex;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [userData?.balance?.length]);

  const handleClose = () => {
    setModalVisible(false);
    navigation.navigate("AuthStack", { screen: "Login" });
  };

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
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginBottom: "6%",
              }}
            >
              <Text
                style={{ fontSize: 13, color: "#164782", fontWeight: "500" }}
              >
                Transaction History
              </Text>
              <AntDesign name="right" size={10} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              ref={flatListRef}
              data={userData.balance}
              keyExtractor={(item) => item.currency}
              horizontal
              nestedScrollEnabled={true}
              style={{ gap: 10 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <>
                  <ATMCard
                    current_amount={item?.amount}
                    accountType={item?.currency}
                    money_symbol={item?.symbol}
                    accountNum={item?.accountNum}
                  />
                </>
              )}
            />
            <View style={{ marginBottom: 20 }} />
            <AccountActivity />
            <ActionButtons />
            <SubActionButtons />
          </ScrollView>
        </>
      ) : (
        <Text style={styles.noDataText}>No account found</Text>
      )}
      <LogoutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirmClose={handleClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  balanceItem: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  balanceText: {
    fontSize: 18,
    color: "black",
  },
  noDataText: {
    fontSize: 18,
    color: "gray",
    marginTop: 20,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  transactionText: {
    fontSize: 14,
    fontWeight: 300,
    color: "black",
  },
  dateText: {
    fontSize: 12,
    color: "gray",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: "#0066CC",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DashboardScreen;
