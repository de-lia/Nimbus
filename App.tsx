// App.tsx
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "./contexts/UserContext";
import { LessonProvider } from "./contexts/LessonContext";
import { LeaderboardProvider } from "./contexts/LeaderboardContext";
import { AdventureProvider } from "./contexts/AdventureContext";
import AppNavigator from "./navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <LessonProvider>
          <LeaderboardProvider>
            <AdventureProvider>
              <StatusBar barStyle="light-content" backgroundColor="#0D1B2A" />
              <AppNavigator />
            </AdventureProvider>
          </LeaderboardProvider>
        </LessonProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}
