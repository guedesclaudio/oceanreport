import { Request, Response } from "express";
import httpStatus from "http-status";
import reportService from "../services/report-service";
import { logger } from "../../../config";

export async function getReport(req: Request, res: Response) {
  try {
    const report = await reportService.getReportToday();
    return res.status(httpStatus.OK).send({ report });
  } catch (error) {
    logger.error(`[REPORTS - getReport] Error: ${error?.message}`);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
