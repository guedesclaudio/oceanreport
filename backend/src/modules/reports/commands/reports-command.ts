import { logger } from "../../../config";
import reportService from "../services/report-service";
import schedule from 'node-schedule';

schedule.scheduleJob('* * * * *', async function(){
    await reportService.generateReport();
    logger.info(`[COMMANDS - runCommandsReports] Running report command, and update data on cache`);
});

