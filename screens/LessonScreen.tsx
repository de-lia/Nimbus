import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

const LessonScreen: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    setShowFeedback(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.title}>What is an S3 Bucket?</Text>
        </View>

        {/* Progress Bar */}
        <Progress.Bar
          progress={0.25}
          width={null}
          color="#FFB703"
          unfilledColor="#1B263B"
          borderWidth={0}
          height={6}
          style={styles.progressBar}
        />

        {/* Lesson Image */}
        <Image
          source={require("../assets/s3-illustration.jpg")}
          style={styles.image}
        />

        {/* Lesson Description */}
        <Text style={styles.paragraph}>
          Imagine you have a magic backpack. This backpack is special because it
          can hold anything you want — photos, videos, documents, you name it. And
          the best part? It never runs out of space. You can put as much as you
          want in it, and it will always have room for more. In the world of AWS,
          this magic backpack is called an <Text style={styles.bold}>S3 Bucket</Text>.
        </Text>

        <Text style={styles.paragraph}>
          S3 stands for <Text style={styles.bold}>Simple Storage Service</Text>,
          and it's a place where you can store and retrieve any amount of data,
          anytime, from anywhere on the web. It's like having your own personal,
          infinitely large hard drive in the cloud.
        </Text>

        {/* Question Section */}
        <View style={styles.quizContainer}>
          <Text style={styles.quizTitle}>What does the 'S' in S3 stand for?</Text>

          {["Simple", "Secure", "Storage", "Service"].map((option) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === "Storage";

            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  isSelected && {
                    borderColor: isCorrect ? "#00C851" : "#ff4444",
                    backgroundColor: isCorrect ? "#0A2F1C" : "#2B1A1A",
                  },
                ]}
                onPress={() => handleOptionPress(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && { color: isCorrect ? "#00C851" : "#ff4444" },
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Feedback */}
          {showFeedback && (
            <View style={styles.feedbackBox}>
              {selectedOption === "Storage" ? (
                <>
                  <Text style={styles.feedbackTitle}>Great Job!</Text>
                  <Text style={styles.feedbackText}>
                    S3 stands for Simple Storage Service. You got one of them
                    right!
                  </Text>
                </>
              ) : (
                <>
                  <Text style={[styles.feedbackTitle, { color: "#ff4444" }]}>
                    Not Quite!
                  </Text>
                  <Text style={styles.feedbackText}>
                    The 'S' in S3 stands for Storage. Don't worry — you're getting
                    there!
                  </Text>
                </>
              )}
            </View>
          )}
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LessonScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  progressBar: {
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    resizeMode: "contain",
    backgroundColor: "#1B263B",
    marginBottom: 20,
  },
  paragraph: {
    color: "#D8DEE9",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  bold: {
    fontWeight: "bold",
    color: "#fff",
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
    fontSize: 16,
    marginBottom: 14,
  },
  optionButton: {
    backgroundColor: "#14213D",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#1B263B",
    marginBottom: 10,
  },
  optionText: {
    color: "#fff",
    fontSize: 15,
  },
  feedbackBox: {
    backgroundColor: "#0A2F1C",
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },
  feedbackTitle: {
    color: "#00C851",
    fontWeight: "700",
    marginBottom: 4,
  },
  feedbackText: {
    color: "#D8DEE9",
  },
  bottomButtons: {
    marginTop: 25,
    flexDirection: "column",
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "#007BFF",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
  },
  continueText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  skipButton: {
    paddingVertical: 8,
  },
  skipText: {
    color: "#A0A7B0",
    fontSize: 15,
  },
});