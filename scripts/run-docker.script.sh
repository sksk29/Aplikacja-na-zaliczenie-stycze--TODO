#!/usr/bin/env bash
set -e

cleanup() {
  docker-compose -f docker-compose.yml down -v
  trap '' EXIT INT TERM
  exit $err
}

trap cleanup SIGINT EXIT

if ! hash docker-compose 2>/dev/null; then
  echo -e '\033[0;31mplease install docker\033[0m'
  exit 1
fi

if [ -z "$(docker network ls -qf name=^entropic$)" ]; then
  echo "Creating network"
  docker network create entropic >/dev/null
fi

COMPOSE_HTTP_TIMEOUT=120 cd "$PWD/docker" && docker-compose -f docker-compose.yml up -d --force-recreate

node ./main.js
