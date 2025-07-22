// src/libs/apiClient.ts
import axios from "axios"


const apiClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/3.0",
  headers: {
    "Content-Type": "application/json",
  },
})

export default apiClient;
