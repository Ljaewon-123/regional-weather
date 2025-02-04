export enum WeatherWind {
  NORTH = "북풍",
  NORTH_EAST = "북동풍",
  EAST = "동풍",
  SOUTH_EAST = "남동풍",
  SOUTH = "남풍",
  SOUTH_WEST = "남서풍",
  WEST = "서풍",
  NORTH_WEST = "북서풍",
  METEOR = "메테오" 
}

export const weatherWindIocons: Record<WeatherWind, string> = {
  [WeatherWind.NORTH]: "wi:direction-up",
  [WeatherWind.NORTH_EAST]: "wi:direction-up-right",
  [WeatherWind.NORTH_WEST]: "wi:direction-up-left",
  [WeatherWind.EAST]: "wi:direction-right",
  [WeatherWind.SOUTH_EAST]: "wi:direction-down-right",
  [WeatherWind.SOUTH]: "wi:direction-down",
  [WeatherWind.SOUTH_WEST]: "wi:direction-down-left",
  [WeatherWind.WEST]: "wi:direction-left",
  [WeatherWind.METEOR]: "wi:meteor",
};