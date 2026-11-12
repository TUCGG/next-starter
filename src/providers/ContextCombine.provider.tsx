import {ComponentProps, ComponentType} from 'react';

/** Props 타입 정의 */
type TCombineProviderProps = [ComponentType<any>, ComponentProps<any>?][];

/**
 * ContextCombineProvider
 * @description 멀티 병합 Context 프로바이더
 * @param providers
 * @constructor
 * @see https://egor-xyz.medium.com/how-to-combine-providers-in-react-e553a155d0b9
 *
 * @example
 * import SampleContextProvider from '@/context/sample.context';
 *
 * const AppContextProviders = ContextCombineProvider([
 *   [SampleContextProvider, {...}]
 * ]);
 *
 * export default AppContextProviders;
 */
const ContextCombineProvider = (providers: TCombineProviderProps): React.FC<{children?: React.ReactNode}> =>
  providers.reduce(
    (AccumulatedProviders, [Provider, props = {}]) =>
      ({children}) => (
        <AccumulatedProviders>
          <Provider {...props}>
            <>{children}</>
          </Provider>
        </AccumulatedProviders>
      ),
    ({children}: {children?: React.ReactNode}) => <>{children}</>
  );

export default ContextCombineProvider;
