import { logger } from "../../../config";
import reportService from "../services/report-service";
import schedule from 'node-schedule';

export function runCommandsReports() {
    // setInterval(async () => {
    //     await reportService.generateReport();
    //     console.log('#### atualizou cache')
    //     logger.info(`[COMMANDS - runCommandsReports] Running report command, and update data on cache`);
    // }, (3600 * 1));
};

schedule.scheduleJob('* * * * *', async function(){
    await reportService.generateReport();
    console.log('#### atualizou cache');
    logger.info(`[COMMANDS - runCommandsReports] Running report command, and update data on cache`);
});

