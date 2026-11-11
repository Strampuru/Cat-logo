// Substituto mínimo do @tanstack/react-router para funcionar como site estático
// com navegação por "#" (ex.: index.html#/modelo/lisboa). Não precisa de servidor.
import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";

type Search = Record<string, string | undefined>;
export type Loc = { pathname: string; search: Search; hash: string };

function parse(): Loc {
  let h = window.location.hash.slice(1); // "/modelo/x?sub=a#ancora"
  let hash = "";
  const hi = h.indexOf("#");
  if (hi >= 0) { hash = h.slice(hi + 1); h = h.slice(0, hi); }
  let pathname = h || "/";
  let search: Search = {};
  const qi = pathname.indexOf("?");
  if (qi >= 0) {
    const qs = new URLSearchParams(pathname.slice(qi + 1));
    qs.forEach((v, k) => { search[k] = v; });
    pathname = pathname.slice(0, qi);
  }
  if (!pathname.startsWith("/")) pathname = "/" + pathname;
  return { pathname: decodeURI(pathname), search, hash };
}

let current = parse();
const listeners = new Set<() => void>();
window.addEventListener("hashchange", () => {
  current = parse();
  listeners.forEach((l) => l());
});
export function useLocationState(): Loc {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => current,
  );
}

function fillPath(to: string, params?: Record<string, string>) {
  return to.replace(/\$(\w+)/g, (_, k) => encodeURIComponent(params?.[k] ?? ""));
}
export function buildHref(o: { to?: string; params?: any; search?: any; hash?: string }) {
  const path = o.to ? fillPath(o.to, o.params) : current.pathname;
  const qs = new URLSearchParams();
  if (o.search) for (const [k, v] of Object.entries(o.search)) if (v !== undefined && v !== null) qs.set(k, String(v));
  const q = qs.toString();
  return "#" + path + (q ? "?" + q : "") + (o.hash ? "#" + o.hash : "");
}

export function navigateTo(o: { to?: string; params?: any; search?: any; hash?: string; replace?: boolean }) {
  const href = buildHref(o);
  if (o.replace) window.location.replace(href);
  else window.location.hash = href.slice(1);
}

export function useNavigate() {
  return (o: any) => { navigateTo(o ?? {}); return Promise.resolve(); };
}

export function useRouter() {
  return { invalidate: () => {}, navigate: navigateTo };
}

export const Link = React.forwardRef<HTMLAnchorElement, any>(function Link(
  { to, params, search, hash, activeProps, activeOptions, inactiveProps, preload, replace, resetScroll, className, style, onClick, children, ...rest },
  ref,
) {
  const loc = useLocationState();
  const href = buildHref({ to, params, search, hash });
  const target = to ? fillPath(to, params) : loc.pathname;
  const active = activeOptions?.exact === false ? loc.pathname.startsWith(target) : loc.pathname === target;
  const extra = active ? activeProps ?? {} : inactiveProps ?? {};
  const cls = [className, extra.className].filter(Boolean).join(" ") || undefined;
  return (
    <a
      ref={ref}
      href={href}
      className={cls}
      style={{ ...style, ...extra.style }}
      data-status={active ? "active" : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || rest.target) return;
        e.preventDefault();
        navigateTo({ to, params, search, hash, replace });
      }}
      {...rest}
    >
      {typeof children === "function" ? children({ isActive: active }) : children}
    </a>
  );
});

// ---- Rotas ----
export class NotFoundError extends Error { isNotFound = true; }
export function notFound() { return new NotFoundError("not found"); }

export const MatchContext = createContext<{ loaderData: any; search: any; params: any } | null>(null);

export type RouteDef = {
  path: string;
  options: any;
  useLoaderData: () => any;
  useSearch: () => any;
  useParams: () => any;
};

export function createFileRoute(path: string) {
  return (options: any): RouteDef => ({
    path,
    options,
    useLoaderData: () => useContext(MatchContext)!.loaderData,
    useSearch: () => useContext(MatchContext)!.search,
    useParams: () => useContext(MatchContext)!.params,
  });
}

export function matchPath(pattern: string, pathname: string): Record<string, string> | null {
  const a = pattern.split("/").filter(Boolean);
  const b = pathname.split("/").filter(Boolean);
  if (a.length !== b.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i]!.startsWith("$")) params[a[i]!.slice(1)] = decodeURIComponent(b[i]!);
    else if (a[i] !== b[i]) return null;
  }
  return params;
}

export function useScrollEffects(loc: Loc) {
  useEffect(() => {
    if (loc.hash) {
      const el = document.getElementById(loc.hash);
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    window.scrollTo(0, 0);
  }, [loc.pathname, JSON.stringify(loc.search), loc.hash]);
}
