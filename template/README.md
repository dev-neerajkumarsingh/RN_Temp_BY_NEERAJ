# React Native Boilerplate

This is a professional, feature-rich, and production-ready boilerplate for React Native applications. It's designed to help you kickstart your next mobile app with a solid foundation, incorporating best practices and a curated set of powerful libraries.

## Features

This boilerplate comes packed with a wide range of features to accelerate your development process:

-   **State Management**: Utilizes **Redux Toolkit** for efficient and predictable state management, complemented by **Redux Persist** for state persistence.
-   **Secure State Persistence**: Redux state is securely persisted in the device's keychain using a custom storage engine built with **react-native-keychain** and **react-native-quick-crypto**. This provides hardware-backed security for sensitive data.
-   **Data Fetching**: Integrated with **TanStack Query (React Query)** for declarative, auto-managed data fetching, caching, and synchronization. It simplifies server-state management and improves the user experience with features like background refetching and stale-while-revalidate.
-   **Robust Networking Layer**: A centralized networking manager built on **Axios** handles all API requests. It includes:
    -   Automatic payload encryption and response decryption.
    -   Seamless auth token management.
    -   Offline detection and request retry mechanism.
    -   Support for file uploads (`multipart/form-data`).
-   **Dynamic SVG Integration**: SVGs can be directly imported and used as React components, thanks to **react-native-svg** and **react-native-svg-transformer**.
-   **Rich Component Library**: A comprehensive set of pre-built, customizable, and reusable components, including:
    -   Buttons, Inputs (including OTP), Dropdowns
    -   Modals, Popups, and Bottom Sheets
    -   Image Picker and Image Viewer
    -   Loaders, Shimmers, and Toasts
-   **Navigation**: **React Navigation** is set up with a stack navigator for screen transitions.
-   **Styling**: **Styled Components** are used for creating themed and maintainable UI components.
-   **Linting & Formatting**: **ESLint** and **Prettier** are pre-configured to ensure code quality and a consistent style.
-   **Testing**: **Jest** is set up for unit and component testing.

## Getting Started

### Prerequisites

-   Node.js (>= 20.x)
-   npm or yarn
-   React Native development environment set up for your target platform (iOS/Android). See the [official React Native documentation](https://reactnative.dev/docs/environment-setup) for instructions.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd <project-directory>/template
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

-   **To run on Android:**
    ```bash
    npm run android
    ```
-   **To run on iOS:**
    ```bash
    npm run ios
    ```

## Available Scripts

-   `npm start`: Starts the Metro bundler.
-   `npm run android`: Deploys the application to a connected Android device or emulator.
-   `npm run ios`: Deploys the application to the iOS simulator.
-   `npm run lint`: Lints the codebase using ESLint.
-   `npm run test`: Runs the test suite with Jest.
-   `npm run android-clean`: Cleans the Android build artifacts and runs the app.
-   `npm run ios-clean`: Cleans the iOS build artifacts and pods, then runs the app.
-   `npm run android-release`: Creates a release build for Android.
-   `npm run deep-clean`: Removes `node_modules`, clears caches, and reinstalls dependencies.

## Project Structure

The project follows a feature-based directory structure:

```
src
├── assets         # Static assets like fonts and icons (including SVGs)
├── common         # Reusable components, constants, and hooks
├── network        # Networking layer (Axios, middleware)
├── redux          # Redux store, reducers, and encryption logic
├── routes         # Navigation logic (React Navigation)
├── screens        # Application screens (grouped by feature)
├── themes         # Styling, themes, and global styles
└── utils          # Utility functions
```

## Advanced Features Deep Dive

### Redux with Encryption

The boilerplate uses a custom storage engine for `redux-persist` to securely store the Redux state.

-   **`template/src/redux/encryption/KeychainStorage.ts`**: This file contains the implementation of the custom storage engine. It uses `react-native-keychain` to store the serialized Redux state in the device's secure keychain, providing hardware-level encryption.

### Networking Layer

The networking layer is managed by a central `NetworkManager`.

-   **`template/src/network/middleware/Network_Manager.ts`**: This higher-order middleware intercepts all API calls. It automatically handles:
    -   **Encryption**: Encrypts request bodies and decrypts responses.
    -   **Authentication**: Attaches the user's access token to requests.
    -   **Error Handling**: Catches network errors, displays user-friendly toasts or error screens, and handles session expiry (401 errors).
    -   **Offline Support**: Detects when the device is offline and provides a retry mechanism.

### Dynamic SVGs

SVGs are treated as first-class components.

1.  **Add your SVG file** to `template/src/assets/icons/list`.
2.  **Import it** directly into your component:
    ```javascript
    import MyIcon from '@assets/icons/list/MyIcon.svg';

    const MyComponent = () => <MyIcon width={24} height={24} />;
    ```

This is made possible by `react-native-svg` and `react-native-svg-transformer`.

### TanStack Query (React Query)

TanStack Query is used for managing server state. It simplifies data fetching, caching, and invalidation.

-   **Usage**: You can use the `useQuery` and `useMutation` hooks from `@tanstack/react-query` in your components to fetch and update data.
-   **Integration with NetworkManager**: `NetworkManager` is designed to work seamlessly with TanStack Query. You can pass `skipToast: true` and `skipErrorScreen: true` to let TanStack Query's hooks handle error and loading states.

```javascript
import { useQuery } from '@tanstack/react-query';
import { NetworkManager } from '@network';
import { API } from '@network/apis';

const { data, isLoading, isError } = useQuery({
  queryKey: ['users'],
  queryFn: () => NetworkManager({
    api: API.USER.FETCH_LIST,
    skipToast: true,
    skipErrorScreen: true,
  }),
});
```

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

---