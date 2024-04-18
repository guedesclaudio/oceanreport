import { logger } from "../../../config";
import { postsService } from "../services";
import schedule from 'node-schedule';

export function deleteOldPostsCommand() {
    schedule.scheduleJob('* * * * *', async function(){
        await postsService.deleteOldPosts();
        logger.info(`[COMMANDS - runCommandsPosts] Running posts command, and delete old posts on database`);
    });
}
