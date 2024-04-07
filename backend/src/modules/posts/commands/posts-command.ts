import { logger } from "../../../config";
import { postsService } from "../services";
import schedule from 'node-schedule';

export function runCommandsPosts() {
    // setInterval(async () => {
    //     await postsService.deleteOldPosts();
    //     console.log('### deletou posts')
    //     logger.info(`[COMMANDS - runCommandsPosts] Running posts command, and delete old posts on database`);
    // }, (3600 * 1));
};

schedule.scheduleJob('* * * * *', async function(){
    await postsService.deleteOldPosts();
    console.log('### deletou posts')
    logger.info(`[COMMANDS - runCommandsPosts] Running posts command, and delete old posts on database`);
});