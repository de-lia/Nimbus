import React from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import VerificationScreen from "../screens/VerificationScreen";
import CreateProfileStep1Screen from "../screens/CreateProfileStep1Screen";
import SelectRoleScreen from "../screens/SelectRoleScreen";
import SelectServiceScreen from "../screens/SelectServiceScreen";
import CreateProfileStep2Screen from "../screens/CreateProfileStep2Screen";
import MainApp from "./MainApp";
import AdventureScreen from "../screens/AdventureScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import LessonScreen from "../screens/LessonScreen";
import LessonPlayerScreen from "../screens/LessonPlayerScreen";
import LearningPathInfoScreen from "../screens/LearningPathInfoScreen";
import CertificationPathScreen from "../screens/CertificationPathScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ChangeLearningPathScreen from "../screens/ChangeLearningPathScreen";
import BadgesScreen from "../screens/BadgesScreen";
import BadgeDetailsScreen from "../screens/BadgeDetailsScreen";
import { useUser } from "../contexts/UserContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0D1B2A" }}>
    <ActivityIndicator size="large" color="#ffffff" />
  </View>
);

const AppNavigator = () => {
  const { initialRoute, isSessionLoading } = useUser();

  return (
    <NavigationContainer>
      {isSessionLoading ? (
        <LoadingScreen />
      ) : (
        <Stack.Navigator
          initialRouteName={initialRoute as keyof RootStackParamList}
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
          <Stack.Screen name="CreateProfileStep1" component={CreateProfileStep1Screen} />
          <Stack.Screen name="LearningPathInfo" component={LearningPathInfoScreen} />
          <Stack.Screen name="SelectRole" component={SelectRoleScreen} />
          <Stack.Screen name="SelectService" component={SelectServiceScreen} />
          <Stack.Screen name="CreateProfileStep2" component={CreateProfileStep2Screen} />

          {/* All main in-app screens live inside MainApp */}
          <Stack.Screen name="MainApp" component={MainApp} />
          <Stack.Screen name="Lesson" component={LessonScreen} />
          <Stack.Screen name="LessonPlayer" component={LessonPlayerScreen} />

          {/* Standalone adventure screen (can be launched from Dashboard) */}
          <Stack.Screen name="Adventure" component={AdventureScreen} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          <Stack.Screen name="CertificationPath" component={CertificationPathScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="ChangeLearningPath" component={ChangeLearningPathScreen} />
          <Stack.Screen name="Badges" component={BadgesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BadgeDetails" component={BadgeDetailsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
