import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Welcome to Fast Weather</h1>
      <p className="pt-5">
        This is a demo app to demonstrate how to use distributed caching
        effectively.
      </p>
    </div>
  );
}
