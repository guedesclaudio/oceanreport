import { Router } from "express";
import { getReport } from "../controllers/report-controller";

const reportRouter = Router();

reportRouter
  .use("/", getReport);

export default reportRouter ;
