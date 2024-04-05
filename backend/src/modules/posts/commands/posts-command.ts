import { logger } from "../../../config";
import { postsService } from "../services";

export function runCommandsPosts() {
    setInterval(async () => await postsService.checkPostDate(), 86400000);
    logger.info(`[COMMANDS - runCommandsPosts] Running posts command, and delete old posts on database`);
};