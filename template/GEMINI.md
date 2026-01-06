# GEMINI Code Companion Report

## Project Overview

This is a React Native project bootstrapped with `@react-native-community/cli`. It appears to be a template for a mobile application with pre-configured features like authentication (onboarding, login, signup, forgot password, OTP), a home screen, and a profile screen. The project is well-structured and follows common React Native development practices.

## Technologies and Libraries

*   **Core:** React Native, React
*   **State Management:** Redux, Redux Toolkit
*   **Navigation:** React Navigation
*   **Networking:** Axios
*   **Styling:** Styled Components (inferred from `Styles.ts` files)
*   **Linting:** ESLint
*   **Testing:** Jest
*   **Package Manager:** npm

## Project Structure

The project follows a feature-based directory structure, which is a common and recommended practice for React Native projects.

```
.
├── android/
├── ios/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   └── icons/
│   ├── common/
│   │   ├── components/
│   │   ├── constants/
│   │   └── hooks/
│   ├── network/
│   │   ├── apis/
│   │   ├── middleware/
│   │   └── networkCache/
│   ├── redux/
│   │   ├── reducers/
│   │   ├── store/
│   │   └── ...
│   ├── routes/
│   ├── screens/
│   │   ├── app/
│   │   └── auth/
│   ├── themes/
│   └── utils/
├── package.json
└── ...
```

*   `src`: Contains all the application source code.
    *   `assets`: Static assets like fonts and icons.
    *   `common`: Reusable components, constants, and hooks.
    *   `network`: Code for making network requests.
    *   `redux`: Redux store, reducers, and actions.
    *   `routes`: Navigation logic for the app.
    *   `screens`: Different screens of the app, organized by feature (e.g., `app`, `auth`).
    *   `themes`: Styling and themes for the app.
    *   `utils`: Utility functions.

## Building and Running

The following scripts are available in `package.json` to build and run the application:

*   **Start Metro Bundler:**
    ```sh
    npm start
    ```

*   **Run on Android:**
    ```sh
    npm run android
    ```

*   **Run on iOS:**
    ```sh
    npm run ios
    ```

*   **Clean Android build:**
    ```sh
    npm run android-clean
    ```

*   **Clean iOS build:**
    ```sh
    npm run ios-clean
    ```

*   **Create Android release build:**
    ```sh
    npm run android-release
    ```

*   **Lint the code:**
    ```sh
    npm run lint
    ```

*   **Run tests:**
    ```sh
    npm run test
    ```

*   **Deep clean the project:**
    ```sh
    npm run deep-clean
    ```

## Development Conventions

*   **Component-Based Architecture:** The project is built using a component-based architecture, with reusable components located in the `src/common/components` directory.
*   **Styling:** Styles are separated from the component logic into their own `Styles.ts` files. This is a common practice that improves code readability and maintainability.
*   **State Management:** The project uses Redux for state management, with the Redux store, reducers, and actions located in the `src/redux` directory.
*   **Navigation:** React Navigation is used for navigation, with the navigation logic located in the `src/routes` directory.
*   **Linting:** The project uses ESLint to enforce a consistent coding style. You can run the linter with `npm run lint`.
*   **Testing:** The project uses Jest for testing. You can run the tests with `npm run test`.
