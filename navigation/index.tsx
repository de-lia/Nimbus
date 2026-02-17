import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import CreateProfileStep1Screen from "../screens/CreateProfileStep1Screen";
import SelectRoleScreen from "../screens/SelectRoleScreen";
import SelectServiceScreen from "../screens/SelectServiceScreen";
import CreateProfileStep2Screen from "../screens/CreateProfileStep2Screen";
import MainApp from "./MainApp";
import AdventureScreen from "../screens/AdventureScreen";
import LessonScreen from "../screens/LessonScreen";
import LessonPlayerScreen from "../screens/LessonPlayerScreen";
import LearningPathInfoScreen from "../screens/LearningPathInfoScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
