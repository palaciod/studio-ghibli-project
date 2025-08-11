import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';
import { schema } from '~/schema';
import { logger } from '~/loggers';
import pinoLogger from '~/apolloPlugins/logger';
import { NODE_ENV } from '~/config';

export function createExpressApp() {
  const app = express();

  app.use(
    cors({
      exposedHeaders: ['Authorization'],
    }),
  );

  app.use(
    helmet({
      contentSecurityPolicy: {
        // these directives are required for the Apollo sandbox to work
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );

  app.get('/healthz', (_req, res) => {
    res.send('Ok');
  });

  return app;
}

export function createApolloServer(httpServer: http.Server) {
  const isProduction = NODE_ENV === 'production';
  const isTest = NODE_ENV === 'test';

  const server = new ApolloServer({
    schema,
    introspection: !isProduction,
    csrfPrevention: isProduction,
    ...(!isTest && { logger: logger }),
    plugins: [
      // sentryPlugin,
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ...(!isTest ? [pinoLogger] : []),
    ],
  });

  return server;
}
