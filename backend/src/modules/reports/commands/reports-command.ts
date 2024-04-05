import { logger } from "../../../config";
import reportService from "../services/report-service";

export function runCommandsReports() {
    setInterval(async () => await reportService.generateReport(), (3600 * 500));
    logger.info(`[COMMANDS - runCommandsReports] Running report command, and update data on cache`);
};