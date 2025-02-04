export enum WeatherCondition {
  CLEAR = "맑음",
  PARTLY_CLOUDY = "구름 조금",
  MOSTLY_CLOUDY = "구름 많음",
  CLOUDY = "흐림",
  RAIN = "비",
  HEAVY_RAIN = "강한 비",
  SHOWERS = "소나기",
  SNOW = "눈",
  HEAVY_SNOW = "폭설",
  SNOW_SHOWERS = "눈 소나기",
  THUNDERSTORM = "천둥번개",
  FOG = "안개",
  DRIZZLE = "이슬비",
  HAZE = "연무",
  DUST = "황사",
  UNKNOWN = "알 수 없음"
}

export const weatherConditionIconMap: Record<WeatherCondition, string> = {
  [WeatherCondition.CLEAR]: "☀️", // 맑음
  [WeatherCondition.PARTLY_CLOUDY]: "🌤", // 구름 조금
  [WeatherCondition.MOSTLY_CLOUDY]: "🌥", // 구름 많음
  [WeatherCondition.CLOUDY]: "☁️", // 흐림
  [WeatherCondition.RAIN]: "🌧", // 비
  [WeatherCondition.HEAVY_RAIN]: "⛈", // 강한 비 (천둥 포함)
  [WeatherCondition.SHOWERS]: "🌦", // 소나기
  [WeatherCondition.SNOW]: "🌨", // 눈
  [WeatherCondition.HEAVY_SNOW]: "❄️", // 폭설
  [WeatherCondition.SNOW_SHOWERS]: "🌨", // 눈 소나기
  [WeatherCondition.THUNDERSTORM]: "⚡", // 천둥번개
  [WeatherCondition.FOG]: "🌫", // 안개
  [WeatherCondition.DRIZZLE]: "💧", // 이슬비
  [WeatherCondition.HAZE]: "🌁", // 연무
  [WeatherCondition.DUST]: "🌪", // 황사
  [WeatherCondition.UNKNOWN]: "❓" // 알 수 없음
};