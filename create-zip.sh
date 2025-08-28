#!/usr/bin/env bash
set -euo pipefail
PROJ="artist-way-pwa"
rm -rf "$PROJ" "${PROJ}.zip"
mkdir -p "$PROJ"
cd "$PROJ"

w(){ mkdir -p "$(dirname "$1")"; cat > "$1"; }

# ---------------------------
# Raíz
# ---------------------------
w package.json <<'EOF'
{
  "name": "artist-way-pwa",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "echo 'lint placeholder'"
  },
  "dependencies": {
    "@notionhq/client": "^2.2.14",
    "googleapis": "^131.0.0",
    "idb": "^8.0.0",
    "next": "^14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "node-ical": "^0.16.1",
    "ics": "^3.7.6",
    "iron-session": "^8.0.2",
    "formidable": "^3.5.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.30",
    "@types/react": "^18.2.66",
    "typescript": "^5.5.4",
    "@types/formidable": "^3.4.5"
  }
}
EOF

w tsconfig.json <<'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "es2020"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOF

w next.config.js <<'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { forceSwcTransforms: true }
};
module.exports = nextConfig;
EOF

w next-env.d.ts <<'EOF'
/// <reference types="next" />
/// <reference types="next/image-types/global" />
// NOTE: This file should not be edited
EOF

w .gitignore <<'EOF'
node_modules
.next
.env*
*.log
.DS_Store
EOF

w env.example <<'EOF'
NOTION_TOKEN=secret_***
NOTION_DATABASE_ID=***
NOTION_PARENT_PAGE_ID=***
GOOGLE_CLIENT_ID=***
GOOGLE_CLIENT_SECRET=***
NEXT_PUBLIC_BASE_URL=http://localhost:3000
SESSION_PASSWORD=complex_long_password_at_least_32_chars
EOF

w README.md <<'EOF'
# El Camino del Artista — PWA + Integraciones (Notion/Google/ICS)

## Requisitos
- Node 18+
- Cuenta de Notion con Integración interna
- Proyecto en Google Cloud (OAuth2) con Calendar API habilitada

## Instalación
```bash
npm i
cp env.example .env.local
# Completa credenciales .env.local
npm run dev