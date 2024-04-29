import { logger } from '@/config';
import { Email } from '../types';
import sgMail from '@sendgrid/mail';
import dotenv from "dotenv";
dotenv.config();

const API_KEY_SENDGRID = process.env.API_KEY_SENDGRID;

export async function sendEmail(data: Email) {
    const { 
        date, 
        hour, 
        waveCondition, 
        temperatureCondition, 
        windSpeedCondition 
    } = data.report;

    sgMail.setApiKey(API_KEY_SENDGRID);
    

    for (let i = 0; i < data.emailsList.length; i++) {
        const { email, name } = data.emailsList[i];
        
        const message = {
            to: email,
            from: "oceanreportnews@gmail.com",
            subject: `Ocean Report ${date} - ${hour}`,
            text: "Hello",
            html: 
            `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <h1 style="color: #11BADF; font-size: 24px; margin-bottom: 10px;">Olá! ${name}</h1>
                <br>
                <p style="font-size: 16px; color: #333; margin-bottom: 10px;">⏰ Condições atuais ${date} - ${hour}</p>
                <p style="font-size: 16px; color: #333; margin-bottom: 10px;">🌊 ${waveCondition}</p>
                <p style="font-size: 16px; color: #333; margin-bottom: 10px;">🌡️ ${temperatureCondition}</p>
                <p style="font-size: 16px; color: #333; margin-bottom: 10px;">🌬️ ${windSpeedCondition}</p>
                <br>
                <p style="font-size: 16px; color: #666;">Atenciosamente, equipe <strong>Ocean Report</strong></p>
             </div>`
        };
       
        try {
            await sgMail.send(message);
        } catch (error) {
            logger.error(`An error ocurred when send email. Error: ${JSON.stringify(error)}`)
        }
    }
}