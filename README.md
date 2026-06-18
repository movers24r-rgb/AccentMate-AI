# 🎤 AccentMate AI - Your Personal English Speaking Coach

<div align="center">

![AccentMate AI](https://img.shields.io/badge/React%20Native-Expo-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

**Master American English Speaking with AI-Powered Real-Time Feedback**

</div>

## 📱 About AccentMate AI

AccentMate AI is a revolutionary mobile-first application that helps English learners improve their spoken English through intelligent AI coaching. Using advanced speech recognition and natural language processing, AccentMate provides real-time feedback on grammar, pronunciation, fluency, vocabulary, and accent.

## ✨ Key Features

- 🎯 **Smart Speech Analysis** - Grammar, pronunciation, and fluency feedback
- 📊 **Comprehensive Dashboard** - Track progress with daily streaks and analytics
- 🎤 **Multiple Practice Modes** - Free speaking, guided topics, timed challenges
- 🔄 **Instant AI Feedback** - 5 performance metrics with detailed explanations
- 🔐 **Secure & Private** - Firebase authentication and encrypted storage

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Expo CLI
- iOS/Android device or emulator
- OpenAI API key
- Firebase account

### Installation

```bash
git clone https://github.com/movers24r-rgb/AccentMate-AI.git
cd AccentMate-AI
npm install
cp .env.example .env.local
```

### Configuration

Edit `.env.local` with your credentials:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
OPENAI_API_KEY=your_openai_key
```

### Run

```bash
expo start
# iOS
expo start --ios
# Android
expo start --android
```

## 🛠️ Tech Stack

- **Frontend**: React Native, Expo
- **UI**: React Native Paper
- **State Management**: Redux Toolkit
- **Backend**: Firebase (Firestore, Auth, Storage)
- **AI**: OpenAI (GPT-4, Whisper API)
- **Navigation**: React Navigation

## 📁 Project Structure

```
src/
├── screens/          # UI screens
├── services/         # Business logic
├── config/           # Firebase & OpenAI
├── redux/            # State management
├── navigation/       # Navigation setup
└── assets/           # Images & icons
```

## 📄 License

MIT License
