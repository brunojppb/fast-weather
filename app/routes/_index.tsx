import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Fast Weather" },
    { name: "description", content: "A fast weather app" },
  ];
};

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

export default function Index() {
  return (
    <div className="mt-4 md:mt-10">
      <h1 className="text-4xl font-bold">Welcome to Fast Weather</h1>
      <p className="pt-5">
        This is a demo app to demonstrate how to use distributed caching
        effectively.
      </p>
      <p>👈 Check one of the cities here.</p>
    </div>
  );
}
