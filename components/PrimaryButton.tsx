import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, disabled }) => (
  <TouchableOpacity 
    style={[styles.button, disabled && styles.buttonDisabled]} 
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[styles.text, disabled && styles.textDisabled]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#555",
    opacity: 0.5,
  },
  text: {
    color: Colors.textDark,
    fontSize: 18,
    fontWeight: "700",
  },
  textDisabled: {
    color: "#999",
  },
});

export default PrimaryButton;
