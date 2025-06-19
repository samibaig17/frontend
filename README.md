# TapIn Mobile App (Frontend)

A modern, cross-platform mobile application built with React Native and Expo (v53.0.0) that provides the user interface for the TapIn service marketplace.

## Key Features

- **User Authentication**: Secure sign-up and login flows
- **Service Discovery**: Browse and search for services
- **Appointment Management**: View and manage bookings
- **Profile Management**: User profile customization
- **Responsive UI**: Optimized for both mobile and tablet devices

## Tech Stack

- **Framework**: React Native with TypeScript
- **Development Platform**: Expo v53.0.0
- **UI Library**: React Native Paper
- **State Management**: React Context API
- **Navigation**: React Navigation
- **Icons**: React Native Vector Icons

## Prerequisites

- Node.js (v16 or later)
- npm (v8 or later) or yarn (v1.22 or later)
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (requires Xcode) or Android Emulator (requires Android Studio)
- Physical device with [Expo Go](https://expo.dev/client) app installed

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run the app**
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Physical Device**: Scan the QR code with your device's camera (iOS) or the Expo Go app (Android)

## Project Structure

```
src/
├── contexts/       # Global state and context providers
├── navigation/     # Navigation configuration
├── screens/        # Application screens
│   ├── auth/      # Authentication flows
│   ├── home/      # Main app screens
│   ├── profile/   # User profile
│   └── services/  # Service-related screens
```

## Dependencies

- **Core**: React Native 0.79.3, React 19.0.0, TypeScript
- **UI**: React Native Paper, React Native Vector Icons
- **Navigation**: @react-navigation/native, @react-navigation/stack
- **State Management**: React Context API
- **Utilities**: date-fns, lodash

## Available Scripts

- `npm start` or `yarn start`: Start the Expo development server
- `npm run android` or `yarn android`: Run on Android device/emulator
- `npm run ios` or `yarn ios`: Run on iOS simulator
- `npm run web` or `yarn web`: Run in web browser
- `npm test` or `yarn test`: Run test suite

## Development Workflow

1. Create a new branch for your feature/fix
2. Make your changes following the project's code style
3. Write tests for new features
4. Ensure all tests pass
5. Create a pull request with a clear description of changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ by the TapIn Team*
