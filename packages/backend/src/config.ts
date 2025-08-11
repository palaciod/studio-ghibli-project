import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  LOG_LEVEL: z.string(),
  NODE_ENV: z.string(),
  PORT: z.string(),
  GRAPHQL_PATH: z.string(),
  GHIBLI_BASE_URL: z.string(),
});

const env = envSchema.parse(process.env);

export const LOG_LEVEL = env.LOG_LEVEL;
export const NODE_ENV = env.NODE_ENV;
export const PORT = env.PORT;
export const GRAPHQL_PATH = env.GRAPHQL_PATH;
export const GHIBLI_BASE_URL = env.GHIBLI_BASE_URL;
