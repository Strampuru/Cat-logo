import type { ReactNode } from "react";
export class QueryClient {}
export function QueryClientProvider({ children }: { client?: unknown; children: ReactNode }) {
  return <>{children}</>;
}
