'use client';

import {useEffect, useState} from 'react';
import {useFormStatus} from 'react-dom';

import * as Shared from '@/shared/index';

import {type TTestResponse, TestSchema} from '@/repository/common.repository';
import repository from '@/repository/index';

import {refreshComments} from './actions';

/** 클라이언트 XHR 테스트 (repository/index → apiClient) */
export const ClientComments = () => {
  const [users, setUsers] = useState<TTestResponse>([]);

  /** Life Cycle */
  useEffect(() => {
    (async () => {
      const {data} = await repository.common.getTest();

      // [D] 응답 데이터 모델 밸리데이션
      Shared.zod.schemaValid({acName: 'acCommonGetTest', schema: TestSchema, data});

      setUsers(data);
    })();
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>이메일: {user.email}</li>
      ))}
    </ul>
  );
};

const RefreshButton = () => {
  const {pending} = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? '갱신 중...' : '서버 캐시 갱신 (Server Action)'}
    </button>
  );
};

/** Server Action 폼 테스트 (캐시 태그 무효화) */
export const RefreshForm = () => {
  return (
    <form action={refreshComments}>
      <RefreshButton />
    </form>
  );
};
