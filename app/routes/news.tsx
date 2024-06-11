import { HeadersFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";

const dateOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "Europe/Berlin",
};

export async function loader() {
  const currentDate = new Intl.DateTimeFormat("en-DE", dateOptions).format(
    Date.now(),
  );
  return json(
    {
      currentDate,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") ?? "no-store",
});

export default function NewsPage() {
  const { currentDate } = useLoaderData<typeof loader>();

  return (
    <div className="mt-4 md:mt-10">
      <h1 className="text-4xl font-bold">📰 Fast Weather News</h1>
      <p>Last rendered on server: {currentDate}</p>
      <p className="py-8">Pretend there are some news here...</p>
    </div>
  );
}
