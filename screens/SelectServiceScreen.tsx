import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";
import PrimaryButton from "../components/PrimaryButton";
import { useUser } from "../contexts/UserContext";

const services = [
  {
    id: "s3",
    title: "Amazon S3",
    description: "Object storage built to store and retrieve any amount of data",
    icon: "🪣",
  },
  {
    id: "ec2",
    title: "Amazon EC2",
    description: "Secure and resizable compute capacity in the cloud",
    icon: "🖥️",
  },
  {
    id: "lambda",
    title: "AWS Lambda",
    description: "Run code without thinking about servers",
    icon: "⚡",
  },
  {
    id: "rds",
    title: "Amazon RDS",
    description: "Managed relational database service",
    icon: "🗄️",
  },
  {
    id: "dynamodb",
    title: "Amazon DynamoDB",
    description: "Fast and flexible NoSQL database service",
    icon: "📊",
  },
  {
    id: "sagemaker",
    title: "Amazon SageMaker",
    description: "Build, train, and deploy machine learning models",
    icon: "🤖",
  },
];

interface Props {
  navigation: any;
  route: any;
}

const SelectServiceScreen: React.FC<Props> = ({ navigation, route }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { setLearningPath } = useUser();
  const returnTo = route?.params?.returnTo;

  const handleContinue = async () => {
    if (!selectedService) return;
    
    await setLearningPath("service", selectedService);
    if (returnTo === "MainApp") {
      navigation.navigate("MainApp");
    } else {
      navigation.navigate("CreateProfileStep2");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Progress bar */}
        <View style={styles.progressWrapper}>
          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: "66%" }]} />
          </View>
          <Text style={styles.progressText}>Step 2 of 3</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Choose Your Service</Text>
        <Text style={styles.subtitle}>
          Select the AWS service you want to master first
        </Text>

        {/* Service Cards */}
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.serviceCard,
              selectedService === service.id && styles.serviceSelected,
            ]}
            onPress={() => setSelectedService(service.id)}
          >
            <View style={styles.serviceIcon}>
              <Text style={styles.serviceEmoji}>{service.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Continue button */}
        <PrimaryButton
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedService}
        />
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.muted,
    textAlign: "center",
    marginBottom: 24,
  },
  serviceCard: {
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
  serviceSelected: {
    borderColor: Colors.accent,
    backgroundColor: "#2a2a2a",
  },
  serviceIcon: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceEmoji: { fontSize: 24 },
  serviceTitle: {
    fontWeight: "700",
    color: Colors.textPrimary,
    fontSize: 16,
    marginBottom: 4,
  },
  serviceDescription: {
    color: Colors.muted,
    fontSize: 13,
  },
});

export default SelectServiceScreen;
