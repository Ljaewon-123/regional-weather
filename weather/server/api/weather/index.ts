interface QueryDate {
  year: number
  month: number
  day: number
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)

  console.log(query, '@@@@@@@')

  if (!query.startDate || !query.endDate || !query.locationId) {
    return [] // null or []
  }

  try {
    // get이라서 parse가 필수인가?
    const startDate: QueryDate = JSON.parse(query.startDate as string)
    const endDate: QueryDate = JSON.parse(query.endDate as string)
    const locationId: Regional = JSON.parse(query.locationId as string)

    const formatDate = ({ year, month, day }: QueryDate, isEndDate = false) =>
      `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${isEndDate ? '23:59:59' : '00:00:00'}`

    return await $fetch(config.apiBase + '/weather', { 
      method: 'get', 
      query: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate, true),
        locationId: locationId.id
      }
    })
  } catch (e) {
    console.error(e)
    throw createError({
      statusCode: 500,
      statusMessage: "Server Error",
      message: 'Weather Query Error'
    })
  }
})
