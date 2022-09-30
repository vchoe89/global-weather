import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import Daily from "./components/Daily";
import { info } from "autoprefixer";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

const API_KEY = "e3fc7fe31245f9091055c50cc385ccc2";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

function App() {
  const [query, setQuery] = useState({ q: "baltimore" });
  const [units, setUnits] = useState("imperial");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  //fetch call to retrive data from api
  const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    return fetch(url).then((res) => res.json());
  };

  //format fetch data
  const formatCurrentWeather = (data) => {
    const {
      coord: { lat, lon },
      main: { temp, feels_like, temp_min, temp_max, humidity },
      name,
      dt,
      sys: { country, sunrise, sunset },
      weather,
      wind: { speed },
    } = data;

    const { main: details, icon } = weather[0];

    return {
      lat,
      lon,
      temp,
      feels_like,
      temp_min,
      temp_max,
      humidity,
      name,
      dt,
      country,
      sunrise,
      sunset,
      details,
      icon,
      speed,
    };
  };

  //format daily & hourly weather data
  const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "ccc"),
        temp: d.temp,
        icon: d.weather[0].icon,
      };
    });

    hourly = hourly.slice(1, 6).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
        temp: d.temp,
        icon: d.weather[0].icon,
      };
    });
    return { timezone, daily, hourly };
  };

  //format data to local time
  const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
  ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

  //fetch call to get location for current weather
  const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("onecall", {
      lat,
      lon,
      exclude: "current, minutely, alerts",
      units: searchParams.units,
    }).then(formatForecastWeather);
    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  };

  //function to dynamically change weather icon
  const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}.png`;

  //function to dynamically change background
  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-500";
    const threshold = units == "imperial" ? 65 : 80;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-500";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-36 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation
            weather={weather}
            formatToLocalTime={formatToLocalTime}
          />

          <TemperatureAndDetails
            weather={weather}
            formatToLocalTime={formatToLocalTime}
            iconUrlFromCode={iconUrlFromCode}
          />

          <Forecast
            title="hourly forecast"
            weather={weather}
            iconUrlFromCode={iconUrlFromCode}
          />
          <Daily
            title="daily forecast"
            weather={weather}
            iconUrlFromCode={iconUrlFromCode}
          />
        </div>
      )}
    </div>
  );
}

export default App;
