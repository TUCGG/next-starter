# Husky hook 환경에서 누락된 npm PATH를 보정해 실행 오류를 방지
if command -v npm >/dev/null 2>&1; then
  return 0 2>/dev/null || exit 0
fi

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"

# npm을 찾을 수 없으면 Node 설치 경로를 확인해 다시 탐색
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"

  if [ -f .nvmrc ]; then
    if ! nvm use --silent >/dev/null; then
      echo "husky: .nvmrc에 지정된 Node.js 버전을 사용할 수 없습니다." >&2
      echo "husky: 다음 명령으로 설치 후 다시 시도하세요: nvm install" >&2
      exit 1
    fi
  fi
fi

# 다른 Node 설치 방식에서 사용하는 기본 경로도 PATH에 추가
export PATH="$HOME/.volta/bin:$HOME/.asdf/shims:/opt/homebrew/bin:/usr/local/bin:$PATH"

if command -v npm >/dev/null 2>&1; then
  return 0 2>/dev/null || exit 0
fi

echo "husky: npm을 찾을 수 없습니다." >&2
echo "husky: Node.js를 설치하고 Git hook 실행 환경의 PATH에서 npm을 찾을 수 있게 설정하세요." >&2
echo "husky: nvm 사용자는 프로젝트 루트에서 'nvm install' 후 다시 시도하세요." >&2
exit 127
