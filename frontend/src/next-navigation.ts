import { useEffect, useMemo, useState } from "react";

const NAVIGATION_EVENT = "safereach:navigate";

function currentLocation() {
  if (typeof window === "undefined") {
    return { pathname: "/", search: "" };
  }
  return { pathname: window.location.pathname, search: window.location.search };
}

export function navigateTo(href: string, replace = false) {
  if (typeof window === "undefined") return;
  if (replace) {
    window.history.replaceState({}, "", href);
  } else {
    window.history.pushState({}, "", href);
  }
  window.dispatchEvent(new Event(NAVIGATION_EVENT));
  window.dispatchEvent(new Event("popstate"));
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function useLocationSnapshot() {
  const [location, setLocation] = useState(currentLocation);

  useEffect(() => {
    const sync = () => setLocation(currentLocation());
    window.addEventListener("popstate", sync);
    window.addEventListener(NAVIGATION_EVENT, sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(NAVIGATION_EVENT, sync);
    };
  }, []);

  return location;
}

export function usePathname() {
  return useLocationSnapshot().pathname;
}

export function useSearchParams() {
  const { search } = useLocationSnapshot();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export function useRouter() {
  return useMemo(
    () => ({
      push: (href: string) => navigateTo(href),
      replace: (href: string) => navigateTo(href, true),
      refresh: () => window.dispatchEvent(new Event("safereach:vite-refresh")),
      back: () => window.history.back(),
      forward: () => window.history.forward(),
    }),
    [],
  );
}
