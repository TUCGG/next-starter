// https://nextjs.org/docs/app/api-reference/file-conventions/not-found

const NotFound = () => {
  // [D] 정적 404 페이지로 이동이 필요한 경우 (서버 컴포넌트)
  // redirect(process.env.NEXT_PUBLIC_STATIC_PAGE_NOT_FOUND);

  return <h1>페이지를 찾을 수 없습니다.</h1>;
};

export default NotFound;
