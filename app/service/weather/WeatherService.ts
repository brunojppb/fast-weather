import { fetchWeatherApi } from "openmeteo";

export type City = {
  name: string;
  desc: string;
  coordinates: {
    lat: number;
    long: number;
  };
};

export const cities: Record<string, City> = {
  bcn: {
    name: "Barcelona",
    desc: "",
    coordinates: {
      lat: 41.3888,
      long: 2.159,
    },
  },
  vie: {
    name: "Vienna",
    desc: "",
    coordinates: {
      lat: 48.2085,
      long: 16.3721,
    },
  },
  ber: {
    name: "Berlin",
    desc: "",
    coordinates: {
      lat: 52.5244,
      long: 13.4105,
    },
  },
};

export async function getWeather(city: City) {
  const response = await fetchWeatherApi(
    "https://api.open-meteo.com/v1/forecast",
    {
      latitude: city.coordinates.lat,
      longitude: city.coordinates.long,
      hourly: ["temperature_2m"],
      forecast_days: 3,
    },
  );

  const result = response[0];

  const utcOffsetSeconds = result.utcOffsetSeconds();
  const hourly = result.hourly()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval(),
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0)!.valuesArray()!,
      relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
    },
  };

  const acc = [];
  for (let i = 0; i < weatherData.hourly.time.length; i++) {
    acc.push({
      time: weatherData.hourly.time[i].toISOString(),
      temperature: weatherData.hourly.temperature2m[i],
    });
  }

  return acc;
}

function range(start: number, stop: number, step: number) {
  return Array.from(
    { length: (stop - start) / step },
    (_, i) => start + i * step,
  );
}
