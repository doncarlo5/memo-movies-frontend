import axios from "axios"

const API_KEY = import.meta.env.VITE_KEY_API_URL

class API {
  constructor(url) {
    this.api = axios.create({
      baseURL: url,
    })
    console.log("API HANDLER", url)

    this.api.interceptors.request.use((req) => {
      req.headers.Authorization = `Bearer ${API_KEY}`
      return req
    })
  }
}

export const searchApi = new API(import.meta.env.VITE_SEARCH_API_URL)
export const discoveryApi = new API(import.meta.env.VITE_DISCOVERY_API_URL)
export const oneMovieApi = new API(import.meta.env.VITE_ONEMOVIE_API_URL)
