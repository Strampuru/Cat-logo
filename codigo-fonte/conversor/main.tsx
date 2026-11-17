import React, { Component, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  Link, MatchContext, matchPath, useLocationState, useScrollEffects, type RouteDef,
} from "@tanstack/react-router";
import { Route as IndexRoute } from "@/routes/index";
import { Route as CatalogoRoute } from "@/routes/catalogo";
import { Route as CategoriaRoute } from "@/routes/categoria.$categoria";
import { Route as ModeloRoute } from "@/routes/modelo.$id";
import { Route as ContactosRoute } from "@/routes/contactos";
import { Route as DestaqueRoute } from "@/routes/destaque.$id";
import { Route as LegalRoute } from "@/routes/legal.$pagina";

const routes: RouteDef[] = [IndexRoute, CatalogoRoute, CategoriaRoute, ModeloRoute, ContactosRoute, DestaqueRoute, LegalRoute];
const DEFAULT_TITLE = "STRAM PURU — Catálogo de Vestuário";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">A página que procura não existe ou foi movida.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

class ErrorBoundary extends Component<{ children: ReactNode; resetKey: string }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidUpdate(prev: { resetKey: string }) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null });
  }
  render() {
    if (this.state.error) {
      console.error(this.state.error);
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="max-w-md text-center">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">Esta página não carregou</h1>
            <p className="mt-2 text-sm text-muted-foreground">Algo correu mal. Tente atualizar ou volte ao início.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button onClick={() => location.reload()} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Tentar novamente</button>
              <a href="#/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground">Início</a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function RouterView() {
  const loc = useLocationState();
  useScrollEffects(loc);

  let route: RouteDef | undefined;
  let params: Record<string, string> = {};
  for (const r of routes) {
    const m = matchPath(r.path, loc.pathname);
    if (m) { route = r; params = m; break; }
  }

  let content: ReactNode = <NotFoundComponent />;
  let title = "Página não encontrada — STRAM PURU";
  if (route) {
    const opts = route.options;
    const search = opts.validateSearch ? opts.validateSearch(loc.search) : loc.search;
    let loaderData: any;
    let ok = true;
    try {
      loaderData = opts.loader ? opts.loader({ params, search }) : undefined;
    } catch (e: any) {
      if (e?.isNotFound) ok = false; else throw e;
    }
    if (ok) {
      const head = opts.head?.({ loaderData, params });
      title = head?.meta?.find((m: any) => m.title)?.title ?? DEFAULT_TITLE;
      const C = opts.component;
      content = (
        <MatchContext.Provider value={{ loaderData, search, params }}>
          <C />
        </MatchContext.Provider>
      );
    }
  }
  React.useEffect(() => { document.title = title; }, [title]);
  return <ErrorBoundary resetKey={loc.pathname}>{content}</ErrorBoundary>;
}

createRoot(document.getElementById("root")!).render(<RouterView />);
