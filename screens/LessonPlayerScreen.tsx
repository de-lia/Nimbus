import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getLessonById } from "../data/lessons/index";
import { useLesson } from "../contexts/LessonContext";
import { Colors } from "../constants/colors";

const LessonPlayerScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { completeLesson } = useLesson();
  
  const lessonId = route.params?.lessonId || "s3_lesson_1";
  const lesson = getLessonById(lessonId);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 50 }}>
          Lesson not found
        </Text>
      </SafeAreaView>
    );
  }

  const totalSteps = lesson.content.length;
  const currentContent = lesson.content[currentStep];
  const progress = (currentStep + 1) / totalSteps;

  const handleOptionPress = (option: string) => {
    if (showFeedback) return;
    
    setSelectedOption(option);
    setShowFeedback(true);

    if (currentContent.type === "quiz" && option === currentContent.correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleContinue = async () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      // Lesson complete
      const score = Math.round((correctAnswers / totalSteps) * 100);
      const earnedXP = await completeLesson(lessonId, score);
      setXpEarned(earnedXP);
      setShowCompletionModal(true);
    }
  };

  const handleClose = () => {
    setShowCompletionModal(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>{lesson.title}</Text>
        </View>

        {/* Progress Bar */}
        <Progress.Bar
          progress={progress}
          width={null}
          color="#FFB703"
          unfilledColor="#1B263B"
          borderWidth={0}
          height={6}
          style={styles.progressBar}
        />

        {/* Content */}
        {currentContent.type === "text" && (
          <View style={styles.textContent}>
            <Text style={styles.paragraph}>{currentContent.text}</Text>
          </View>
        )}

        {currentContent.type === "quiz" && (
          <View style={styles.quizContainer}>
            <Text style={styles.quizTitle}>{currentContent.question}</Text>

            {currentContent.options?.map((option) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentContent.correctAnswer;
              const showCorrect = showFeedback && isCorrect;
              const showIncorrect = showFeedback && isSelected && !isCorrect;

              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    showCorrect && styles.optionCorrect,
                    showIncorrect && styles.optionIncorrect,
                  ]}
                  onPress={() => handleOptionPress(option)}
                  disabled={showFeedback}
                >
                  <Text
                    style={[
                      styles.optionText,
                      showCorrect && styles.optionTextCorrect,
                      showIncorrect && styles.optionTextIncorrect,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {/* Feedback */}
            {showFeedback && (
              <View
                style={[
                  styles.feedbackBox,
                  selectedOption === currentContent.correctAnswer
                    ? styles.feedbackCorrect
                    : styles.feedbackIncorrect,
                ]}
              >
                {selectedOption === currentContent.correctAnswer ? (
                  <>
                    <Text style={styles.feedbackTitle}>Great Job! 🎉</Text>
                    <Text style={styles.feedbackText}>
                      That's correct! You're doing great.
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={[styles.feedbackTitle, { color: "#ff4444" }]}>
                      Not Quite
                    </Text>
                    <Text style={styles.feedbackText}>
                      The correct answer is: {currentContent.correctAnswer}
                    </Text>
                  </>
                )}
              </View>
            )}
          </View>
        )}

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              currentContent.type === "quiz" && !showFeedback && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={currentContent.type === "quiz" && !showFeedback}
          >
            <Text style={styles.continueText}>
              {currentStep < totalSteps - 1 ? "Continue" : "Complete Lesson"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Completion Modal */}
      <Modal
        visible={showCompletionModal}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Lesson Complete! 🎉</Text>
            <Text style={styles.modalXP}>+{xpEarned} XP</Text>
            <Text style={styles.modalScore}>
              Score: {Math.round((correctAnswers / totalSteps) * 100)}%
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleClose}>
              <Text style={styles.modalButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LessonPlayerScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  progressBar: {
    marginBottom: 20,
  },
  textContent: {
    marginBottom: 20,
  },
  paragraph: {
    color: "#D8DEE9",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  quizContainer: {
    marginTop: 20,
    backgroundColor: "#1B263B",
    borderRadius: 12,
    padding: 16,
  },
  quizTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: "#14213D",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "#1B263B",
    marginBottom: 10,
  },
  optionCorrect: {
    borderColor: "#00C851",
    backgroundColor: "#0A2F1C",
  },
  optionIncorrect: {
    borderColor: "#ff4444",
    backgroundColor: "#2B1A1A",
  },
  optionText: {
    color: "#fff",
    fontSize: 15,
  },
  optionTextCorrect: {
    color: "#00C851",
  },
  optionTextIncorrect: {
    color: "#ff4444",
  },
  feedbackBox: {
    padding: 14,
    borderRadius: 10,
    marginTop: 16,
  },
  feedbackCorrect: {
    backgroundColor: "#0A2F1C",
  },
  feedbackIncorrect: {
    backgroundColor: "#2B1A1A",
  },
  feedbackTitle: {
    color: "#00C851",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 6,
  },
  feedbackText: {
    color: "#D8DEE9",
    fontSize: 14,
  },
  bottomButtons: {
    marginTop: 30,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: "#007BFF",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
  },
  continueButtonDisabled: {
    backgroundColor: "#555",
    opacity: 0.5,
  },
  continueText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
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
  modalScore: {
    color: "#D8DEE9",
    fontSize: 18,
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
