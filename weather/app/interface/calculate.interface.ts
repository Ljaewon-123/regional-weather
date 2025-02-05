export interface CalculateWeather {
  PerceivedTemperature: number
  Precipitation: number
  Humidity: number
}

export type CalculateName = "median" | "average" | 'max'