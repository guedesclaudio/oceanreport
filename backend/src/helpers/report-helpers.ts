function temperatureConditions(temperature: number): string {
  if (temperature === null) return "\n Infelizmente não foi possível ter acesso aos dados de temperatura da água do mar";
  if (temperature >= 25) return createTemperatureText(temperature, 'quente');
  if (temperature >= 23 && temperature < 25) return createTemperatureText(temperature, 'fresca');
  if (temperature >= 21 && temperature < 23) return createTemperatureText(temperature, 'ligeiramente gelada');
  if (temperature >= 18 && temperature < 21) return createTemperatureText(temperature, 'um pouco gelada');
  if (temperature < 18 && temperature >= 16) return createTemperatureText(temperature, 'muito gelada');
  if (temperature < 16) return createTemperatureText(temperature, 'extremamente gelada');
}

function waveConditions(wave: number): string {
  if (wave === null) return "\n Infelizmente não foi possível ter acesso aos dados de altura de onda do mar";
  if (wave <= 0.50) return ` \n O mar está muito calmo, com ondas em torno de ${wave} metros.`;
  if (wave > 0.50 && wave <= 0.75) return ` \n O mar está levemente ondulado, com ondas em torno de ${wave} metros.`;
  if (wave > 0.75 && wave <= 1.0) return ` \n O mar está com pequenas ondulações em torno de ${wave} metros.`;
  if (wave > 1.0 && wave <= 1.25) return ` \n O mar está com ondulações um pouco altas, em torno de ${wave} metros.`;
  if (wave > 1.25 && wave <= 1.50) return ` \n O mar está com ondulações altas, em torno de ${wave} metros.`;
  if (wave > 1.50 && wave <= 2.0) return ` \n O mar está com um grau alto de agitação, com ondas em torno de ${wave} metros.`;
  if (wave > 2.00 && wave <= 2.5) return ` \n O mar está de ressaca, com ondas em torno de ${wave} metros. Se atente aos avisos dos bombeiros.`;
  if (wave > 2.5 && wave <= 3.0) return ` \n O mar está de ressaca forte, com ondas muito altas em torno de ${wave} metros. Se atente aos avisos dos bombeiros.`;
  if (wave > 3.0 && wave <= 3.5) return ` \n Alerta! O mar está de ressaca muito forte, com ondas muito altas em torno de ${wave} metros. Evite ir a praia.`;
  if (wave > 4.0) return ` \n Alerta vermelho! O mar está de ressaca muito forte, com ondas muito altas em torno de ${wave} metros. Evite ir a praia.`;
}

function windConditions(wind: number): string {
  if (wind === null) return "\n Infelizmente não foi possível ter acesso aos dados de velocidade do vento";
  const windKm = (wind * 1.8);
      
  if (windKm <= 5.0) return ` \n Hoje está praticamente sem vento, em torno de ${windKm.toFixed(2)} Km/h.`;
  if (windKm > 5.0 && windKm <= 10.0) return ` \n Hoje está com uma brisa muito leve, em torno de ${windKm.toFixed(2)} Km/h.`;
  if (windKm > 10.0 && windKm <= 15.0) return ` \n Hoje está com uma brisa leve, em torno de ${windKm.toFixed(2)} Km/h.`;
  if (windKm > 15.0 && windKm <= 20.0) return ` \n Hoje está com ventos fracos, em torno de ${windKm.toFixed(2)} Km/h, podendo ter rajadas mais fortes`;
  if (windKm > 20.0 && windKm <= 30.0) return ` \n Hoje está com ventos de intensidade fraca a mediana, em torno de ${windKm.toFixed(2)} Km/h, podendo ter rajadas mais fortes`;
  if (windKm > 30.0 && windKm <= 40.0) return ` \n Hoje está com ventos de intensidade mediana, em torno de ${windKm.toFixed(2)} Km/h, podendo ter rajadas mais fortes`;
  if (windKm > 40.0 && windKm <= 50.0) return ` \n Hoje está com ventos de intensidade mediana a forte, em torno de ${windKm.toFixed(2)} Km/h, podendo ter rajadas mais fortes`;
  if (windKm > 50.0 && windKm <= 60.0) return ` \n Hoje está com ventos de intensidade forte, em torno de ${windKm.toFixed(2)} Km/h, podendo ter rajadas mais fortes`;
  if (windKm > 60.0 && windKm <= 70.0) return ` \n Hoje está com ventos de intensidade muito fortes, em torno de ${windKm.toFixed(2)} Km/h, podendo ter rajadas ainda mais fortes`;
  if (windKm > 70.0 && windKm <= 80.0) return ` \n Alerta! Hoje está com ventos de intensidade muito fortes, em torno de ${windKm.toFixed(2)} Km/h, podendo ter rajadas ainda mais fortes`;
  if (windKm > 80.0 && windKm <= 90.0) return ` \n Alerta de vendaval! Hoje está com ventos de intensidade fortíssima, em torno de ${windKm.toFixed(2)} Km/h, podendo ter rajadas ainda mais fortes`;
  if (windKm > 90.0 && windKm <= 100.0) return ` \n Alerta de tempestade ou ciclone extratropical! Hoje está com ventos de intensidade fortíssima, em torno de ${windKm.toFixed(2)} Km/h, podendo ter rajadas ainda mais fortes`;
  if (windKm > 100.0) return ` \n Alerta de ciclone tropical! Hoje está com ventos de intensidade fortíssima, em torno de ${windKm.toFixed(2)} Km/h, podendo ter rajadas ainda mais fortes`;
}

export const checkReport = {
  windConditions,
  waveConditions,
  temperatureConditions,
}

function createTemperatureText(temperature: number, classification: string): string {
  const possibilities = [
    `\n A temperatura da água está ${classification} e se encontra em ${temperature} °C.`,
    `\n A temperatura da superfície do mar água está ${classification}, marcando aproximadamente ${temperature} °C.`,
    `\n A temperatura da água do mar água está ${classification}. Nesse momento, marcando ${temperature} °C.`,
    `\n A temperatura do mar água está ${classification}. Marcando aproximadamente ${temperature} °C.`,
    `\n A temperatura da água está ${classification}, marcando ${temperature} °C.`,
  ];
  const randomIndex = Math.floor(Math.random() * possibilities.length);
  return possibilities[randomIndex];
}