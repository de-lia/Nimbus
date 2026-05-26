import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import { CertificationPath, Certification } from "../data/certificationPaths";

interface CertificationPathViewProps {
  certificationPath: CertificationPath;
}

const LEVEL_COLORS: Record<string, string> = {
  Foundational: Colors.tealLight,
  Associate: Colors.blueMid,
  Professional: Colors.violet,
  Specialty: Colors.accent,
};

const CertificationPathView: React.FC<CertificationPathViewProps> = ({
  certificationPath,
}) => {
  const { certifications } = certificationPath;

  return (
    <View style={styles.container}>
      {certifications.map((cert, index) => {
        const isLast = index === certifications.length - 1;
        const badgeColor = LEVEL_COLORS[cert.level] ?? Colors.muted;

        return (
          <View key={`${cert.name}-${index}`} style={styles.row}>
            <View style={styles.timelineColumn}>
              <View
                style={[
                  styles.circle,
                  cert.required ? styles.circleFilled : styles.circleOutlined,
                ]}
              />
              {!isLast && <View style={styles.line} />}
            </View>
            <View style={styles.content}>
              <Text style={styles.certName}>{cert.name}</Text>
              <View style={[styles.levelBadge, { backgroundColor: badgeColor }]}>
                <Text style={styles.levelText}>{cert.level}</Text>
              </View>
              {!cert.required && (
                <Text style={styles.optionalLabel}>Optional</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const CIRCLE_SIZE = 16;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
  },
  timelineColumn: {
    alignItems: "center",
    width: 32,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    marginTop: 4,
  },
  circleFilled: {
    backgroundColor: Colors.accent,
  },
  circleOutlined: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.border,
    marginVertical: 2,
  },
  content: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 20,
  },
  certName: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },
  levelBadge: {
    alignSelf: "flex-start",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  levelText: {
    color: Colors.backgroundDark,
    fontSize: 12,
    fontWeight: "700",
  },
  optionalLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
});

export default CertificationPathView;
