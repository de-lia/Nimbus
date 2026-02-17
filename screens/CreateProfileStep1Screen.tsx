import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";
import PrimaryButton from "../components/PrimaryButton";
import InputField from "../components/InputField";
import { useUser } from "../contexts/UserContext";

interface Props {
  navigation: any;
}

const CreateProfileStep1Screen: React.FC<Props> = ({ navigation }) => {
  const [selectedPath, setSelectedPath] = useState<"role" | "service" | null>(null);
  const [username, setUsername] = useState("");
  const { updateUser } = useUser();

  const handleContinue = async () => {
    if (!selectedPath) return;
    
    // Update user with username and selected path
    await updateUser({ 
      name: username || "Learner",
      mode: selectedPath 
    });
    
    // Navigate to role/service selection based on path
    if (selectedPath === "role") {
      navigation.navigate("SelectRole");
    } else {
      navigation.navigate("SelectService");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Progress bar */}
        <View style={styles.progressWrapper}>
          <View style={styles.progressBackground}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>Step 1 of 2</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Create Your Profile</Text>

        {/* Profile Avatar - Commented out as we have avatars in Step 2 */}
        {/* <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDlfSMLI7vKMM-qpMP3jow8zVXMlzJ33-I03Er238BJ3Kus8ReTjZQzHDs8WjavIQqWlvJme5Pe5u0nIHWtccO3g8mZ68IF0mL999WnkkeLpw5OLiu2euh5J-UfFkVJRW35X0iomVZ7McH1AeU6LUgljj4ZxyugqLLdbI8BILenGBkiov9grU3GVEuD638lD_6ud1fAMh76wCXuyP_5ZKoSL-qoCBLNm9RYI1kOSL0vw_566_kMwFnbkOaKXk68P3XivCdIUOOEw",
              }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.addPhotoButton}>
              <Text style={styles.addPhotoIcon}>📸</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        {/* Username input */}
        <InputField 
          label="Username" 
          placeholder="Choose a username"
          value={username}
          onChangeText={setUsername}
        />

        {/* Learning Path Selection */}
        <Text style={styles.sectionTitle}>Choose Your Learning Path</Text>
        <TouchableOpacity onPress={() => navigation.navigate("LearningPathInfo")}>
          <Text style={styles.infoLink}>Which path is right for me?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionCard,
            selectedPath === "role" && styles.optionSelected,
          ]}
          onPress={() => setSelectedPath("role")}
        >
          <View style={styles.optionIcon}>
            <Text style={styles.optionEmoji}>💼</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionTitle}>Learn by Job Role</Text>
            <Text style={styles.optionDescription}>
              Master the skills for specific tech roles like Cloud Practitioner or
              Solutions Architect.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionCard,
            selectedPath === "service" && styles.optionSelected,
          ]}
          onPress={() => setSelectedPath("service")}
        >
          <View style={styles.optionIcon}>
            <Text style={styles.optionEmoji}>⚙️</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionTitle}>Learn by Service</Text>
            <Text style={styles.optionDescription}>
              Deep dive into individual AWS services like S3, EC2, or Lambda.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Continue button */}
        <PrimaryButton 
          title="Continue" 
          onPress={handleContinue}
          disabled={!selectedPath || !username.trim()}
        />

        {/* Footer link */}
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("CreateProfileStep2")}
          >
            Log In
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  progressWrapper: { alignItems: "center", marginBottom: 20 },
  progressBackground: {
    width: "90%",
    height: 6,
    borderRadius: 10,
    backgroundColor: "#444",
    overflow: "hidden",
  },
  progressFill: {
    width: "50%",
    height: "100%",
    backgroundColor: Colors.accent,
  },
  progressText: {
    color: Colors.muted,
    marginTop: 6,
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 24,
  },
  avatarSection: { alignItems: "center", marginBottom: 30 },
  avatarWrapper: { position: "relative" },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#444",
  },
  addPhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.accent,
    borderRadius: 20,
    padding: 6,
  },
  addPhotoIcon: { fontSize: 20, color: "#fff" },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "center",
    marginTop: 10,
  },
  infoLink: {
    color: Colors.accent,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
    marginTop: 5,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 16,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#444",
    backgroundColor: Colors.backgroundDark,
    marginBottom: 14,
  },
  optionSelected: {
    borderColor: Colors.accent,
    backgroundColor: "#2a2a2a",
  },
  optionIcon: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  optionEmoji: { fontSize: 24 },
  optionTitle: {
    fontWeight: "700",
    color: Colors.textPrimary,
    fontSize: 16,
    marginBottom: 4,
  },
  optionDescription: {
    color: Colors.muted,
    fontSize: 13,
  },
  footerText: {
    color: Colors.muted,
    textAlign: "center",
    marginTop: 24,
  },
  linkText: { color: Colors.accent, fontWeight: "700" },
});

export default CreateProfileStep1Screen;
