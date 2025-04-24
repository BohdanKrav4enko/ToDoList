import axios from "axios"

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    "API-KEY": import.meta.env.VITE_API_KEY,
  },
})
instance.interceptors.request.use(
  (config) => {
    console.log("Запрос:", config)
    return config
  },
  (error) => {
    console.error("Ошибка запроса:", error)
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    console.log("Ответ от сервера:", response)
    return response
  },
  (error) => {
    console.error("Ошибка ответа:", error)
    return Promise.reject(error)
  },
)
