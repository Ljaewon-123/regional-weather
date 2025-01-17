export default defineEventHandler(async (event) => {
  const DAEJEONCODE = "30"
  const config = useRuntimeConfig(event)
  try{
    return await $fetch<Regional[]>(config.apiBase + '/weather/locations', { 
      method: 'get', 
      query: {
        code: DAEJEONCODE
      }
    })
  }
  catch(e){
    console.error(e)
    throw createError({
      statusCode: 500,
      statusMessage: "Server Error",
      message: 'Locations Not Found'
    })
  }
})