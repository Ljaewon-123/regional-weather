interface BaseLocationsInfo{
  id: number
  code: string
  name: string
}

export interface Regional extends BaseLocationsInfo { // 동...어감이 별론데
  lat: number
  lon: number
  guData: string
}

export interface Gus extends BaseLocationsInfo {
  locations: Regional[]
}