import { Link } from "@tanstack/react-router";

/** Botão «Voltar» (estilo bronze do site) que leva à página principal. */
export function BotaoVoltarInicio({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 rounded-full border border-accent bg-accent py-1.5 pl-1.5 pr-5 text-[11px] font-medium uppercase tracking-widest text-accent-foreground shadow-sm transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-foreground ${className}`}
    >
      <span
        aria-hidden="true"
        className="flex size-8 items-center justify-center rounded-full bg-accent-foreground text-sm text-accent transition-all group-hover:-translate-x-0.5 group-hover:bg-accent group-hover:text-accent-foreground"
      >
        ←
      </span>
      Voltar
    </Link>
  );
}
