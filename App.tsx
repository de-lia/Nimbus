// App.tsx
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";
import { LessonProvider } from "./contexts/LessonContext";
import { LeaderboardProvider } from "./contexts/LeaderboardContext";
import { AdventureProvider } from "./contexts/AdventureContext";
import { SocialProvider } from "./contexts/SocialContext";
import AppNavigator from "./navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
      <UserProvider>
        <SocialProvider>
          <LessonProvider>
            <LeaderboardProvider>
              <AdventureProvider>
                <StatusBar barStyle="light-content" backgroundColor="#0D1B2A" />
                <AppNavigator />
              </AdventureProvider>
            </LeaderboardProvider>
          </LessonProvider>
        </SocialProvider>
      </UserProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
