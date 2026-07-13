import { WindowConfig } from "../WindowConfig/components/index.ts";

type ServerFetchProps<T> = {
  data: T | null;
  status: number;
};
const isDev = import.meta.env?.MODE === "development";
export const serverFetchRoute = (action: string) =>
  `${isDev ? "/api" : window.location.pathname}?action=${action}`;
export const serverFetch = async <T>(
  action: string,
  opts: RequestInit = {} // 显式给 opts 加个类型提示
): Promise<ServerFetchProps<T>> => {
  const fetchOpts: RequestInit = {
    cache: "no-cache",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      ...(WindowConfig.AUTHORIZATION
        ? { Authorization: WindowConfig.AUTHORIZATION }
        : {}),
    },
    method: "GET",
    ...opts,
  };
  if (opts.signal?.aborted) {
    throw new DOMException("The user aborted a request.", "AbortError");
  }
  const res = await fetch(serverFetchRoute(action), fetchOpts);
  let data: T | null = null;
  if (res.ok) {
    try {
      data = await res.json();
    } catch (e: unknown) {
      if (
        e instanceof Error &&
        (e.name === "AbortError" || opts.signal?.aborted)
      ) {
        throw e;
      }
      data = null;
    }
  }
  return {
    data,
    status: res.status,
  };
};
