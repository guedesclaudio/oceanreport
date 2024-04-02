import axios from "axios";
import { OceanData, AtmosphereData } from "@/types";
import { ReportObject } from "@/types";
import { sendEmail } from "@/helpers";
import { checkReport } from "@/helpers/report-helpers";
import { redis } from "@/config/redis";
import usersRepository from "@/modules/users/repositories/users-repository";

async function getReportToday(): Promise<string | ReportObject> {
  const reportExistsOnRedis: boolean = redis.exists("report");
  
  if (reportExistsOnRedis) {
    const response: string = await redis.get("report");
    return JSON.parse(response);
  };
  return "report não atualizado";
}

async function generateReport(): Promise<void> {
  try {
    const date = new Date;
    const hour = date.getHours();
    const timestamp = Date.now();
    const time: string = timestamp.toString();
    const itsTimeSendEmail = hour == 5 || hour == 17;
    
    const oceanData = await getOceanData(time);
    const atmosphereData = await getAtmosphereData(time);
    const lastOceanData = oceanData.slice(-1)[0];
    const lastAtmosphereData = atmosphereData.slice(-1)[0];

    const report = generateReportObject(lastOceanData, lastAtmosphereData);
    redis.set("report", JSON.stringify(report));
    
    if (itsTimeSendEmail) {
      const usersList = await usersRepository.findUsersWithReport();
      const emailsList = usersList.map((value) => value);
      return sendEmail({emailsList, report});
    }
  } catch (error) {
    return console.log(error, 'report error')
  }
}
generateReport();

function generateReportObject(oceanData: OceanData, atmData: AtmosphereData): ReportObject {
  const { Avg_W_Tmp1 } = oceanData;
  const { Hsig } = oceanData;
  const { Avg_Wnd_Sp } = atmData;
  
  const waveCondition = checkReport.waveConditions(Number(Hsig));
  const temperatureCondition = checkReport.temperatureConditions(Number(Avg_W_Tmp1));
  const windSpeedCondition = checkReport.windConditions(Number(Avg_Wnd_Sp));
  const reportObject = {
    waveCondition,
    temperatureCondition,
    windSpeedCondition,
    date: `${atmData.DAY}/${atmData.MONTH}/${atmData.YEAR} `,
    hour: `${Number(atmData.HOUR) - 3}:${atmData.MINUTE}`
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

const reportService = {
  getReportToday,
  generateReport
};

export default reportService;
