import { HeadersFunction } from "@remix-run/node";
import { json } from "@remix-run/react";

export async function loader() {
  return json(
    {},
    {
      headers: {
        "Cache-Control":
          "max-age=1, s-maxage=1800, stale-while-revalidate=3600",
      },
    },
  );
}

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") ?? "no-store",
});

export default function NewsPage() {
  return (
    <div className="mt-4 md:mt-10">
      <h1 className="text-4xl font-bold">📰 Fast Weather News</h1>
    </div>
  );
}
