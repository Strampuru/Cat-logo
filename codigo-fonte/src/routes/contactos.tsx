import { createFileRoute, Link } from "@tanstack/react-router";
import { Seta } from "@/components/seta";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/site-layout";
import { categorias } from "@/lib/catalogo";

export const Route = createFileRoute("/contactos")({
  head: () => ({
    meta: [
      { title: "Encomendar — Strampuru" },
      {
        name: "description",
        content:
          "Faça a sua encomenda à Strampuru pelo WhatsApp, Instagram ou email. Tratamos da personalização, do pagamento e do envio consigo.",
      },
      { property: "og:title", content: "Encomendar — Strampuru" },
      {
        property: "og:description",
        content: "Escolha o WhatsApp, o Instagram ou o email e faça a sua encomenda de vestuário personalizado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactosPage,
});

const WHATSAPP = "351928253232";
const INSTAGRAM = "strampuru_";
const EMAIL = "Strampuru@gmail.com";

type Canal = {
  id: string;
  nome: string;
  valor: string;
  destaque?: string;
  descricao: string;
  botao: string;
  href: string;
  icon: ReactNode;
};

function mensagem(modelo?: string) {
  return modelo
    ? `Olá! Gostava de encomendar o modelo «${modelo}». Podem ajudar-me?`
    : "Olá! Gostava de fazer uma encomenda. Podem ajudar-me?";
}

const iconeWhatsApp = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-7">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M8.5 8.3c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2 0 .4-.1.5l-.4.5c-.1.1-.2.3-.1.5.2.4.7 1.1 1.3 1.6.8.7 1.4.9 1.6 1 .2.1.4 0 .5-.1l.5-.6c.2-.2.3-.2.5-.1l1.7.8c.2.1.3.3.3.4 0 .6-.3 1.2-.7 1.4-.5.3-1.4.6-2.6.2-1.5-.5-2.9-1.4-4-2.8-.6-.8-1.2-1.8-1.3-2.6-.1-.8 0-1.4.2-1.8z"
    />
  </svg>
);
const iconeInstagram = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-7">
    <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const iconeEmail = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-7">
    <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.5 6.5l8.5 6 8.5-6" />
  </svg>
);

const PASSOS = [
  { titulo: "Escolha", texto: "O modelo, as cores, os tamanhos e as quantidades no nosso catálogo." },
  { titulo: "Fale connosco", texto: "Pelo WhatsApp, Instagram ou email. Envie-nos a sua ideia ou o logótipo." },
  { titulo: "Aprove", texto: "Preparamos a proposta da personalização e o valor final da encomenda." },
  { titulo: "Pague e receba", texto: "Combinamos consigo o pagamento e o envio. Depois é só esperar." },
];

const ENVIAR = [
  "Modelo e cor escolhidos",
  "Tamanhos e quantidade de cada um",
  "Logótipo, imagem ou texto a personalizar",
  "Onde quer a personalização (peito, costas…)",
  "Data em que precisa das peças",
  "Localidade para o envio",
];

function ContactosPage() {
  const pesquisa = Route.useSearch() as { modelo?: string };
  const modelo = typeof pesquisa?.modelo === "string" && pesquisa.modelo.trim() ? pesquisa.modelo.trim() : undefined;
  const texto = mensagem(modelo);

  const canais: Canal[] = [
    {
      id: "whatsapp",
      nome: "WhatsApp",
      valor: "(+351) 928 253 232",
      destaque: "Resposta mais rápida",
      descricao: "Ideal para tirar dúvidas, enviar fotos do logótipo e acompanhar a encomenda.",
      botao: "Encomendar pelo WhatsApp",
      href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`,
      icon: iconeWhatsApp,
    },
    {
      id: "instagram",
      nome: "Instagram",
      valor: `@${INSTAGRAM}`,
      descricao: "Envie-nos uma mensagem direta e veja também os trabalhos que já fizemos.",
      botao: "Mensagem no Instagram",
      href: `https://ig.me/m/${INSTAGRAM}`,
      icon: iconeInstagram,
    },
    {
      id: "email",
      nome: "Email",
      valor: EMAIL,
      descricao: "Para encomendas maiores, empresas ou quando prefere ter tudo por escrito.",
      botao: "Enviar email",
      href: `mailto:${EMAIL}?subject=${encodeURIComponent(
        modelo ? `Encomenda — ${modelo}` : "Encomenda Strampuru",
      )}&body=${encodeURIComponent(texto + "\n\n")}`,
      icon: iconeEmail,
    },
  ];

  return (
    <SiteLayout>
      {/* Cabeçalho */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="pointer-events-none absolute -top-32 -right-24 size-[26rem] rounded-full bg-accent/30 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 size-[24rem] rounded-full bg-accent/20 blur-[90px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-24 text-center animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
            <span className="h-px w-8 md:w-14 bg-accent/70" />
            <span className="text-[10px] tracking-[0.32em] text-accent font-semibold uppercase">Encomendas</span>
            <span className="h-px w-8 md:w-14 bg-accent/70" />
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl leading-[0.95]">
            Faça a sua <span className="italic text-accent">encomenda</span>
          </h1>
          <p className="mt-5 md:mt-6 mx-auto max-w-xl text-[14px] sm:text-base leading-relaxed text-background/80">
            As encomendas são feitas diretamente connosco. Escolha abaixo como prefere falar — tratamos consigo da
            personalização, do pagamento e do envio.
          </p>
          <p className="mt-8 md:mt-10 pb-6 md:pb-8 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-background/60">
            Escolha um meio de contacto <Seta direcao="direita" className="size-3.5 -mt-0.5 rotate-90" />
          </p>
        </div>
      </section>

      {/* Canais */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 -mt-8 md:-mt-12">
        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {canais.map((c) => (
            <a
              key={c.id}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`group relative flex flex-col gap-5 rounded-2xl border bg-card p-6 sm:p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                c.destaque ? "border-accent ring-2 ring-accent/30" : "border-border hover:border-accent/60"
              }`}
            >
              {c.destaque && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-accent-foreground shadow-md">
                  {c.destaque}
                </span>
              )}
              <div className="flex items-center gap-4">
                <span className="flex size-14 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  {c.icon}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-2xl leading-none">{c.nome}</p>
                  <p className="mt-1.5 text-[12px] text-muted-foreground break-all">{c.valor}</p>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{c.descricao}</p>
              <span
                className={`mt-auto flex items-center justify-between gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                  c.destaque
                    ? "bg-accent text-accent-foreground group-hover:bg-foreground group-hover:text-background"
                    : "bg-foreground text-background group-hover:bg-accent group-hover:text-accent-foreground"
                }`}
              >
                {c.botao}
                <span className="flex size-8 items-center justify-center rounded-full bg-background text-foreground"><Seta direcao="direita" /></span>
              </span>
            </a>
          ))}
        </div>
        {modelo && (
          <p className="mt-4 text-center text-[12px] text-muted-foreground">
            No WhatsApp e no email, a mensagem já segue com o modelo «{modelo}». Só precisa de a enviar.
          </p>
        )}
      </section>

      {/* Como funciona */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-semibold">Simples e sem complicações</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl leading-tight">
            Como <span className="italic">encomendar</span>
          </h2>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PASSOS.map((p, i) => (
            <li key={p.titulo} className="relative rounded-2xl border border-border bg-card p-6">
              <span className="font-display text-5xl leading-none text-accent/80">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-4 text-[12px] uppercase tracking-[0.2em] font-semibold">{p.titulo}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{p.texto}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 md:mt-16 grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center rounded-2xl bg-card border border-border p-6 sm:p-10">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl leading-tight">
              Para sermos mais rápidos, <span className="italic">diga-nos:</span>
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              Não precisa de ter tudo decidido — ajudamos no que faltar. Os preços já incluem a personalização; os
              portes de envio são combinados consigo.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {ENVIAR.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[13px]">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] text-accent-foreground">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Catálogo */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight">
              Ainda a escolher? <span className="italic">Veja o catálogo</span>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-md leading-relaxed">
              Descubra os modelos, as cores e os tamanhos disponíveis antes de nos contactar.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {categorias.map((c) => (
              <Link
                key={c.id}
                to="/categoria/$categoria"
                params={{ categoria: c.id }}
                className="rounded-full border border-border px-4 py-2 text-[10px] sm:text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                {c.nome}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
