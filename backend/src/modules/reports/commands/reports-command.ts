import { logger } from "../../../config";
import reportService from "../services/report-service";

export function runCommandsReports() {
    setInterval(async () => {
        await reportService.generateReport();
        logger.info(`[COMMANDS - runCommandsReports] Running report command, and update data on cache`);
    }, (3600 * 100));
};