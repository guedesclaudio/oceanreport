import { logger } from "../../../config";
import { postsService } from "../services";

export function runCommandsPosts() {
    setInterval(postsService.checkPostDate, 86400000);
    logger.error(`[COMMANDS - runCommandsPosts] Running posts command, and delete old posts on database`);
};