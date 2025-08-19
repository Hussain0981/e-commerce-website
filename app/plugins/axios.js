import axios from "axios"

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
  // Axios instance
  const api = axios.create({
    baseURL: config.public.baseUrl,
  })
  
  nuxtApp.provide("axios", api)
})
