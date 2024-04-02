import reportService from "../services/report-service";

export function runCommandsReports() {
    setInterval(reportService.generateReport, 50000);
};