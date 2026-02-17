import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";

interface InputFieldProps {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.muted}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", marginBottom: 20 },
  label: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: 15,
    color: Colors.textPrimary,
    fontSize: 16,
  },
});

export default InputField;
