import { AppRegistry } from 'react-native';
import { InitialNavigator } from './src/routes/initialNavigator/InitialNavigator';
import { initSecureStorage } from './src/utils/storage';
import { name as appName } from './app.json';

// Kick off the secure-storage master-key fetch ASAP so MMKV is warm
// by the time redux-persist and network interceptors need it.
initSecureStorage();

AppRegistry.registerComponent(appName, () => InitialNavigator);
