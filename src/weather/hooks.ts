import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://api.openweathermap.org/data/2.5";
const APP_ID = "538882fc8387290c6cee83f313a6acf5";

type useCurrentWeatherArgs = {
  cityId?: number;
  enabled?: boolean;
};
export const useCurrentWeather = ({
  cityId,
  enabled = true,
}: useCurrentWeatherArgs) =>
  useQuery({
    queryKey: ["currentWeather", cityId],
    queryFn: async () => {
      const result = await axios.get(`${BASE_URL}/weather`, {
        params: {
          id: cityId,
          appid: APP_ID,
        },
      });
      return result.data;
    },
    enabled: !!cityId && enabled,
  });

type useWeatherForecastArgs = {
  cityId?: number;
  enabled?: boolean;
  dt?: number;
};

export type weatherForecastResponseListItem = {
  dt: number;
  main: {
    temp_min: number;
    temp_max: number;
    temp: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
  }[];
};
export type useWeatherForecastResponseData = {
  list: weatherForecastResponseListItem[];
};
export const useWeatherForecast = ({
  cityId,
  enabled = true,
  dt,
}: useWeatherForecastArgs) =>
  useQuery({
    queryKey: ["weatherForecast", cityId],
    queryFn: async () => {
      const result = await axios.get<useWeatherForecastResponseData>(
        `${BASE_URL}/forecast`,
        {
          params: {
            id: cityId,
            appid: APP_ID,
            dt,
          },
        }
      );
      return result.data;
    },
    enabled: !!cityId && enabled,
  });
