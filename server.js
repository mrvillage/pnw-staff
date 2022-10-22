import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";
import PocketBase, { BaseAuthStore } from "pocketbase";

class AuthStore extends BaseAuthStore {
  setCookie = false;

  constructor(cookie) {
    super();

    this.loadFromCookie(cookie);
  }

  save(token, model) {
    super.save(token, model);

    this.setCookie = true;
  }

  clear() {
    super.clear();

    this.setCookie = true;
  }
}

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => ({
    ...context.env,
    client: context.client,
    production: process.env.NODE_ENV === "production",
  }),
});

export async function onRequest(context) {
  const client = new PocketBase(
    process.env.NODE_ENV === "production"
      ? "https://api.pnw-staff.mrvillage.dev"
      : "http://127.0.0.1:8090"
  );
  client.authStore = new AuthStore(context.request.headers.get("Cookie"));
  context.client = client;
  const response = await handleRequest(context);
  if (client.authStore.setCookie) {
    response.headers.append("Set-Cookie", client.authStore.exportToCookie());
  }
  response.headers.append(
    "A-SENT-COOKIE",
    context.request.headers.get("Cookie")
  );
  return response;
}
