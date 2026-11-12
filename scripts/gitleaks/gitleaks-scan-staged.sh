#!/usr/bin/env sh
set -e

if [ -f environment/tools/.env.gitleaks.local ]; then
  . ./environment/tools/.env.gitleaks.local
elif [ -f .env.gitleaks.local ]; then
  . ./.env.gitleaks.local
fi

GITLEAKS_IMAGE="${GITLEAKS_IMAGE:-ghcr.io/gitleaks/gitleaks:latest}"
GITLEAKS_CONTAINER_NAME="${GITLEAKS_CONTAINER_NAME:-}"
DOCKER_ARGS="--rm"

if [ -n "$GITLEAKS_CONTAINER_NAME" ]; then
  DOCKER_ARGS="$DOCKER_ARGS --name $GITLEAKS_CONTAINER_NAME-staged"
fi

STAGED_FILES="$(git diff --cached --name-only --diff-filter=ACMR)"

if [ -z "$STAGED_FILES" ]; then
  echo "No staged files to scan."
  exit 0
fi

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT INT HUP TERM

if [ -f .gitleaksignore ]; then
  cp .gitleaksignore "$TMP_DIR/.gitleaksignore"
fi

if [ -f .gitleaks.toml ]; then
  cp .gitleaks.toml "$TMP_DIR/.gitleaks.toml"
fi

echo "$STAGED_FILES" | while IFS= read -r file; do
  if [ -f "$file" ]; then
    mkdir -p "$TMP_DIR/$(dirname "$file")"
    git show ":$file" > "$TMP_DIR/$file"
  fi
done

docker run $DOCKER_ARGS \
  -v "$TMP_DIR:/repo" \
  "$GITLEAKS_IMAGE" \
  detect \
  --source /repo \
  --config /repo/.gitleaks.toml \
  --no-git \
  --redact \
  --verbose \
  "$@"

##
# Git Staged secret 스캔 실행 명령어
# - 커밋에 포함될 staged 파일만 secret 탐지
# - .gitignore 된 로컬 파일은 검사하지 않음
# - .gitleaksignore, .gitleaks.toml 파일이 있으면 staged 임시 디렉터리에 복사하여 적용
# - CLI 옵션 직접 전달: npm run gitleaks:scan-staged -- --log-level debug
