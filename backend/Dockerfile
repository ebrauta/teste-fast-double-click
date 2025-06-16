# backend/Dockerfile

# Stage 1: Build
FROM node:22-slim AS builder

WORKDIR /app

# Copia arquivos de dependência para cache
COPY package*.json tsconfig.json ./

# Instala dependências
RUN npm ci

# Copia o código fonte
COPY src ./src
COPY src/data ./data

# Build do TypeScript
RUN npm run build

# Stage 2: Runtime
FROM node:22-slim


WORKDIR /app

# Cria o diretório /app e dá permissão para o usuário node (ou appuser)
RUN mkdir -p /app && chown -R node:node /app

# Troca para o usuário node (padrão da imagem oficial node)
USER node

# Copia apenas arquivos necessários do build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src/data ./dist/data
COPY --from=builder /app/dist ./dist

# Instala apenas dependências de produção
RUN npm ci --only=production

# Expõe a porta correta do backend
EXPOSE 8080

ENV NODE_ENV=production

# Comando para rodar o backend compilado
CMD ["node", "dist/server.js"]