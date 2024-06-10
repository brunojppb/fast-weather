import { LoaderFunctionArgs, json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { cities, getWeather } from "~/service/weather/WeatherService";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

export async function loader({ params }: LoaderFunctionArgs) {
  const city = cities[params.city ?? ""];
  if (city) {
    const weather = await getWeather(city);
    return json(
      {
        city,
        weather,
      },
      {
        headers: {
          "Cache-Control":
            // Cache on the user browser for 1 second
            // Cache on the CDN for 5 minutes
            // CDN Serve stale responses for 10 minutes after the 5 minutes expire
            // but go grab a new version of the page on our origin
            "max-age=1, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  }

  throw json(
    {
      error: "City not found",
    },
    {
      status: 404,
      headers: {
        "Cache-control": "no-store",
      },
    },
  );
}

export default function CityPage() {
  const { city, weather } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text text-4xl">{city.name}</h1>
      <p className="pt-4">{city.desc}</p>

      <Table>
        <TableCaption>{city.name} Forecast</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Time</TableHead>
            <TableHead className="text-right">Temperature</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {weather.map((w) => {
            return (
              <TableRow key={w.time}>
                <TableCell className="font-medium">{w.time}</TableCell>
                <TableCell className="text-right">{w.temperature}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return (
          <div>
            <h1 className="text text-3xl font-bold">City not found!</h1>
            <p>
              The city you are looking for is not supported by Fast Weather yet.
            </p>
          </div>
        );
    }

    return (
      <div>
        Something went wrong: {error.status} {error.statusText}
      </div>
    );
  }

  return <div>Something went wrong: {error?.message || "Unknown Error"}</div>;
}
