import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export default function QuoteCard({ quote }: { quote: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{quote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: Colors.awsNavy,
    fontWeight: "500",
  },
});
