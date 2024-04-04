import { AtmosphereData, IFormatHour } from "../types";

export const formatHour: IFormatHour = {
    0: (atmData: AtmosphereData) => {
      atmData.HOUR = 21; 
      atmData.DAY = atmData.DAY - 1;
    },
    1: (atmData: AtmosphereData) => {
      atmData.HOUR = 22; 
      atmData.DAY = atmData.DAY - 1;
    },
    2: (atmData: AtmosphereData) => {
      atmData.HOUR = 23; 
      atmData.DAY = atmData.DAY - 1;
    },
}