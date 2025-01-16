export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  try{
    throw 'hi'
    return await $fetch(config.apiBase + '/weahter/locations', { method: 'get', })
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