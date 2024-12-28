###################################### DEVELOPMENT
FROM node:20.11-alpine AS development

USER node

ENV NODE_ENV=development

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node prisma ./prisma/

RUN npx prisma generate

COPY --chown=node:node . .

###################################### BUILD
FROM development AS build

USER node 

RUN npm run build

RUN npm ci --omit=dev

RUN npm cache clean --force

###################################### PRODUCTION
FROM node:20.11-alpine AS production

USER node

WORKDIR /app

COPY --chown=node:node --from=build /app/node_modules ./node_modules

COPY --chown=node:node --from=build /app/dist ./dist

COPY --chown=node:node --from=build /app/prisma ./prisma

COPY --chown=node:node --from=build /app/.env ./.env

CMD ["node", "dist/src/main"]