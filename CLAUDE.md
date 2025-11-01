# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native app that implements the Drake Equation calculator with an interactive UI. The app uses Expo SDK 54 and displays the equation with animated flip cards for inputs and a space-themed interface.

## Development Commands

```bash
# Start development server
npm start

# Run on specific platforms
npm run android
npm run ios
npm run web

# Linting
npm run lint
npm run lint-fix
```

## Architecture

### State Management
- Uses Redux with Redux Thunk for state management
- Store configured in `src/store.js`
- Single reducer `equationReducer` manages Drake Equation state
- Actions defined in `src/actions/equationActions.js`

### Component Structure
- **App.js**: Root component with font loading, Redux Provider, and loading screen logic
- **Equation.js**: Main container with gesture handling, flip animations, and pan gestures for UI interactions
- **Components**: Modular components in `src/components/` including:
  - `FlipComponent`: Handles card flip animations between input and info views
  - `Result`: Displays Drake Equation result
  - `Inputs`: Input form components
  - `LoadingScreen`: Animated loading with completion callback
  - Various text and UI components

### Key Dependencies
- Expo SDK for cross-platform development
- React Native Gesture Handler for pan gestures and interactions
- Redux/React-Redux for state management
- Expo Google Fonts (Audiowide, Exo 2)
- React Native Safe Area Context for device-safe layouts

### Styling
- Centralized styles in `src/styles.js`
- Uses black background with purple accents
- Custom fonts: Audiowide for headers, Exo 2 for body text

### Animations
- Heavy use of `Animated` API for smooth transitions
- Custom hook `useFadeIn` for fade animations
- Pan gesture handling for drag-to-reveal interactions
- Flip animations for card transitions

## Code Style
- ESLint configured with Expo preset
- Max line length: 120 characters
- JSX allowed in .js files
- Prop types validation enabled as warnings