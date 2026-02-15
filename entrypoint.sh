#!/bin/sh

echo "🌱 Running database seeds..."
npm run seed

echo "🚀 Starting application..."
npm run start:dev
