import { windClassification, waveClassification, tsmClassification } from "./";

function temperatureConditions(temperature: number): string {
  if (temperature === null) return "\n Infelizmente não foi possível ter acesso aos dados de temperatura da água do mar";
  
  const description = getDescription(temperature, tsmClassification);
  return createTemperatureRandomText(temperature, description);
}

function waveConditions(wave: number): string {
  if (wave === null) return "\n Infelizmente não foi possível ter acesso aos dados de altura de onda do mar";

  const description = getDescription(wave, waveClassification);
  return ` \n O mar está ${description}. Marcando aproximadamente ${wave} metros.`;
}

function windConditions(wind: number): string {
  if (wind === null) return "\n Infelizmente não foi possível ter acesso aos dados de velocidade do vento";

  const windKm = wind * 1.8;
  const description = getDescription(wind, windClassification);
  return ` \n Hoje está ${description}. Marcando aproximadamente ${windKm.toFixed(2)} Km/h.`;
}

function getDescription(value: number, classification: { [key: string]: string }) {
  for (const range in classification) {
    const [min, max] = range.split('-').map(Number);
    const withinRange = value >= min && value <= max;
    if (withinRange) {
      const description = classification[range];
      return description;
    }
  }
}

export const checkReport = {
  windConditions,
  waveConditions,
  temperatureConditions,
}

function createTemperatureRandomText(temperature: number, classification: string): string {
  const possibilities = [
    `\n A temperatura da água está ${classification} e se encontra em ${temperature} °C.`,
    `\n A temperatura da superfície do mar água está ${classification}, marcando aproximadamente ${temperature} °C.`,
    `\n A temperatura da água do mar água está ${classification}. Nesse momento, marcando ${temperature} °C.`,
    `\n A temperatura do mar água está ${classification}. Marcando aproximadamente ${temperature} °C.`,
    `\n A temperatura da água está ${classification}, marcando ${temperature} °C.`,
  ];
  const randomIndex = Math.floor(Math.random() * (possibilities.length - 1));
  return possibilities[randomIndex];
}
