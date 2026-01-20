import { AppRegistry } from 'react-native';
import { InitialNavigator } from './src/routes/initialNavigator/InitialNavigator';

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => InitialNavigator);
