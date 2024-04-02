import { createClient } from "redis";
import { logger } from "./log";

let redisClient: any;

async function runRedis(): Promise<void> {
  redisClient = createClient({
    url: process.env.REDIS_URL
  });
  await redisClient.connect();
  logger.info('redis was connected with success')
}
runRedis();

export const redis = redisClient;