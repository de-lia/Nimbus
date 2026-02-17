import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import { Colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../contexts/UserContext";

const avatars = [
  require("../assets/avatars/avatar1.png"),
  require("../assets/avatars/avatar2.png"),
  require("../assets/avatars/avatar3.png"),
  require("../assets/avatars/avatar4.png"),
  require("../assets/avatars/avatar5.png"),
  require("../assets/avatars/avatar6.png"),
];

const CreateProfileStep2Screen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { updateUser } = useUser();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(0);
  const [goal, setGoal] = useState(10);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleBegin = async () => {
    // Save avatar and preferences
    await updateUser({
      avatarUrl: `avatar${selectedAvatar !== null ? selectedAvatar + 1 : 1}`,
      dailyGoal: goal,
      notificationsEnabled,
    });

    // Reset stack and navigate directly to the Dashboard
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "MainApp",
          state: {
            routes: [{ name: "Home" }],
          },
        },
      ],
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "100%" }]} />
          </View>
          <Text style={styles.stepText}>Step 3 of 3</Text>
        </View>

        {/* Header */}
        <Text style={styles.title}>You're all set!</Text>
        <Text style={styles.subtitle}>🎉 Let's personalize your journey!</Text>

        {/* Avatar Selection */}
        <Text style={styles.sectionTitle}>Choose your avatar</Text>
        <View style={styles.avatarContainer}>
          {avatars.map((src, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedAvatar(index)}
              style={[
                styles.avatarWrapper,
                selectedAvatar === index && styles.avatarSelected,
              ]}
            >
              <Image source={src} style={styles.avatarImage} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily Goal */}
        <Text style={styles.sectionTitle}>Set your daily goal</Text>
        <View style={styles.goalContainer}>
          <Text style={styles.goalValue}>{goal}</Text>
          <Text style={styles.goalLabel}>min / day</Text>
        </View>

        <Slider
          style={styles.slider}
          minimumValue={5}
          maximumValue={60}
          step={5}
          minimumTrackTintColor={Colors.accent}
          maximumTrackTintColor="#3b3b3b"
          thumbTintColor={Colors.accent}
          value={goal}
          onValueChange={setGoal}
        />

        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>5 min</Text>
          <Text style={styles.sliderLabel}>60 min</Text>
        </View>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>Stay on track with notifications</Text>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Push Notifications</Text>
          <Switch
            trackColor={{ false: "#3b3b3b", true: Colors.accent }}
            thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}
            onValueChange={setNotificationsEnabled}
            value={notificationsEnabled}
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.button} onPress={handleBegin}>
          <Text style={styles.buttonText}>Begin Your Adventure</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateProfileStep2Screen;

const styles = StyleSheet.create({
  progressContainer: {
    paddingTop: 20,
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#333",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.accent,
  },
  stepText: {
    color: "#aaa",
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 30,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  avatarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  avatarWrapper: {
    borderWidth: 3,
    borderColor: "transparent",
    borderRadius: 60,
    padding: 2,
  },
  avatarSelected: {
    borderColor: Colors.accent,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  goalContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  goalValue: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "700",
  },
  goalLabel: {
    color: "#aaa",
    fontSize: 18,
    marginLeft: 6,
  },
  slider: {
    width: "100%",
    height: 40,
    marginTop: 10,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sliderLabel: {
    color: "#aaa",
    fontSize: 14,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1a2732",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  toggleLabel: {
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#232F3E",
    fontSize: 18,
    fontWeight: "700",
  },
});
