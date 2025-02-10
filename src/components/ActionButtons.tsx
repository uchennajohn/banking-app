import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  Entypo,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

const ActionButtons = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            borderRadius: 20,
            backgroundColor: "#bfdeec",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Entypo name="cycle" size={30} color="#164782" />
        </TouchableOpacity>
        <Text>To Switch</Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            borderRadius: 20,
            backgroundColor: "#bfdeec",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons name="bank" size={30} color="#164782" />
        </TouchableOpacity>
        <Text>To Bank</Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            borderRadius: 20,
            backgroundColor: "#bfdeec",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SimpleLineIcons name="wallet" size={30} color="#164782" />
        </TouchableOpacity>
        <Text>Withdraw</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ActionButtons;
