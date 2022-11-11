import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";

export function loggedInOnly(
  func: LoaderFunction | ActionFunction
): LoaderFunction | ActionFunction {
  return async function ({ request, context, params }) {
    if (context.client.authStore.token) {
      if (context.client.authStore.model?.collectionName == "reviewers") {
        return redirect("/r");
      }
      return await func({ request, context, params });
    } else {
      return redirect("/", { status: 302 });
    }
  };
}

export function loggedInOnlyReviewer(
  func: LoaderFunction | ActionFunction,
  path?: string
): LoaderFunction | ActionFunction {
  return async function ({ request, context, params }) {
    if (context.client.authStore.token) {
      if (context.client.authStore.model?.collectionName == "users") {
        return redirect("/r/login");
      }
      return await func({ request, context, params });
    } else {
      return redirect(path || "/r/login", { status: 302 });
    }
  };
}
