import { logger } from "../../../config";
import { postsService } from "../services";

export function runCommandsPosts() {
    setInterval(async () => {
        await postsService.deleteOldPosts();
        logger.info(`[COMMANDS - runCommandsPosts] Running posts command, and delete old posts on database`);
    }, (3600 * 100));
};