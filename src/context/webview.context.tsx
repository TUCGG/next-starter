'use client';

import {type FC, createContext, useRef /*Dispatch, SetStateAction, useState*/} from 'react';

interface IWebviewContextState {
  uaIdentifier: string;
  // setUaIdentifier: Dispatch<SetStateAction<string>>;
}

const WebviewContext = createContext<IWebviewContextState | null>(null);

type TWebviewContextProps = {
  identifier: string;
  children: React.ReactNode;
};

const WebviewContextProvider: FC<TWebviewContextProps> = ({identifier, children}) => {
  // const [uaIdentifier, setUaIdentifier] = useState<string>(identifier);
  const uaIdentifier = useRef<string>(identifier);

  return (
    <WebviewContext
      value={
        // {uaIdentifier, setUaIdentifier}
        {uaIdentifier: uaIdentifier.current}
      }
    >
      {children}
    </WebviewContext>
  );
};

export default WebviewContextProvider;
