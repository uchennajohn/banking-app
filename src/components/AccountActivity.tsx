import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const AccountActivity = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
      }}
    >
      <View style={styles.transactionItem}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            backgroundColor: "#bfdeec",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign name="gift" size={24} color="#164782" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.transactionText}>
            Bonus from airtime purchase
          </Text>
          <Text style={styles.dateText}>Feb 8th, 1:35PM</Text>
        </View>
        <Text style={[styles.amountText]}></Text>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 15, fontWeight: "600" }}>"+₦20</Text>
          <Text style={{ color: "#164782" }}>Successful</Text>
        </View>
      </View>
      <View style={styles.transactionItem}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            backgroundColor: "#bfdeec",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign name="creditcard" size={24} color="#164782" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.transactionText}>Airtime</Text>
          <Text style={styles.dateText}>Feb 8th, 1:35PM</Text>
        </View>
        <Text style={[styles.amountText]}></Text>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 15, fontWeight: "600" }}>"+₦2,000</Text>
          <Text style={{ color: "#164782" }}>Successful</Text>
        </View>
      </View>
      <View style={styles.transactionItem}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            backgroundColor: "#bfdeec",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign name="export" size={24} color="#164782" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.transactionText}>Transfer to Oluwale</Text>
          <Text style={styles.dateText}>Feb 10th, 2:53PM</Text>
        </View>
        <Text style={[styles.amountText]}></Text>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 15, fontWeight: "600" }}>"-₦15,000</Text>
          <Text style={{ color: "#164782" }}>Successful</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default AccountActivity;
