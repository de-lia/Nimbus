import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface AdventureCardProps {
  onStartAdventure?: () => void;
}

const AdventureCard: React.FC<AdventureCardProps> = ({ onStartAdventure }) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={require("../assets/adventure-preview.jpg")}
        style={styles.image}
        imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      />
      <View style={styles.content}>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.title}>Adventure Mode</Text>
          <Text style={styles.subtitle}>
            Embark on an exciting adventure to test your knowledge!
          </Text>
        </View>

        <View style={styles.row}>
          <Icon name="map" size={18} color="#00A1C9" />
          <Text style={styles.durationText}>Adventure: ~15 minutes</Text>
        </View>

        <TouchableOpacity
          onPress={onStartAdventure}
          activeOpacity={0.9}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Start Adventure</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdventureCard;

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
    backgroundColor: "#00A1C9",
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
