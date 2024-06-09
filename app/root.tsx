import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "./style.css?url";
import { LinksFunction } from "@remix-run/node";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { useTheme } from "./hooks/useTheme";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="container relative">
      <HeaderNav />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 py-2">
        <aside className="lg:w-1/5">
          <ul>
            <li>Vienna</li>
            <li>Barcelona</li>
            <li>Berlin</li>
          </ul>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function HeaderNav() {
  const { theme, changeTheme } = useTheme();

  return (
    <header className="flex justify-between py-4 border-b border-indigo-500">
      <Link to="/" className="font-bold">
        <span>⚡ Fast Weather</span>
      </Link>
      <Select onValueChange={(newTheme) => changeTheme(newTheme)} value={theme}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
        </SelectContent>
      </Select>
    </header>
  );
}
