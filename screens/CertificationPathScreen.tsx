import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Colors } from "../constants/colors";
import { getCertificationPath } from "../data/certificationPaths";
import { getJobRoleById } from "../data/jobRoles";
import CertificationPathView from "../components/CertificationPathView";

type Props = NativeStackScreenProps<RootStackParamList, "CertificationPath">;

const CertificationPathScreen: React.FC<Props> = ({ route }) => {
  const { roleId } = route.params;
  const certificationPath = getCertificationPath(roleId);
  const jobRole = getJobRoleById(roleId);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          {jobRole ? jobRole.displayName : "Certification Path"}
        </Text>
        <Text style={styles.subtitle}>Certification Path</Text>

        {certificationPath ? (
          <CertificationPathView certificationPath={certificationPath} />
        ) : (
          <View style={styles.fallback}>
            <Text style={styles.fallbackText}>
              No certification path available
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.muted,
    textAlign: "center",
    marginBottom: 24,
  },
  fallback: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  fallbackText: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
});

export default CertificationPathScreen;
