export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  try{
    return await $fetch<Location[]>(config.apiBase + '/weather/locations', { method: 'get', })
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