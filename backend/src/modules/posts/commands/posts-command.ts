import { logger } from "../../../config";
import { postsService } from "../services";

export function runCommandsPosts() {
    setInterval(async () => {
        await postsService.checkPostDate();
        logger.info(`[COMMANDS - runCommandsPosts] Running posts command, and delete old posts on database`);
    }, 8640 * 10000);
};