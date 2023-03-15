#!/bin/ash

yarn prisma migrate deploy
node index.js
