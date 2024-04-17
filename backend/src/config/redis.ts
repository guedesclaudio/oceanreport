import { createClient } from "redis";
import { logger } from "./log";
import { deleteOldPostsCommand } from "../modules/posts/commands";
import { reportCommand } from "../modules/reports/commands";

let redisClient: any;

async function runRedis(): Promise<void> {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URL
    });
    await redisClient.connect();
    logger.info('Redis was connected with success');
  } catch (error) {
    logger.error(`Redis was connected with error. Error: ${error}`);
  }
}
runRedis();
reportCommand();
deleteOldPostsCommand();

export const redis = redisClient;