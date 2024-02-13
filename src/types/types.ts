export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
  sys: {
    country: string;
  };
  name: string;
  dt: number;
}

export interface ForecastItem {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
}