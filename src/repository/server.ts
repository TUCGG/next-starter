import 'server-only';

import {apiServer} from '@/api/server';

import {createCommonRepository} from './common.repository';
import type {IRepository} from './index';

/** 통합 레파지토리 구현체 (서버 - apiServer) - Server Component / Server Action / Route Handler 전용 */
const repository: IRepository = {
  common: createCommonRepository(apiServer)
  // login: createLoginRepository(apiServer)
};

export default repository;
