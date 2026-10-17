/**
 * Título em que cada linha sobe de dentro de uma máscara (CSS, sem JavaScript).
 * Recebe as linhas já quebradas, para controlar o ritmo da leitura.
 */
export function TituloRevelado({
  linhas,
  id,
  className = "",
  como: Tag = "h1",
  atrasoInicial = false,
}: {
  linhas: React.ReactNode[];
  id?: string;
  className?: string;
  como?: "h1" | "h2";
  atrasoInicial?: boolean;
}) {
  return (
    <Tag id={id} className={`titulo-revelar ${atrasoInicial ? "atraso-inicial" : ""} ${className}`}>
      {linhas.map((l, i) => (
        <span key={i}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
