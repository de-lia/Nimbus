import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface DailyLessonCardProps {
  onStartLesson?: () => void;
}

const DailyLessonCard: React.FC<DailyLessonCardProps> = ({ onStartLesson }) => {
  return (
    <View style={styles.card}>
      {/* <ImageBackground
        source={require("../assets/daily_lesson_preview.png")}
        style={styles.image}
        imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      /> */}
      <View style={styles.content}>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.title}>Daily Lesson</Text>
          <Text style={styles.subtitle}>
            Complete today's lesson to maintain your streak!
          </Text>
        </View>

        <View style={styles.row}>
          <Icon name="schedule" size={18} color="#00A1C9" />
          <Text style={styles.durationText}>Lesson: ~10 minutes</Text>
        </View>

        <TouchableOpacity
          onPress={onStartLesson}
          activeOpacity={0.9}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Start Lesson</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DailyLessonCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#182735",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    padding: 16,
  },
  title: {
    color: "#F5F7F8",
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  durationText: {
    color: "#9CA3AF",
    fontSize: 13,
    marginLeft: 6,
  },
  button: {
    backgroundColor: "#FF9900",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
