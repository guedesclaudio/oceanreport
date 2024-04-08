import axios from "axios";
import { OceanData, AtmosphereData, ReportObject } from "../../../types";
import { sendEmail } from "../../../helpers";
import { checkReport } from "../../../helpers/report-helpers";
import { redis } from "../../../config/redis";
import usersRepository from "../../../modules/users/repositories/users-repository";
import { formatHour } from "../../../helpers/format-hour-helpers";
import { logger } from "../../../config";

let cache = '{}';

async function getReportToday(): Promise<string | ReportObject> {
  return JSON.parse(cache);
  // const reportExistsOnRedis: boolean = redis.exists("report");
  
  // if (reportExistsOnRedis) {
  //   const response: string = await redis.get("report");
  //   return JSON.parse(response);
  // };
  // return "report não atualizado";
}

async function generateReport(): Promise<void> {
  try {
    const timestamp = Date.now();
    const time: string = timestamp.toString();
    const oceanData = await getOceanData(time);
    const atmosphereData = await getAtmosphereData(time);
    const lastOceanData = oceanData.slice(-1)[0];
    const lastAtmosphereData = atmosphereData.slice(-1)[0];

    const report = generateReportObject(lastOceanData, lastAtmosphereData);
    await updateCache(report);
    await sendReportEmail(report);
  } catch (error) {
    return logger.error(`[SERVICES - generateReport] Error: ${JSON.stringify(error)}`)
  }
}

function generateReportObject(oceanData: OceanData, atmData: AtmosphereData): ReportObject {
  const { Avg_W_Tmp1 } = oceanData;
  const { Hsig } = oceanData;
  const { Avg_Wnd_Sp } = atmData;
  
  const waveCondition = checkReport.waveConditions(Number(Hsig));
  const temperatureCondition = checkReport.temperatureConditions(Number(Avg_W_Tmp1));
  const windSpeedCondition = checkReport.windConditions(Number(Avg_Wnd_Sp));
  handleDate(atmData);

  const reportObject = {
    waveCondition,
    temperatureCondition,
    windSpeedCondition,
    date: `${atmData.DAY}/${atmData.MONTH}/${atmData.YEAR} `,
    hour: `${Number(atmData.HOUR)}:${atmData.MINUTE}`
  }
  
  return reportObject;
}

async function getOceanData(time: string): Promise<OceanData[]> {
  const url = `${process.env.API_REPORT_OCEAN_URL}/${time.slice(0, -3)}`;
  return (await axios.get(url)).data;
}

async function getAtmosphereData(time: string): Promise<AtmosphereData[]> {
  const url = `${process.env.API_REPORT_ATMOSPHERE_URL}/${time.slice(0, -3)}`;
  return (await axios.get(url)).data;
}

function handleDate(atmData: any) {
  if ([0,1,2].includes(Number(atmData.HOUR))) {
    return formatHour[Number(atmData.HOUR)](atmData);
  }
  
  atmData.HOUR = atmData.HOUR - 3;
}

async function updateCache(report: ReportObject): Promise<void> {
  cache = JSON.stringify(report);
  //return await redis.set("report", JSON.stringify(report));
}

async function sendReportEmail(report: ReportObject): Promise<void> {
  const date = new Date();
  const hour = date.getHours();
  const itsTimeSendEmail = (hour == 5 || hour == 17);

  if (itsTimeSendEmail) {
    const emailsList = await usersRepository.findUsersWithReport();
    await sendEmail({emailsList, report});
  }
}

const reportService = {
  getReportToday,
  generateReport
};

export default reportService;
