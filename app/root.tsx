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
import PageScrollArea from "./components/PageScrollArea";

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
        <body style={{ minHeight: "100vh", width: "100vw" }}>
          <PageScrollArea>
            <Outlet />
          </PageScrollArea>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </Providers>
  );
}
