import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
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
import { client } from "./hooks/client";

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

export const loader: LoaderFunction = ({ request }) => {
  client.authStore.loadFromCookie(request.headers.get("Cookie") || "");
  return null;
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
        <body
          style={{
            minHeight: "100vh",
            // display: "flex",
            // flexDirection: "column",
          }}
        >
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
