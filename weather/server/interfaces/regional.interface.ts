interface BaseLocationsInfo{
  id: number
  code: string
  name: string
}

interface Regional extends BaseLocationsInfo { // 동...어감이 별론데
  lat: number
  lon: number
  guData: string
}

interface Gus extends BaseLocationsInfo {
  locations: Regional[]
}