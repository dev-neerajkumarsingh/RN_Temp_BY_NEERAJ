# React Native Boilerplate

A professional, feature-rich, and production-ready boilerplate for React Native applications. Built with TypeScript, this template provides a solid foundation with best practices, optimized performance, and a comprehensive set of reusable components.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Components](#components)
- [State Management](#state-management)
- [Networking Layer](#networking-layer)
- [Navigation](#navigation)
- [Theming](#theming)
- [Hooks](#hooks)
- [Utilities](#utilities)
- [Security](#security)
- [Path Aliases](#path-aliases)
- [Scripts](#scripts)
- [Git Conventions](#git-conventions)
- [CI/CD Pipeline](#cicd-pipeline)

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.84.0 | Mobile framework |
| React | 19.2.3 | UI library |
| TypeScript | Strict mode | Type safety |
| Redux Toolkit | ^2.10 | Persistent domain state (auth, lang, theme) |
| Redux Persist | ^6.0 | State persistence |
| Zustand | ^5.0 | Ephemeral UI state (loader, toast, popup, error screen) |
| TanStack Query | ^5.90 | Server state, caching, persistence |
| TanStack Query Persist Client | ^5.90 | Cache rehydration across app launches |
| React Navigation | ^7.1 | Navigation |
| Axios | ^1.11 | HTTP client |
| React Native Reanimated | ^4.1 | Animations |
| React Native MMKV | ^4.3 | Encrypted key/value storage |
| React Native Keychain | ^10.0 | Hardware-backed master key vault |
| React Native Quick Crypto | ^1.0 | AES-256-CBC encryption |
| React Native Keyboard Controller | ^1.19 | Keyboard handling |
| React Native NetInfo | ^11.4 | Online/offline awareness |

---

## Features

### Core Features
- **TypeScript** — Full type safety with strict mode enabled
- **Hybrid State Model** — Redux Toolkit for persistent domain state, Zustand for ephemeral UI state
- **Server State** — TanStack Query with offline-first defaults, persisted cache, and NetInfo-driven online manager
- **Encrypted Storage** — MMKV instance encrypted with a 256-bit master key kept in the OS Keychain
- **End-to-End Encryption** — AES-256-CBC encryption for API request and response bodies (handled in axios interceptors)
- **Theme Support** — Light/dark themes with `'system'` mode that follows OS preference
- **Responsive Design** — Percentage and aspect-ratio based sizing utilities

### UI Components
- Pre-built, memoized, and reusable components
- Full SVG support with dynamic colors
- Keyboard-aware views and inputs (via `react-native-keyboard-controller`)
- Modal system (popups, bottom sheets, image viewer, web view)
- Toast notifications with multiple variants
- Loading indicators (global and local) sharing a `BaseLoader`

### Developer Experience
- Path aliases for clean imports (`@components`, `@hooks`, `@stores`, etc.)
- ESLint and Prettier pre-configured
- Husky + lint-staged on commit
- Jest setup for testing
- Comprehensive TypeScript types

---

## Project Structure

```
src/
├── assets/                    # Static assets
│   ├── fonts/                 # Custom fonts (Inter / Clash families)
│   └── icons/                 # SVG icon library
│
├── common/                    # Shared code
│   ├── components/            # Reusable UI components
│   │   ├── animation-samples/
│   │   ├── common-bottom-sheet/
│   │   ├── common-button/
│   │   ├── common-drop-down/
│   │   ├── common-image/
│   │   ├── common-input/      # CommonInput, CommonOtpInput
│   │   ├── common-line/
│   │   ├── common-modals/     # error screen, image viewer, web view, image picker
│   │   ├── common-popup/
│   │   ├── common-text/
│   │   ├── common-toast/
│   │   ├── common-top-tabs/
│   │   ├── common-wrapper/    # CommonBox, KeyboardAvoidingView, KeyboardStickyView
│   │   └── loader/            # BaseLoader, Loader (global), Shimmer (local)
│   ├── constants/             # App constants, URLs, language list
│   └── hooks/                 # Custom React hooks
│
├── network/                   # API layer
│   ├── apis/
│   │   ├── endpoints/         # Endpoint descriptors
│   │   └── services/          # Service functions + TanStack Query hooks
│   ├── client/                # Axios instance + request/response interceptors
│   ├── middleware/            # NetworkManager + HTTP method enum
│   └── networkCache/          # QueryClient, QueryProvider, persister, query keys
│
├── redux/                     # Persistent domain state
│   ├── reducers/              # auth, lang, theme slices
│   ├── reduxHooks/            # Typed hooks
│   └── store/                 # Store + redux-persist configuration
│
├── stores/                    # Ephemeral UI state (Zustand)
│   └── uiStore.ts             # loader, toast, popup, errorScreen
│
├── routes/                    # Navigation
│   ├── initialNavigator/      # App entry: Providers + global overlays
│   └── rootNavigator/         # Stack navigators (splash, auth, app, example)
│
├── screens/                   # Screen components
│   ├── app/                   # Authenticated screens (home, profile)
│   ├── auth/                  # Auth screens (onboard, login, signup, otp, forgotPassword)
│   └── splash/                # Splash screen
│
├── themes/                    # Theming
│   ├── globalStyles/          # Global style utilities
│   ├── list/                  # Light & dark theme definitions
│   └── themeContext/          # ThemeProvider + useTheme hook
│
└── utils/                     # Utilities
    ├── pixelate/              # Screen dimension utilities
    ├── responsiveUtils/       # Responsive sizing
    ├── storage/               # MMKVStorageAdapter, SecureStorage (Keychain master key)
    └── utils-func/            # Helper functions, encryption
```

---

## Getting Started

### Prerequisites

- Node.js >= 22.11
- pnpm (used by `deep-clean` script) or npm
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Installation

```bash
# Initialize a new project from this template
npx @react-native-community/cli init <YOUR-APP-NAME> \
  --template "https://github.com/dev-neerajkumarsingh/RN_Temp_BY_NEERAJ.git"

cd <YOUR-APP-NAME>

# Install dependencies (also reinstalls pods on iOS via the deep-clean script)
npm run deep-clean
```

### Running the App

```bash
# Start Metro bundler (resets cache + watchman)
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Renaming the App

```bash
npm run rename -- "Your New App Name"
```

---

## Components

All components are wrapped in `React.memo` and use `useMemo` / `useCallback` for performance.

### CommonButton

A versatile button component supporting text, SVG icons, and images.

```tsx
import { CommonButton } from '@components';

// Text button
<CommonButton
  label="Submit"
  onPress={handleSubmit}
  width="100%"
  height={48}
/>

// Icon button
<CommonButton
  contentType="localSvg"
  svgType="arrowleft"
  svgColor="primary"
  imgWidth={24}
  imgHeight={24}
  onPress={handleBack}
/>

// Loading state
<CommonButton
  label="Submit"
  loader={isLoading}
  disabled={isLoading}
  onPress={handleSubmit}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `DimensionValue` | `'100%'` | Button width |
| `height` | `DimensionValue` | `responsiveHeight(6)` | Button height |
| `contentType` | `'text' \| 'localSvg' \| 'localNonSvg' \| 'uri'` | `'text'` | Content type |
| `label` | `string` | – | Button text |
| `textColor` | `ColorKey \| string` | theme primary | Text color (theme key or raw value) |
| `fontSize` | `number` | `14` | Font size |
| `fontType` | `FontTypes` | `'Clash_MEDIUM'` | Font family |
| `svgType` | `IconTypes` | – | SVG icon name |
| `svgColor` | `ColorKey \| string` | – | SVG color |
| `disabled` | `boolean` | `false` | Disabled state |
| `loader` | `boolean` | `false` | Show loading indicator |
| `onPress` | `() => void` | – | Press handler |
| `onLongPress` | `() => void` | – | Long press handler |

---

### CommonInput

A feature-rich text input with floating label support, icons, and error display.

```tsx
import { CommonInput } from '@components';

<CommonInput
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  leftIcon="email"
  msgError={emailError}
/>

// Password input with toggle
<CommonInput
  placeholder="Password"
  value={password}
  onChangeText={setPassword}
  secureTextEntry={!showPassword}
  rightIcon={showPassword ? 'eye_show' : 'eye_hide'}
  onPressRightIcon={() => setShowPassword(!showPassword)}
/>
```

**Props (selected):**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Input value |
| `onChangeText` | `(text: string) => void` | **required** | Change handler |
| `placeholder` | `string` | – | Placeholder text |
| `keyboardType` | `'default' \| 'numeric' \| 'email-address' \| 'phone-pad'` | `'default'` | Keyboard type |
| `secureTextEntry` | `boolean` | `false` | Password mode |
| `leftIcon` / `rightIcon` | `IconTypes` | – | Icon names |
| `onPressRightIcon` | `(text: string) => void` | – | Right icon press handler |
| `msgError` | `string` | – | Error message |
| `disableError` | `boolean` | `false` | Hide error display |
| `enableFloatingLabel` | `boolean` | `false` | X-style animated label |
| `focusedBorderColor` | `ColorKey \| string` | – | Border color when focused |
| `multiline` | `boolean` | `false` | Multiline mode |
| `maxLength` | `number` | `100` | Max character length |
| `renderLeftIcon` / `renderRightIcon` | `() => ReactNode` | – | Custom renderers |

---

### CommonText

Typography component with font family and responsive sizing support.

```tsx
import { CommonText } from '@components';

<CommonText
  content="Hello World"
  fontSize={16}
  fontType="InterBold"
  color="text1"
  textAlign="center"
/>

<CommonText
  content={longText}
  numberOfLines={2}
  ellipsizeMode="tail"
/>
```

---

### CommonImage

Unified image component supporting SVGs, local assets, and remote URLs with fade-in animation.

```tsx
import { CommonImage } from '@components';

<CommonImage
  sourceType="localSvg"
  svgSource="arrowleft"
  width={24}
  height={24}
  color="text1"
/>

<CommonImage
  sourceType="url"
  source="https://example.com/image.jpg"
  width={200}
  height={150}
  resizeMode="cover"
/>

<CommonImage
  sourceType="localNonSvg"
  source={require('./assets/logo.png')}
  width={100}
  height={100}
/>
```

---

### CommonBox

Main screen container with StatusBar, scroll, and keyboard handling.

```tsx
import { CommonBox } from '@components';

<CommonBox
  useScrollView
  useKeyboardAvoidingView
  statusBarStyle="light-content"
>
  <YourFormContent />
</CommonBox>

// Modal variant
<CommonBox isModal>
  <ModalContent />
</CommonBox>
```

---

### CommonBottomSheet

Gesture-enabled bottom sheet with smooth Reanimated animations.

```tsx
import { CommonBottomSheet } from '@components';

<CommonBottomSheet
  isVisible={showSheet}
  onClose={() => setShowSheet(false)}
  isScrollable
>
  {() => <View><Text>Sheet Content</Text></View>}
</CommonBottomSheet>
```

---

### CommonDropDown

Animated dropdown selector with configurable styling.

```tsx
import { CommonDropDown } from '@components';

<CommonDropDown
  initialData={['Option 1', 'Option 2', 'Option 3']}
  selectedValue={selected}
  onPressSelected={setSelected}
  highLightSelectedValue
/>
```

---

### CommonTopTabs

Tab navigation component with customizable styling.

```tsx
import { CommonTopTabs } from '@components';

<CommonTopTabs
  tabs={['Tab 1', 'Tab 2', 'Tab 3']}
  activeTab={activeTab}
  onChangeTab={setActiveTab}
  tabType={1}
/>
```

---

### CommonToaster

Global toast notification system, driven by the Zustand UI store.

```tsx
import { showToast } from '@stores';

// Anywhere — no hook required
showToast({
  type: 'success',
  title: 'Success!',
  message: 'Operation completed successfully',
  duration: 3000,
});

showToast({
  type: 'error',
  title: 'Error',
  message: 'Something went wrong',
  duration: 5000,
});

// Toast types: 'success' | 'error' | 'info' | 'warn'
```

`<CommonToaster />` is mounted once in `InitialNavigator` and reads state from `useUIStore`.

---

### CommonPopup & CommonErrorScreen

Both are mounted globally in `InitialNavigator` and driven by the Zustand UI store.

```tsx
import { showPopup, showErrorScreen } from '@stores';

showPopup({
  title: 'Are you sure?',
  buttonLabel: 'Yes',
  onPressType: 'logout',
});

showErrorScreen({
  title: 'Oops!',
  message: 'No internet connection.',
  buttonLabel: 'Try again',
  networkConfig: error.config ?? null,
});
```

The error screen also auto-shows on offline detection (axios response interceptor).

---

### Loader, Shimmer & BaseLoader

Loading indicators sharing a single `BaseLoader` implementation.

```tsx
import { Shimmer, Loader } from '@components';
import { showLoader, hideLoader } from '@stores';

// Global loader — driven by the Zustand UI store
showLoader();
hideLoader();
// <Loader /> is mounted once in InitialNavigator

// Local shimmer
<Shimmer loaderStatus={isLoading} />
```

---

### CommonOtpInput

OTP input with auto-advance, paste support, and validation.

```tsx
import { CommonOtpInput } from '@components';

const [otp, setOtp] = useState(['', '', '', '', '', '']);
const [isValid, setIsValid] = useState(false);

<CommonOtpInput
  otp={otp}
  setOtp={setOtp}
  otpLength={6}
  onValidationChange={setIsValid}
/>
```

---

### CommonImagePickerModal

Image picker with camera and gallery support, permissions handling, and cropping (uses `react-native-image-crop-picker`).

```tsx
import { CommonImagePickerModal } from '@components';

<CommonImagePickerModal
  isVisible={showPicker}
  onPressClose={() => setShowPicker(false)}
  onSelectImage={(image) => {
    console.log(image.path, image.mime, image.size);
  }}
  onError={(error) => console.error(error)}
  enableCropping
  cropperCircleOverlay
  compressQuality={0.8}
/>
```

---

### ImageViewModal & WebViewModal

Full-screen image viewer and an in-app WebView modal, both available from `@components`.

---

## State Management

State is split into two layers:

- **Redux Toolkit** for persistent domain state (`auth`, `lang`, `theme`) — survives app restarts via `redux-persist` + encrypted MMKV.
- **Zustand** for ephemeral UI state (`loader`, `toast`, `popup`, `errorScreen`) — fast, component-free updates with non-hook helpers usable from interceptors.

### Redux Store Structure

```typescript
{
  auth: {
    isAuthenticated: boolean;
    userData: any;
    accessToken: string | null;
    refreshToken: string | null;
  },
  lang: {
    selectedLang: string;
  },
  theme: {
    theme: AppTheme;
  }
}
```

The persist whitelist is `['auth', 'theme', 'lang']`.

### Using Redux

```tsx
import { useAppDispatch, useAppSelector } from '@redux';
import { loginReducer, logoutReducer, refreshTokenReducer } from '@redux';

const { isAuthenticated, userData } = useAppSelector(state => state.auth);
const dispatch = useAppDispatch();

dispatch(loginReducer({
  userData,
  accessToken,
  refreshToken,
}));

dispatch(refreshTokenReducer({ accessToken, refreshToken }));
dispatch(logoutReducer());
```

### Zustand UI Store (`@stores`)

```tsx
import {
  useUIStore,
  showToast, hideToast,
  showLoader, hideLoader,
  showPopup, hidePopup,
  showErrorScreen, hideErrorScreen,
} from '@stores';

// Inside a component — selector subscription
const loaderVisible = useUIStore(state => state.loader.status);

// Anywhere (interceptors, services, plain functions)
showLoader();
showToast({ type: 'info', message: 'Saved', duration: 2000 });
```

### Available Actions

| Layer | Slice / Store | Actions |
|-------|--------------|---------|
| Redux | `auth` | `loginReducer`, `logoutReducer`, `refreshTokenReducer` |
| Redux | `lang` | `selectLang`, `defaultLang` |
| Redux | `theme` | `selectTheme`, `defaultTheme` |
| Zustand | `useUIStore.loader` | `showLoader`, `hideLoader` |
| Zustand | `useUIStore.toast` | `showToast`, `hideToast` |
| Zustand | `useUIStore.popup` | `showPopup`, `hidePopup` |
| Zustand | `useUIStore.errorScreen` | `showErrorScreen`, `hideErrorScreen` |

### Encrypted Persistence

Redux state is persisted through `MMKVStorageAdapter`, which wraps an MMKV instance encrypted with a 256-bit master key kept in the OS Keychain (`AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY` accessibility). The same MMKV instance is reused by the TanStack Query persister.

---

## Networking Layer

### Architecture

The network layer is split into focused units:

| File | Responsibility |
|------|---------------|
| `network/client/axiosClient.ts` | Single shared `axios.create({...})` instance |
| `network/client/interceptors.ts` | Auth token injection, AES request/response encryption, 401 logout, offline error screen |
| `network/middleware/Network_Manager.ts` | Thin wrapper that runs the request and normalizes the response into `NetworkResponse<T>` |
| `network/networkCache/queryClient.ts` | TanStack Query `QueryClient`, NetInfo bridge, global error toast |
| `network/networkCache/QueryProvider.tsx` | `PersistQueryClientProvider` wiring |
| `network/networkCache/queryPersister.ts` | Cache persister using the encrypted MMKV instance |
| `network/networkCache/queryKeys.ts` | Centralized query-key factory |

`NetworkManager` deliberately does **not** touch Redux or the UI store, dispatch toasts, or branch on endpoint strings — those concerns live in interceptors and TanStack Query's per-query handlers.

### NetworkManager

```tsx
import { NetworkManager } from '@network';
import { API } from '@network/apis/endpoints/Endpoints';

const response = await NetworkManager({
  api: API.Authenticated.FETCH_PROFILE,
  apiParams: { userId: 123 },
});

if (response.success) {
  console.log(response.data);
} else {
  console.error(response.error);
}

// Multipart request (build FormData at the call site)
const fd = new FormData();
fd.append('profilePic', file);
fd.append('reqData', UtilsFunc.encryptData(JSON.stringify(payload)));

await NetworkManager({
  api: API.NonAuthenticated.SIGNUP,
  apiFormData: fd,
});
```

### NetworkResponse Type

```typescript
interface NetworkResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: string;
  code: number;
  message: string;
}
```

### TanStack Query Hooks

Pre-built mutation and query hooks live in `network/apis/services/`.

```tsx
import {
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
  useUpdateToken,
  useUserProfileQuery,
  usePrivacyPolicyQuery,
  useTermsConditionQuery,
} from '@network';

// Mutation
const login = useLoginMutation({
  onSuccess: (res) => {
    if (res.success) {
      dispatch(loginReducer({ userData: res.data, accessToken, refreshToken }));
    }
  },
});

login.mutate({ email, password });

// Query — guard with `enabled` so it doesn't fire on the login screen
const { data, isLoading } = useUserProfileQuery({ enabled: isAuthenticated });
```

### Offline Behavior

- `onlineManager` is bridged to `@react-native-community/netinfo` so queries pause on connectivity loss and resume on reconnect.
- The default `networkMode` is `'offlineFirst'` for both queries and mutations — cached data is served immediately and the network call is queued.
- The TanStack Query cache is persisted to encrypted MMKV (24h `maxAge`, `buster: 'v1'` — bump it when query shapes change).
- The axios response interceptor shows a retryable error screen when offline and clears it on the next successful response.

### Defining API Endpoints

Add endpoints in `src/network/apis/endpoints/Endpoints.ts`:

```typescript
export const API = {
  NonAuthenticated: {
    PRIVACY_POLICY:    { endpoint: 'privacy-policy',         method: HTTP_METHODS.GET  },
    TERMS_CONDITION:   { endpoint: 'user/v1/account/list',   method: HTTP_METHODS.GET  },
    LOGIN:             { endpoint: 'user/v1/auth/login',     method: HTTP_METHODS.POST },
    SIGNUP:            { endpoint: 'api/user/v1/auth/register', method: HTTP_METHODS.POST },
    FORGET_PASSWORD:   { endpoint: 'auth/forgot-password',   method: HTTP_METHODS.POST },
    SENDOTP:           { endpoint: 'api/user/v1/auth/sendotp', method: HTTP_METHODS.POST },
  },
  Authenticated: {
    LOGOUT:        { endpoint: 'auth/logout',        method: HTTP_METHODS.GET },
    REFRESH_TOKEN: { endpoint: 'auth/refresh-token', method: HTTP_METHODS.GET },
    FETCH_PROFILE: { endpoint: 'profile',            method: HTTP_METHODS.GET },
  },
};
```

### Query Keys

```typescript
import { queryKeys } from '@network';

queryClient.invalidateQueries({ queryKey: queryKeys.authenticated.all });
queryClient.invalidateQueries({ queryKey: queryKeys.authenticated.profile() });
```

---

## Navigation

### Navigation Tree

```
InitialNavigator (Providers + global overlays)
└── ThemedNavigationContainer
    └── RootNavigator
        ├── SplashStack
        │   └── Splash (auth check)
        ├── AuthStack       (non-authenticated)
        │   ├── Onboard
        │   ├── Login
        │   ├── Signup
        │   ├── ForgotPassword
        │   └── OTP
        └── AppStack        (authenticated)
            ├── Home
            └── Profile
```

`InitialNavigator` also mounts `<Loader />`, `<CommonToaster />`, `<CommonPopup />`, and `<CommonErrorScreen />` once at the root so they're available app-wide.

### Using Navigation

```tsx
import { useNavs } from '@hooks';

useNavs.navigate('Home', { userId: 123 });
useNavs.goback();
useNavs.push('Profile', { userId: 123 });
useNavs.replace('Login');
useNavs.pop(2);

useNavs.reset({
  index: 0,
  routes: [{ name: 'AppStack' }],
});
```

The shared `navigationRef` is also exported from `@hooks` for use outside React components.

---

## Theming

The theme provider is local React state with three modes — `light`, `dark`, `system` — and reactively follows the OS color scheme when in `system` mode. It also drives the StatusBar style.

### Using the Theme

```tsx
import { useTheme } from '@themes';

const MyComponent = () => {
  const { theme, themeMode, isDark, setThemeMode, toggleTheme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.primary }}>
      <Text style={{ color: theme.colors.text1 }}>
        Mode: {themeMode} (dark: {String(isDark)})
      </Text>
      <Button title="Dark" onPress={() => setThemeMode('dark')} />
      <Button title="Light" onPress={() => setThemeMode('light')} />
      <Button title="System" onPress={() => setThemeMode('system')} />
      <Button title="Toggle" onPress={toggleTheme} />
    </View>
  );
};
```

### Theme Shape

```typescript
{
  name: 'light' | 'dark',
  colors: {
    // Primary
    primary, secondary, tertiary, quaternary, quinary, senary,
    // Status
    error, success, warning, info,
    // Light status (backgrounds)
    lightError, lightSuccess, lightWarning, lightInfo,
    // Text
    text1, text2, lightText,
    // Misc
    borderColor1, grey1, grey2, white, black, transparent0,
    background, // ...and more
  }
}
```

### Global Styles

```tsx
import { useTheme, GlobalStyles } from '@themes';

const { theme } = useTheme();
const globalStyles = GlobalStyles(theme);

<View style={[globalStyles.commonShadow, globalStyles.centerContent]} />

// Available helpers:
// - centerContent, commonBox, commonModalBox, commonShadow
```

---

## Hooks

### useValidators

Form validation utilities.

```tsx
import { useValidators } from '@hooks';

useValidators.email('test@example.com');
// → { status: true, msg: '' } | { status: false, msg: 'Email ID is not valid' }

useValidators.phoneNumber('9876543210');
// → must be 10 digits, must start with 6/7/8/9, must not be all-same digits

useValidators.password('Test@1234');
// → ≥ 8 chars, 1 uppercase, 1 digit, 1 special

useValidators.otp(['1', '2', '3', '4', '5', '6']);
```

### useTryCatch

Promise error-handling utility with a discriminated-union return.

```tsx
import { useTryCatch } from '@hooks';

const { data, error } = await useTryCatch(someAsyncFn());
if (error) {
  console.error(error);
} else {
  console.log(data);
}
```

### useNavs / navigationRef

See [Navigation](#navigation).

### useAppDispatch / useAppSelector

Typed Redux hooks — see [State Management](#state-management).

---

## Utilities

### Responsive Sizing

```tsx
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '@utils';

const h = responsiveHeight(10);  // 10% of screen height
const w = responsiveWidth(50);   // 50% of screen width
```

### Pixelate Utilities

```tsx
import { Pixelate } from '@utils';

Pixelate.widthNormalizer(100);
Pixelate.heightNormalizer(100);
Pixelate.fontPixel(16);
Pixelate.screenWidth;
Pixelate.screenHeight;
```

### Encryption Utilities

```tsx
import { UtilsFunc } from '@utils';

const encrypted = UtilsFunc.encryptData(JSON.stringify(data)); // AES-256-CBC
const decrypted = JSON.parse(UtilsFunc.decryptData(encrypted));
```

### Secure Storage (MMKV)

```tsx
import { initSecureStorage, getSecureStorage, MMKVStorageAdapter } from '@utils';

// Bootstrap (called once in index.js to warm up the master key)
await initSecureStorage();

// Read/write directly after init
const storage = getSecureStorage();
storage.set('key', 'value');
storage.getString('key');

// Or use MMKVStorageAdapter as a redux-persist storage backend
```

---

## Security

### API Encryption

- **Algorithm:** AES-256-CBC, performed in the axios request/response interceptors.
- **Request encryption:** JSON bodies are wrapped as `{ reqData: <ciphertext> }`. FormData payloads encrypt only the `reqData` field — file parts pass through.
- **Query parameters:** Object query params are also encrypted into `{ reqData: <ciphertext> }`.
- **Response decryption:** The response interceptor parses `{ data: <ciphertext> }` into the decrypted payload before it reaches `NetworkManager`.

### Encrypted Storage

- A single encrypted MMKV instance (`secure.store`) backs both `redux-persist` and the TanStack Query cache.
- The MMKV encryption key is a 256-bit value generated on first launch and stored in the OS Keychain (`AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY`).
- `initSecureStorage()` is called in `index.js` so the master key is warm before persistors attach.

### Token Management

- Access tokens live in Redux `auth` (persisted via the encrypted MMKV adapter).
- The axios request interceptor injects the access token into the `Authorization` header on every request.
- **401 handling:** the response interceptor dispatches `logoutReducer()` and shows a session-expired toast.
- A `refreshTokenReducer` and `useUpdateToken` hook are wired up for refresh flows.

---

## Path Aliases

Defined in both `babel.config.js` (module-resolver) and `tsconfig.json` (paths):

```typescript
@icons      → ./src/assets/icons/index.ts
@fonts      → ./src/assets/fonts/index.ts
@components → ./src/common/components/index.ts
@constants  → ./src/common/constants/index.ts
@hooks      → ./src/common/hooks/index.ts
@routes     → ./src/routes/index.ts
@screens    → ./src/screens/index.ts
@network    → ./src/network/index.ts
@redux      → ./src/redux/index.ts
@stores     → ./src/stores/index.ts
@themes     → ./src/themes/index.ts
@utils      → ./src/utils/index.ts
```

---

## Adding New Icons

1. Add your SVG file to `src/assets/icons/list/`.
2. Import and re-export it in `src/assets/icons/index.ts`.
3. Add the icon name to the `IconTypes` union.
4. Register the component in the `SVG_COMPONENTS` map in `CommonImage.tsx`:

```tsx
const SVG_COMPONENTS: Record<IconTypes, React.FC<any>> = {
  // ...
  your_icon: YourIconSvg,
};
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Reset watchman + Metro cache and start the bundler |
| `npm run android` | Run on Android |
| `npm run android-clean` | `gradlew clean` then run on Android |
| `npm run android-release` | Build the prod release APK/AAB |
| `npm run ios` | Run on iOS |
| `npm run ios-clean` | Wipe Pods + build, reinstall pods, run on iOS |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Jest tests |
| `npm run deep-clean` | Wipe `node_modules`, gradle, pods, build artifacts, and reinstall via pnpm |
| `npm run rename` | Rename the app via `react-native-rename` |
| `npm run prepare` | Husky setup (runs automatically after install) |

---

## Git Conventions

### Branch Naming

All branches must follow this naming convention — the CI pipeline will reject branches that don't match:

| Prefix | When to Use | Example |
|--------|-------------|---------|
| `feature/` | New features, screens, or enhancements | `feature/add-profile-screen` |
| `bugFix/` | Bug fixes | `bugFix/fix-login-crash` |

### Commit Message Format

This project enforces **Conventional Commits**. Every commit message must follow:

```
type(optional-scope): description
```

**Available types:**

| Type | When to Use | Example |
|------|-------------|---------|
| `feat` | New feature or capability | `feat: add forgot password screen` |
| `fix` | A bug fix | `fix: resolve crash on empty cart` |
| `refactor` | Restructuring code without changing behavior | `refactor: extract API logic into custom hook` |
| `style` | Visual/UI changes or code formatting | `style: update login button colors to match theme` |
| `chore` | Maintenance — deps, CI, build scripts | `chore: upgrade react-native to 0.84` |
| `docs` | Documentation only | `docs: add setup instructions to README` |
| `perf` | Performance improvements | `perf: memoize FlatList renderItem` |
| `test` | Adding or updating tests | `test: add unit tests for login screen` |

**Scope** (optional): which module/area is affected.

Examples: `feat(auth): implement biometric login`, `fix(navigation): back button not working on Android`, `refactor(redux): simplify auth slice`.

---

## CI/CD Pipeline

The project ships a 4-stage GitLab CI pipeline that runs automatically on every Merge Request. All stages must pass before merging.

### Pipeline Stages

| Stage | Job | What It Checks |
|-------|-----|---------------|
| 1. Compliance | `compliance_checks` | Branch naming convention, MR size limit (max 50 files), conventional commit messages |
| 2. Code Quality | `eslint` | Linting via `@react-native/eslint-config` |
| | `typescript` | `tsc --noEmit` in strict mode |
| | `prettier` | Formatting consistency |
| 3. Structural Review | `danger_review` | Folder structure, import discipline, optional chaining patterns, barrel exports, sensitive files, naming |
| 4. AI Review | `ai_review` | Claude-powered review against project guidelines (only if all previous stages pass) |

### What Gets Checked

**Compliance (Stage 1):** branch starts with `feature/` or `bugFix/`; conventional commits; ≤ 50 non-asset files.

**Code Quality (Stage 2):** ESLint (no inline styles, no unused vars, file size limits), TypeScript strict, Prettier.

**Structural Review (Stage 3 — Danger.js):**
- MR description ≥ 20 chars; no new `.js` files (TypeScript only).
- Screens, hooks, components, network, and redux files must live in correct directories.
- No direct `axios`, `fetch()`, or `AsyncStorage` imports — use `NetworkManager` and the encrypted MMKV adapter via `redux-persist`.
- No `console.log` in production code.
- Use path aliases (`@components`, `@hooks`, …) over deep relative imports.
- Use theme colors over hardcoded hex.
- Update barrel `index.ts` files when adding new modules.
- No `.env` file changes in feature MRs.
- Optional-chaining sanity (excessive depth, redundant `?.`, missing `?.` on API responses, contradictory `?.` with `!`).

**AI Review (Stage 4):** Claude analyzes the full MR diff against project guidelines and posts feedback with severity levels (BLOCKER, WARNING, SUGGESTION) directly on the MR.

---

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

---

## License

MIT License
