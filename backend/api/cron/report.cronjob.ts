import { logger } from '../../src/config'
import reportService from "../../src/modules/reports/services/report-service";
import schedule from 'node-schedule';

export async function reportCommand() {
    //schedule.scheduleJob('* * * * *', async function(){
        await reportService.generateReport();
        logger.info(`[COMMANDS - runCommandsReports] Running report command, and update data on cache`);
        console.log(`[COMMANDS - runCommandsReports] Running report command, and update data on cache`);
    //});
} 
