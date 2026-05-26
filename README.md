# Nimbus

A mobile app for learning AWS, built with React Native and Expo.

## Overview

Nimbus is a gamified learning platform that helps users study for AWS certifications through lessons, adventures, and a progression system with XP, levels, badges, and streaks.

## Tech Stack

- React Native 0.81 + Expo 54
- TypeScript
- React Navigation (native stack + bottom tabs)
- AsyncStorage for local persistence
- Jest + fast-check for testing

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npx expo`)
- Android Studio or Xcode (for native builds)

### Install

```bash
npm install
```

### Run

```bash
npm start          # Expo dev server (tunnel mode)
npm run android    # Android
npm run ios        # iOS
npm run web        # Web
```

### Test

```bash
npm test
```

## Project Structure

```
├── assets/          # Images, icons, avatars
├── components/      # Reusable UI components
├── constants/       # App-wide constants
├── contexts/        # React contexts (User, Theme, Lesson, Social)
├── data/            # Static data (lessons, roles)
├── hooks/           # Custom hooks
├── navigation/      # Stack and tab navigators, route types
├── screens/         # All app screens
├── services/        # Auth and API services
├── types/           # Shared TypeScript types
├── utils/           # Utility functions
├── App.tsx          # Root component
└── index.ts         # Entry point
```

## Key Features

- Role-based or service-based learning paths
- Daily lessons and adventure challenges
- XP, levels, and streak tracking
- Level badges awarded on level-up
- Leaderboard and social features (follow, friends)
- Dark and light theme support
- Profile customization with avatars

## Environment Variables

Copy `.env.example` to `.env` and fill in the required values.
