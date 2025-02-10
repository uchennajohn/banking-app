import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

interface ATMProps {
  accountType?: string;
  current_amount?: number;
  money_symbol?: string;
  accountNum?: number;
}
const ATMCard = ({
  current_amount,
  accountType,
  money_symbol,
  accountNum,
}: ATMProps) => {
  const [showFullNumber, setShowFullNumber] = React.useState(false);

  const formattedAccountNumber = accountNum?.toString() || "12345678901234";
  const maskedNumber = showFullNumber
    ? formattedAccountNumber
    : `**** **** **** ${formattedAccountNumber.slice(-4)}`;
  return (
    <LinearGradient colors={["#141e30", "#243b55"]} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.bankName}>Interswitch</Text>
        <FontAwesome name="credit-card" size={24} color="white" />
      </View>

      <View style={styles.chipContainer}>
        <Image
          source={require("../../assets/images/chip.jpg")}
          style={styles.chip}
        />
      </View>

      <View style={styles.accountNumberContainer}>
        <Text style={styles.cardNumber}>{maskedNumber}</Text>
        <TouchableOpacity onPress={() => setShowFullNumber(!showFullNumber)}>
          <FontAwesome
            name={showFullNumber ? "eye-slash" : "eye"}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.accountType}>{accountType}</Text>
      <Text style={styles.balance}>
        {money_symbol}
        {current_amount}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 320,
    height: 180,
    borderRadius: 12,
    padding: 16,
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bankName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  chipContainer: {
    alignItems: "flex-start",
    marginVertical: 10,
  },
  chip: {
    width: 40,
    height: 30,
  },
  cardNumber: {
    color: "white",
    fontSize: 18,
    letterSpacing: 2,
  },
  accountType: {
    color: "white",
    fontSize: 14,
    opacity: 0.8,
  },
  balance: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  accountNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ATMCard;
