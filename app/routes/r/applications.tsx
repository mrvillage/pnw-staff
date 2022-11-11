import type { LoaderFunction } from "@remix-run/cloudflare";
import { loggedInOnlyReviewer } from "~/utils/routes";

export const loader: LoaderFunction = loggedInOnlyReviewer(async () => {
  return {};
});

export default function Index() {
  return <></>;
}
