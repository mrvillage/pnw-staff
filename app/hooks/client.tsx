import PocketBase from "pocketbase";
import { useMemo } from "react";

export function useClient() {
  return useMemo(() => new PocketBase("http://localhost:8090"), []);
}
