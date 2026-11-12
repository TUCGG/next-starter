'use client';

import {createContext, useLayoutEffect, useState} from 'react';
import {getSelectorsByUserAgent} from 'react-device-detect';

const DeviceContext = createContext<{
  device?: any;
  setDevice?: React.Dispatch<any>;
}>({});

type TConfigContextProps = {
  platform: any;
  children: React.ReactNode;
};

const DeviceContextProvider: React.FC<TConfigContextProps> = ({platform, children}) => {
  const [device, setDevice] = useState(platform);

  // 서버 렌더링에는 UA가 없으므로 마운트 후 브라우저 UA로 판별
  useLayoutEffect(() => {
    setDevice(getSelectorsByUserAgent(window.navigator.userAgent));
  }, []);

  return <DeviceContext value={{device, setDevice}}>{children}</DeviceContext>;
};

export default DeviceContextProvider;
