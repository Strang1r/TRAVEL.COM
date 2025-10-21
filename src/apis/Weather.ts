const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

interface WeatherResponse {
  weather: { description: string; icon: string }[];
  main: { temp: number };
  name: string;
}

export const getWeather = async (location: string): Promise<WeatherResponse> => {
  const languageMap: Record<string, string> = {
    en: "en",
    zh: "zh",
    es: "es",
  };

  const language = languageMap[localStorage.getItem("language") || "en"];

  const response = await fetch(
    `${BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=metric&lang=${language}`
  );
  const data = await response.json();

  if (!response.ok) {
    console.error("Weather API Error:", data); // 打印具体报错
    throw new Error(data.message || "Failed to fetch weather data");
  }
  return data;
};

/* export const getForecast = async (location: string): Promise<WeatherResponse[]> => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch forecast data");
  }
  return data;
};
 */