#!/bin/bash
set -euo pipefail

# DVA Frontend Deployment Script
# Run this from the 06_Frontend directory on the Hetzner VM:
#   chmod +x deploy.sh && ./deploy.sh
#
# Prerequisites: Node.js 18+, npm, sudo access

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="/home/fsh/dva-frontend"

echo "============================================"
echo "  DVA Frontend Deployment"
echo "============================================"
echo ""

# ----- Step 1: VM Preparation -----
echo ">>> Step 1: VM Preparation"

if [ ! -f /swapfile ]; then
  echo "  Adding 2GB swap (needed for Next.js build)..."
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  # Make persistent
  if ! grep -q '/swapfile' /etc/fstab; then
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
  fi
  echo "  Swap added."
else
  echo "  Swap already exists, skipping."
fi

if ! command -v pm2 &> /dev/null; then
  echo "  Installing PM2..."
  sudo npm install -g pm2
  echo "  PM2 installed."
  echo ""
  echo "  IMPORTANT: Run 'pm2 startup systemd' and execute the printed sudo command!"
  echo ""
else
  echo "  PM2 already installed."
fi

# ----- Step 2: Scaffold Project -----
echo ""
echo ">>> Step 2: Scaffold Project"

if [ -d "$PROJECT_DIR" ]; then
  BACKUP="${PROJECT_DIR}.bak.$(date +%s)"
  echo "  Existing project found. Backing up to $BACKUP"
  mv "$PROJECT_DIR" "$BACKUP"
fi

cd /home/fsh
echo "  Scaffolding with assistant-ui (minimal template)..."
npx -y assistant-ui@latest create dva-frontend -t minimal

cd "$PROJECT_DIR"

echo "  Installing additional dependencies..."
npm install uuid
npm install -D @types/uuid

echo "  Installing markdown rendering..."
npm install @assistant-ui/react-markdown remark-gfm

echo "  Installing UI dependencies..."
npm install lucide-react motion clsx tailwind-merge
npm install @radix-ui/react-tooltip

echo "  Removing unused AI SDK dependencies..."
npm uninstall @ai-sdk/openai ai @assistant-ui/react-ai-sdk 2>/dev/null || true

# ----- Step 3: Copy Custom Files -----
echo ""
echo ">>> Step 3: Copy Custom Files"

# Ensure directories exist
mkdir -p src/lib
mkdir -p src/app/api/chat
mkdir -p src/app/api/auth
mkdir -p src/app/login
mkdir -p src/components/assistant-ui
mkdir -p src/components/ui

# Copy source files (overwrite scaffolded files where needed)
# Lib files
cp "$SCRIPT_DIR/src/lib/n8n-adapter.ts"                    src/lib/
cp "$SCRIPT_DIR/src/lib/session.ts"                         src/lib/
cp "$SCRIPT_DIR/src/lib/utils.ts"                           src/lib/
cp "$SCRIPT_DIR/src/lib/types.ts"                           src/lib/
cp "$SCRIPT_DIR/src/lib/parse-sections.ts"                  src/lib/
cp "$SCRIPT_DIR/src/lib/company-config.ts"                  src/lib/

# API routes
cp "$SCRIPT_DIR/src/app/api/chat/route.ts"                  src/app/api/chat/
cp "$SCRIPT_DIR/src/app/api/auth/route.ts"                  src/app/api/auth/

# Pages
cp "$SCRIPT_DIR/src/app/login/page.tsx"                     src/app/login/
cp "$SCRIPT_DIR/src/app/globals.css"                        src/app/
cp "$SCRIPT_DIR/src/app/layout.tsx"                         src/app/
cp "$SCRIPT_DIR/src/app/page.tsx"                           src/app/

# Components
cp "$SCRIPT_DIR/src/components/runtime-provider.tsx"         src/components/
cp "$SCRIPT_DIR/src/components/sidebar.tsx"                  src/components/
cp "$SCRIPT_DIR/src/components/chat-header.tsx"              src/components/
cp "$SCRIPT_DIR/src/components/context-indicator.tsx"        src/components/
cp "$SCRIPT_DIR/src/components/context-warning.tsx"          src/components/
cp "$SCRIPT_DIR/src/components/quick-actions.tsx"            src/components/
cp "$SCRIPT_DIR/src/components/typing-indicator.tsx"         src/components/
cp "$SCRIPT_DIR/src/components/assistant-ui/thread.tsx"      src/components/assistant-ui/

# UI primitives
cp "$SCRIPT_DIR/src/components/ui/tooltip.tsx"               src/components/ui/

# Config
cp "$SCRIPT_DIR/src/middleware.ts"                           src/
cp "$SCRIPT_DIR/ecosystem.config.js"                        .

# Create .env.local from template
if [ ! -f .env.local ]; then
  cp "$SCRIPT_DIR/env.local" .env.local
  echo "  Created .env.local from template."
  echo "  >>> IMPORTANT: Edit .env.local and set DVA_ACCESS_PASSWORD! <<<"
else
  echo "  .env.local already exists, not overwriting."
fi

echo "  All files copied."

# ----- Step 4: Build -----
echo ""
echo ">>> Step 4: Build"
npm run build

# ----- Step 5: Start with PM2 -----
echo ""
echo ">>> Step 5: Start PM2"

# Stop existing instance if running
pm2 delete dva-frontend 2>/dev/null || true

pm2 start ecosystem.config.js
pm2 save

echo ""
echo "============================================"
echo "  Deployment Complete!"
echo "============================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Set the password in .env.local:"
echo "   nano $PROJECT_DIR/.env.local"
echo "   (change DVA_ACCESS_PASSWORD=CHANGE_ME to your password)"
echo "   Then restart: pm2 restart dva-frontend"
echo ""
echo "2. Add to /etc/caddy/Caddyfile:"
echo "   dva.sharifi.ch {"
echo "       reverse_proxy localhost:3000"
echo "   }"
echo "   Then: sudo systemctl reload caddy"
echo ""
echo "3. Add DNS A record:"
echo "   dva.sharifi.ch -> $(curl -s ifconfig.me 2>/dev/null || echo 'YOUR_VM_IP')"
echo ""
echo "4. Test:"
echo "   curl -v http://localhost:3000/login"
echo "   pm2 logs dva-frontend"
echo ""
