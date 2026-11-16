import { Link } from "@tanstack/react-router";
import { Seta } from "@/components/seta";

/**
 * Botão «Encomende já» das páginas de produto.
 * Leva à página de contactos com o nome do modelo, para a mensagem já seguir preenchida.
 */
export function BotaoEncomendar({ modelo, className = "" }: { modelo: string; className?: string }) {
  return (
    <div className={`rounded-2xl bg-foreground text-background p-5 sm:p-6 ${className}`}>
      <p className="font-display text-xl sm:text-2xl leading-tight">
        Gostou deste modelo? <span className="italic text-accent">Encomende já.</span>
      </p>
      <p className="mt-1.5 text-[12px] leading-relaxed text-background/70">
        Escolha como prefere falar connosco — WhatsApp, Instagram ou email — e tratamos da personalização, do
        pagamento e do envio.
      </p>
      <Link
        to="/contactos"
        search={{ modelo } as never}
        className="group mt-4 flex w-full items-center justify-between gap-3 rounded-full bg-accent py-1.5 pl-6 pr-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-accent-foreground shadow-lg transition-colors hover:bg-background hover:text-foreground"
      >
        Encomende já
        <span className="flex size-10 items-center justify-center rounded-full bg-accent-foreground text-accent transition-transform group-hover:translate-x-0.5">
          <Seta direcao="direita" />
        </span>
      </Link>
    </div>
  );
}
