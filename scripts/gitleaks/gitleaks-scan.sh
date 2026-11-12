#!/usr/bin/env sh
set -e

if [ -f environment/tools/.env.gitleaks.local ]; then
  . ./environment/tools/.env.gitleaks.local
elif [ -f .env.gitleaks.local ]; then
  . ./.env.gitleaks.local
fi

GITLEAKS_IMAGE="${GITLEAKS_IMAGE:-ghcr.io/gitleaks/gitleaks:latest}"
GITLEAKS_SOURCE="${GITLEAKS_SOURCE:-/repo}"
GITLEAKS_NO_GIT="${GITLEAKS_NO_GIT:-false}"
GITLEAKS_CONTAINER_NAME="${GITLEAKS_CONTAINER_NAME:-}"
DOCKER_ARGS="--rm"

if [ -n "$GITLEAKS_CONTAINER_NAME" ]; then
  DOCKER_ARGS="$DOCKER_ARGS --name $GITLEAKS_CONTAINER_NAME"
fi

set -- detect \
  --source "$GITLEAKS_SOURCE" \
  --redact \
  --verbose \
  "$@"

if [ -f .gitleaks.toml ]; then
  set -- "$@" --config /repo/.gitleaks.toml
fi

if [ "$GITLEAKS_NO_GIT" = "true" ]; then
  set -- "$@" --no-git
fi

docker run $DOCKER_ARGS \
  -v "$PWD:/repo" \
  "$GITLEAKS_IMAGE" \
  "$@"

##
# Git secret 스캔 실행 명령어
# - 기본 실행: git 히스토리 포함 secret 탐지
# - 워킹트리만 검사: GITLEAKS_NO_GIT=true npm run gitleaks:scan
# - CLI 옵션 직접 전달: npm run gitleaks:scan -- --no-git
