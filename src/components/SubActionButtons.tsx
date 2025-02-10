import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const SubActionButtons = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: "column",
      }}
    >
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
            <MaterialCommunityIcons name="cards" size={30} color="#164782" />
          </TouchableOpacity>
          <Text style={{}}>Airtime </Text>
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
            <MaterialIcons name="open-in-browser" size={30} color="#164782" />
          </TouchableOpacity>
          <Text style={{}}>Data</Text>
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
            <Ionicons name="football" size={30} color="#164782" />
          </TouchableOpacity>
          <Text style={{}}>Betting</Text>
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
            <FontAwesome name="tv" size={30} color="#164782" />
          </TouchableOpacity>
          <Text style={{}}>TV</Text>
        </View>
      </View>
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
            <MaterialCommunityIcons
              name="safe-square-outline"
              size={30}
              color="#164782"
            />
          </TouchableOpacity>
          <Text style={{}}>SafeBox</Text>
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
            <MaterialIcons name="paid" size={30} color="#164782" />
          </TouchableOpacity>
          <Text style={{}}>Loan</Text>
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
            <MaterialIcons name="directions-run" size={30} color="#164782" />
          </TouchableOpacity>
          <Text style={{}}>Invitation</Text>
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
            <MaterialCommunityIcons
              name="skew-more"
              size={30}
              color="#164782"
            />
          </TouchableOpacity>
          <Text style={{}}>More</Text>
        </View>
      </View>
    </View>
  );
};

export default SubActionButtons;
