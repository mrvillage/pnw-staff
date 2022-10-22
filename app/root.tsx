import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { createEmotionCache } from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";
import Providers from "~/context/Providers";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "PnW Staff Portal",
  viewport: "width=device-width,initial-scale=1",
  description: "The staff application portal for Politics and War.",
});

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/pnw.png",
      type: "image/png",
    },
  ];
};

createEmotionCache({ key: "mantine" });

export default function App() {
  return (
    <Providers>
      <html lang="en">
        <head>
          <StylesPlaceholder />
          <Meta />
          <Links />
        </head>
        <body style={{ minHeight: "100vh", minWidth: "100vw" }}>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </Providers>
  );
}
