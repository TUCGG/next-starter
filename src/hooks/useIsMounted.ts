import {useEffect, useState} from 'react';

/**
 * useIsMounted
 * @description 컴포넌트가 마운트 되었는지 여부를 반환하는 훅
 *
 * @example
 * const ExampleComponent = () => {
 *  const isMounted = useIsMounted();
 *
 *  useEffect(() => {
 *    if (!isMounted) { return; }
 *  }, [isMounted]);
 *
 *  return (...);
 * });
 */
const useIsMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState(false);

  /** Life Cycle */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};

export default useIsMounted;
