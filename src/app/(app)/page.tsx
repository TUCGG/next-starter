import type {Metadata} from 'next';
import Image from 'next/image';

import sampleImg from '@/assets/images/sample.png';

export const metadata: Metadata = {
  title: '서브 제목'
};

const MainPage = () => {
  return (
    <>
      <h1>Hello World</h1>
      <h2>NEXT_PUBLIC_DOMAIN: {process.env.NEXT_PUBLIC_DOMAIN}</h2>
      <h2>NEXT_PUBLIC_NODE_ENV: {process.env.NEXT_PUBLIC_NODE_ENV}</h2>
      <Image src={sampleImg} width={200} height={200} alt="샘플 이미지" />
    </>
  );
};

export default MainPage;
