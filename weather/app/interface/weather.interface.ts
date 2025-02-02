export interface WeatherData {
  weather_id: number;
  weather_date: string;
  weather_time: string;
  weather_weather_condition: string;
  weather_perceived_temperature: number;
  weather_precipitation: number;
  weather_precipitation_probability: number;
  weather_wind: string;
  weather_humidity: number;
  weather_cold_wave_effect: string;
  weather_snowfall_intensity: number | null;
  weather_created_at: string;
  weather_location_id: number;
}
