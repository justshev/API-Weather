import { marineRepository } from "./marine.repository";

const getMarineData = async () => {
  return await marineRepository.getMarineData();
};

const getLatestData = async () => {
  return await marineRepository.getLatestData();
};

const postMarineData = async (
  wave_height: number,
  wind_direction: string,
  wind_speed: number,
  wave_period?: number,
  wave_frequency?: number,
  wave_intensity?: number
) => {
  const result = await marineRepository.saveMarineData(
    wave_height,
    wind_direction,
    wind_speed,
    wave_period,
    wave_frequency,
    wave_intensity
  );

  return result;
};

const subscribeToMarineData = (callback: (data: any[]) => void) => {
  return marineRepository.subscribeToMarineData(callback);
};

export const marineService = {
  getMarineData,
  getLatestData,
  postMarineData,
  subscribeToMarineData,
};
