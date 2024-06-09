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
import { Barcelona } from "./icons/Barcelona";
import { Vienna } from "./icons/Vienna";
import { Berlin } from "./icons/Berlin";

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
      <body className="bg-background font-sans antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="container relative min-h-screen">
      <HeaderNav />
      <CityMenu />
    </div>
  );
}

function CityMenu() {
  return (
    <div className="flex h-full flex-col space-y-8 py-2 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside className="bg-slate-100 dark:bg-slate-900 lg:w-1/5">
        <ul className="flex flex-col gap-4">
          <NavItem icon={<Barcelona />} name="Barcelona" path="/city/bcn" />
          <NavItem icon={<Vienna />} name="Vienna" path="/city/vie" />
          <NavItem icon={<Berlin />} name="Berlin" path="/city/ber" />
        </ul>
      </aside>
      <div className="flex-1 lg:max-w-2xl">
        <Outlet />
      </div>
    </div>
  );
}

type NavItemProps = {
  icon: React.ReactNode;
  name: string;
  path: string;
};

function NavItem(props: NavItemProps) {
  return (
    <li>
      <Link
        to={props.path}
        className="flex items-center px-2 py-4 text-lg font-bold hover:bg-slate-200 dark:hover:bg-slate-600"
      >
        <div className="w-10">{props.icon}</div>
        <span className="ml-2">{props.name}</span>
      </Link>
    </li>
  );
}

function HeaderNav() {
  const { theme, changeTheme } = useTheme();

  return (
    <header className="flex justify-between border-b border-indigo-500 py-4">
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
