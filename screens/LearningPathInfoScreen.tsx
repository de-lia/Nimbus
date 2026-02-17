import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";

type Props = {
  navigation: any;
};

const LearningPathInfoScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Which Learning Path Should You Choose?</Text>

        {/* Learn by Job Role Section */}
        <Text style={styles.sectionTitle}>Learn by Job Role</Text>
        <Text style={styles.paragraph}>
          AWS recommends choosing a job-role path when you want a clear career
          destination – for example: Solutions Architect, Developer, DevOps
          Engineer, or SysOps Administrator. These paths include training,
          hands-on labs, and certifications designed to help you build the
          skills required for those roles.
        </Text>

        <Text style={styles.subTitle}>Common Job Role Paths</Text>
        <View style={styles.bulletList}>
          <Text style={styles.bullet}>• Cloud Practitioner (Foundation)</Text>
          <Text style={styles.bullet}>• Solutions Architect</Text>
          <Text style={styles.bullet}>• Developer</Text>
          <Text style={styles.bullet}>• DevOps Engineer</Text>
          <Text style={styles.bullet}>• SysOps Administrator</Text>
        </View>

        {/* Learn by Service Section */}
        <Text style={styles.sectionTitle}>Learn by Service or Solution</Text>
        <Text style={styles.paragraph}>
          Choose a service-based path when you want to dive deep into one or
          more AWS services such as S3, EC2, Lambda, or SageMaker. You can also
          specialize in areas like Storage, Serverless, Data Analytics, or
          Security. This is ideal if you want to master how specific AWS
          technologies work together.
        </Text>

        <Text style={styles.subTitle}>Common Service-Based Domains</Text>
        <View style={styles.bulletList}>
          <Text style={styles.bullet}>• Storage (S3, EFS, Glacier)</Text>
          <Text style={styles.bullet}>• Compute & Serverless (EC2, Lambda)</Text>
          <Text style={styles.bullet}>• Data & Analytics (Athena, Redshift)</Text>
          <Text style={styles.bullet}>• AI & Machine Learning (SageMaker, Rekognition)</Text>
          <Text style={styles.bullet}>• Security & Governance (IAM, KMS)</Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.continueText}>Back to Path Selection</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LearningPathInfoScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 16,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginTop: 20,
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.textPrimary,
    marginTop: 10,
    marginBottom: 4,
  },
  paragraph: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  bulletList: {
    marginLeft: 12,
    marginBottom: 12,
  },
  bullet: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginVertical: 2,
  },
  continueButton: {
    backgroundColor: Colors.accent,
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 30,
    alignItems: "center",
  },
  continueText: {
    color: Colors.textDark,
    fontSize: 16,
    fontWeight: "600",
  },
});
