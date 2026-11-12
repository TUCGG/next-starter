import {useEffect, useState} from 'react';
import {isAndroid, isIOS, isMobile} from 'react-device-detect';

/** Return 타입 정의 */
// interface IUseWebViewReturn {
//   isWebView: boolean;
//   webViewDevice: {
//     isIos: boolean;
//     isAndroid: boolean;
//   };
//   getWebViewFindValue: (key: string) => string | null;
//   webViewLogin: (accessToken: string) => void;
//   webViewClose: () => void;
// }

// 타입스크립트의 ReturnType<T> 유틸리티 타입을 사용하여 반환 타입 자동으로 추론
export type TUseWebViewReturn = ReturnType<typeof useWebView>;

/**
 * useEpochWebView
 * @description Epoch 웹뷰 커스텀 유저 에이전트 커스텀 훅
 * @param identifier
 *
 * @example
 * const ExampleComponent = () => {
 *  const {isWebView, webViewDevice, getWebViewFindValue, webViewLogin, webViewClose} = useWebView('winjoyepoch');
 *
 *  useEffect(() => {
 *    console.log('#### isWebview :: ', isWebView);
 *    console.log('#### clientID :: ', getWebViewFindValue('clientID'));
 *    console.log('#### deviceID :: ', getWebViewFindValue('deviceID'));
 *    console.log('#### isIos :: ', webViewDevice.isIos);
 *    console.log('#### isAndroid :: ', webViewDevice.isAndroid);
 *  }, []);
 *
 *  return (...);
 * });
 */
const useWebView = (identifier: string) => {
  // NOSONAR: SSR 환경 대응을 위해 typeof window 체크 유지
  const ua = typeof window !== 'undefined' && typeof navigator !== 'undefined' ? navigator.userAgent : '';

  // const ua =
  //   'Mozilla/5.0 (Linux; Android 14; SM-F711N Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/126.0.6478.71 Mobile Safari/537.36/winjoyepoch clientID=507e6ff39a0d42cbaf813fda30418fdb deviceID=e3de1209f0fe9d3a /webviewos:mobileandroid';

  // const [isWebView, setIsWebView] = useState<boolean>(false);
  const [isWebView] = useState(() => isMobile && ua.includes(identifier));
  const [webViewDevice, setWebViewDevice] = useState<{
    isIos: boolean;
    isAndroid: boolean;
  }>({
    isIos: false,
    isAndroid: false
  });

  /**
   * webViewLogin
   * @description 웹뷰 로그인
   * @param accessToken
   */
  const webViewLogin = (accessToken: string) => {
    window.location.href = `bbc://login?at=${accessToken}&it=`;
  };

  /**
   * webViewClose
   * @description 웹뷰 닫기
   */
  const webViewClose = () => {
    window.location.href = 'bbc://close';
  };

  /**
   * getWebViewFindValue
   * @description 웹뷰 유저에이전트에서 특정 키의 값 반환
   * @param key
   */
  const getWebViewFindValue = (key: string) => {
    if (isWebView && ua.includes(key)) {
      const escapeRegExp = (value: string) => value.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // key는 escapeRegExp로 정규식 특수문자를 이스케이프 처리하여 정규식 패턴 주입을 방지함
      /* eslint-disable security/detect-non-literal-regexp */
      // nosemgrep: javascript.lang.security.audit.detect-non-literal-regexp.detect-non-literal-regexp
      const reg = new RegExp(`${escapeRegExp(key)}=([^ /\\n]+)`);
      /* eslint-enable security/detect-non-literal-regexp */

      const match = reg.exec(ua);

      return match?.[1] || null;
    }

    return null;
  };

  /** Life Cycle */
  useEffect(() => {
    setWebViewDevice({
      isIos: isIOS,
      isAndroid: isAndroid
    });
  }, [isWebView]);

  // useEffect(() => {
  //   setIsWebView(isMobile && ua.includes(identifier));
  //   // setIsWebView(ua.includes(identifier));
  // }, []);

  return {isEpochWebView: isWebView, webViewDevice, getWebViewFindValue, webViewLogin, webViewClose};
};

export default useWebView;
