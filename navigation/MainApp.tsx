import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import DashboardScreen from "../screens/DashboardScreen";
import LessonsListScreen from "../screens/LessonsListScreen";
import LeaderboardScreen from "../screens/LeaderBoardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useTheme } from "../contexts/ThemeContext";

const Tab = createBottomTabNavigator();

const MainApp: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.tabBarBorder,
          height: Platform.OS === "android" ? 95 : 110,
          paddingBottom: Platform.OS === "android" ? 35 : 50,
          paddingTop: 10,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Courses":
              iconName = "book-outline";
              break;
            case "Leaderboard":
              iconName = "trophy-outline";
              break;
            case "Profile":
              iconName = "person-outline";
              break;
          }
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Courses" component={LessonsListScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainApp;
