// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   StatusBar,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Colors } from "../constants/colors";

// const CreateProfileStep2Screen = ({ navigation }: any) => {
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
//       <StatusBar barStyle="light-content" />
//       <ScrollView contentContainerStyle={{ padding: 16 }}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.headerText}>Choose Your Path</Text>
//         </View>

//         {/* Learn by Job Role Card */}
//         <TouchableOpacity
//           style={styles.card}
//           onPress={() => navigation.navigate("CreateProfileStep3")}
//         >
//           <View style={styles.iconWrapper}>
//             <Text style={styles.icon}>👩‍💼</Text>
//           </View>
//           <View style={styles.cardText}>
//             <Text style={styles.cardTitle}>Learn by Job Role</Text>
//             <Text style={styles.cardDescription}>
//               Master the skills needed for specific AWS careers such as Cloud
//               Practitioner, Developer, or Solutions Architect.
//             </Text>
//           </View>
//         </TouchableOpacity>

//         {/* Learn by Service Card */}
//         <TouchableOpacity
//           style={styles.card}
//           onPress={() => navigation.navigate("CreateProfileStep3")}
//         >
//           <View style={styles.iconWrapper}>
//             <Text style={styles.icon}>☁️</Text>
//           </View>
//           <View style={styles.cardText}>
//             <Text style={styles.cardTitle}>Learn by Service</Text>
//             <Text style={styles.cardDescription}>
//               Focus on individual AWS services such as S3, EC2, or Lambda to
//               understand their use cases.
//             </Text>
//           </View>
//         </TouchableOpacity>

//         {/* Footer */}
//         <TouchableOpacity>
//           <Text style={styles.helperText}>Which path is right for me?</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.continueButton}
//           onPress={() => navigation.navigate("CreateProfileStep3")}
//         >
//           <Text style={styles.continueText}>Continue</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     marginBottom: 30,
//   },
//   headerText: {
//     color: Colors.textPrimary,
//     fontSize: 24,
//     fontWeight: "700",
//     textAlign: "center",
//   },
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: Colors.cardBackground || "#1a2732",
//     borderColor: Colors.accent,
//     borderWidth: 1,
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 20,
//   },
//   iconWrapper: {
//     backgroundColor: Colors.textSecondary || "#2e3f4e",
//     borderRadius: 10,
//     padding: 10,
//     marginRight: 16,
//   },
//   icon: {
//     fontSize: 30,
//   },
//   cardText: {
//     flex: 1,
//   },
//   cardTitle: {
//     color: Colors.textPrimary,
//     fontSize: 18,
//     fontWeight: "700",
//     marginBottom: 4,
//   },
//   cardDescription: {
//     color: Colors.textSecondary || "#93b0c8",
//     fontSize: 14,
//   },
//   helperText: {
//     textAlign: "center",
//     color: Colors.textSecondary || "#93b0c8",
//     fontSize: 14,
//     textDecorationLine: "underline",
//     marginTop: 10,
//   },
//   continueButton: {
//     backgroundColor: Colors.accent,
//     borderRadius: 14,
//     paddingVertical: 16,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   continueText: {
//     color: Colors.textDark,
//     fontWeight: "700",
//     fontSize: 16,
//   },
// });

// export default CreateProfileStep2Screen;
