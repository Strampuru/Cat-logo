/**
 * Seta única do site (anterior/seguinte, voltar, botões «→»).
 * Usar sempre esta, para todas as setas terem o mesmo desenho.
 */
export function Seta({
  direcao = "direita",
  className = "size-4",
}: {
  direcao?: "direita" | "esquerda";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
    >
      {direcao === "direita" ? <path d="M5 12h14M13 6l6 6-6 6" /> : <path d="M19 12H5M11 6l-6 6 6 6" />}
    </svg>
  );
}
