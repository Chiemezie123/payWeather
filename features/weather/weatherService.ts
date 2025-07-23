
import apiClient from "@/libs/apiClient"

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY







export const getWeatherByLatLon = async (lat: number, lon: number) => {
  const response = await apiClient.get(
    `/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&exclude=minutely,alerts`
  )

  return response.data
}




export const getWeatherOverview = async (lat: number, lon: number)=>{
     const response = await apiClient.get(
    `onecall/overview?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
  return response.data
}


export const getWeeklyForecast = async (lat: number, lon: number) => {
  const response = await apiClient.get(
    `/onecall/?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
  return response.data
}
