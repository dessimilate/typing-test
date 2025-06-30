#!/bin/sh

# Ждем пока PostgreSQL будет готов принимать подключения
echo "Waiting for PostgreSQL to start..."
while ! nc -z db 5432; do
  sleep 1
done

echo "PostgreSQL started, applying migrations..."
yarn prisma migrate deploy --schema=./prisma/schema.prisma

echo "Starting application..."
yarn prod