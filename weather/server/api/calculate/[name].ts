interface QueryDate {
  year: number
  month: number
  day: number
}

interface MaxWeather {
  maxPerceivedTemperature: number
  maxPrecipitation: number
  maxHumidity: number
}

interface AverageWeather {
  averagePerceivedTemperature: number
  averagePrecipitation: number
  averageHumidity: number
}

interface MedianWeather {
  medianPerceivedTemperature: number
  medianPrecipitation: number
  medianHumidity: number
}
type CalculateTypes = MaxWeather | AverageWeather | MedianWeather
type CalculateName = "median" | "average" | 'max'

export default defineEventHandler(async (event) => {
  const param = getRouterParam(event, 'name') as CalculateName
  const config = useRuntimeConfig(event)
  const query = getQuery(event)

  if (!query.startDate || !query.endDate || !query.locationId) {
    return {} as CalculateTypes
  }

  console.log(query)

  const startDate: QueryDate = JSON.parse(query.startDate as string)
  const endDate: QueryDate = JSON.parse(query.endDate as string)
  const locationId: Regional = JSON.parse(query.locationId as string)

  const formatDate = ({ year, month, day }: QueryDate, isEndDate = false) =>
      `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${isEndDate ? '23:59:59' : '00:00:00'}`

  try{
    return await $fetch<CalculateTypes>(`${config.apiBase}/weather/${param}`, { 
      method: 'get', 
      query: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate, true),
        locationId: locationId.id
      }
    })
  }
  catch(e){
    console.error(e)
    throw createError({
      statusCode: 500,
      statusMessage: "Server Error",
      message: 'Calculate Error'
    })
  }
})