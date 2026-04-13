#!/bin/bash

set -e

pnpm i
pnpm dlx prisma generate
chmod +x ./bin

sudo tee /etc/systemd/system/billing.service > /dev/null <<EOL
[Unit]
Description=Billing Service
After=network.target

[Service]
ExecStart=$(pwd)/bin
Environment="NODE_ENV=production"
Environment="DATABASE_URL=postgresql://postgres:008@localhost:5432/billing?schema=public"
Restart=always
User=$USER

[Install]
WantedBy=multi-user.target
EOL

sudo systemctl daemon-reload

echo ">>>  OK  <<<"
