import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  StatusBar,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAdventure } from "../contexts/AdventureContext";
import { getAdventureById } from "../data/adventures/index";
import { Colors } from "../constants/colors";

const AdventureScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { getAdventureProgress, markStepComplete, isAdventureCompleted } = useAdventure();
  
  const adventureId = route.params?.adventureId || "s3_adventure_1";
  const adventure = getAdventureById(adventureId);
  const adventureProgress = getAdventureProgress(adventureId);
  
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [openStep, setOpenStep] = useState<number | null>(0);

  useEffect(() => {
    // Check if adventure was just completed
    if (adventureProgress?.completed && !showCompletionModal) {
      setShowCompletionModal(true);
    }
  }, [adventureProgress?.completed]);

  if (!adventure) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 50 }}>
          Adventure not found
        </Text>
      </SafeAreaView>
    );
  }

  const steps = adventureProgress?.steps || adventure.steps;
  const allStepsComplete = steps.every(step => step.completed);

  const handleToggleStep = (index: number) => {
    setOpenStep(openStep === index ? null : index);
  };

  const handleStepToggle = async (stepId: string, currentStatus: boolean) => {
    await markStepComplete(adventureId, stepId, !currentStatus);
  };

  const handleCloseModal = () => {
    setShowCompletionModal(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{adventure.service.toUpperCase()} Adventure</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Adventure Icon and Title */}
        <View style={styles.heroSection}>
          <View style={styles.iconWrapper}>
            <Image
              source={require("../assets/adventure-preview.jpg")}
              style={styles.iconImage}
            />
          </View>
          <Text style={styles.title}>{adventure.title}</Text>
          <Text style={styles.description}>{adventure.description}</Text>
          
          {/* XP Reward Badge */}
          <View style={styles.xpBadge}>
            <Icon name="star" size={20} color="#FFB703" />
            <Text style={styles.xpText}>{adventure.xpReward} XP</Text>
          </View>
        </View>

        {/* Mission Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Mission</Text>
          <View style={styles.card}>
            {steps.map((step, index) => (
              <View key={step.stepId} style={styles.stepItem}>
                <TouchableOpacity
                  onPress={() => handleToggleStep(index)}
                  style={styles.stepHeader}
                >
                  <TouchableOpacity
                    onPress={() => handleStepToggle(step.stepId, step.completed)}
                    style={styles.checkbox}
                  >
                    {step.completed && (
                      <Icon name="check" size={18} color="#00C851" />
                    )}
                  </TouchableOpacity>
                  <Text style={[styles.stepTitle, step.completed && styles.stepTitleComplete]}>
                    Step {index + 1}
                  </Text>
                  <Icon
                    name="expand-more"
                    size={22}
                    color="#fff"
                    style={{
                      transform: [
                        { rotate: openStep === index ? "180deg" : "0deg" },
                      ],
                    }}
                  />
                </TouchableOpacity>
                {openStep === index && (
                  <Text style={styles.stepDetails}>{step.description}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* CTA Button */}
        {!allStepsComplete && (
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() =>
              Linking.openURL("https://aws.amazon.com/console/")
            }
          >
            <Text style={styles.ctaButtonText}>Go to AWS Console</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Completion Modal */}
      <Modal
        visible={showCompletionModal}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adventure Complete! 🎉</Text>
            <Text style={styles.modalXP}>+{adventureProgress?.xpEarned || adventure.xpReward} XP</Text>
            <Text style={styles.modalBadge}>🏆 Badge Earned: {adventure.badge}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>Awesome!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AdventureScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#182735",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: "#232F3E",
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  heroSection: {
    alignItems: "center",
    padding: 16,
  },
  iconWrapper: {
    backgroundColor: "#FF9900" + "33",
    borderRadius: 16,
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  iconImage: {
    width: 64,
    height: 64,
    resizeMode: "contain",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 12,
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  xpText: {
    color: "#FFB703",
    fontSize: 16,
    fontWeight: "700",
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#182735",
    borderRadius: 12,
    padding: 12,
  },
  stepItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingVertical: 12,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#00C851",
    alignItems: "center",
    justifyContent: "center",
  },
  stepTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
  },
  stepTitleComplete: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  stepDetails: {
    color: "#ccc",
    fontSize: 13,
    marginTop: 8,
    marginLeft: 36,
    lineHeight: 18,
  },
  ctaButton: {
    backgroundColor: "#FF9900",
    margin: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#FF9900",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  ctaButtonText: {
    color: "#232F3E",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1B263B",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    width: "85%",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  modalXP: {
    color: Colors.accent,
    fontSize: 48,
    fontWeight: "700",
    marginBottom: 8,
  },
  modalBadge: {
    color: "#D8DEE9",
    fontSize: 16,
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#232F3E",
    fontSize: 16,
    fontWeight: "700",
  },
});