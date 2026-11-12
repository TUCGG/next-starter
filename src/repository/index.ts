import {apiClient} from '@/api/index';

import {type ICommonRepository, createCommonRepository} from './common.repository';

// import {type ILoginRepository, createLoginRepository} from './login.repository';

// 도메인별 레파지토리 통합 인터페이스
export interface IRepository {
  common: ICommonRepository;
  // login: ILoginRepository;
}

/** 통합 레파지토리 구현체 (클라이언트 - apiClient) */
const repository: IRepository = {
  common: createCommonRepository(apiClient)
  // login: createLoginRepository(apiClient)
};

export default repository;
