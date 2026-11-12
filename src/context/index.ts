import {ContextCombineProvider} from '@/providers/index';

import DeviceContextProvider from './device.context';
import WebviewContextProvider from './webview.context';

const AppContextProviders = ContextCombineProvider([
  [DeviceContextProvider, {platform: null}],
  [WebviewContextProvider, {identifier: 'bbc'}] // UA 식별자
]);

export default AppContextProviders;
