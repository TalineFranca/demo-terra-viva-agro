import { nomeCategoria, type Categoria, type Embalagem as TipoEmbalagem } from "@/data/produtos";

/**
 * Ilustração de embalagem desenhada em SVG (saco, big bag, galão ou frasco).
 * Substitui fotos de produto que não existem e mantém o catálogo com identidade própria.
 * As cores seguem a categoria.
 */
const cores: Record<Categoria, { corpo: string; faixa: string; rotulo: string; texto: string; detalhe: string }> = {
  sementes: { corpo: "#efe7d3", faixa: "#1b3e2c", rotulo: "#fbf8f1", texto: "#132e21", detalhe: "#c8952d" },
  fertilizantes: { corpo: "#e3ddd0", faixa: "#c8952d", rotulo: "#fbf8f1", texto: "#1b1d18", detalhe: "#27583e" },
  defensivos: { corpo: "#1b3e2c", faixa: "#e0b04e", rotulo: "#fbf8f1", texto: "#132e21", detalhe: "#e0b04e" },
  "nutricao-foliar": { corpo: "#e0b04e", faixa: "#1b3e2c", rotulo: "#fbf8f1", texto: "#132e21", detalhe: "#1b3e2c" },
  biologicos: { corpo: "#c3d6bf", faixa: "#27583e", rotulo: "#fbf8f1", texto: "#132e21", detalhe: "#27583e" },
};

function quebrar(nome: string, max = 13) {
  const linhas: string[] = [];
  for (const palavra of nome.split(" ")) {
    const ultima = linhas[linhas.length - 1];
    if (ultima && (ultima + " " + palavra).length <= max) linhas[linhas.length - 1] = `${ultima} ${palavra}`;
    else linhas.push(palavra);
  }
  return linhas.slice(0, 3);
}

function Rotulo({ x, y, w, h, nome, categoria, c }: { x: number; y: number; w: number; h: number; nome: string; categoria: Categoria; c: (typeof cores)[Categoria] }) {
  const linhas = quebrar(nome, w > 120 ? 13 : 10);
  const meio = x + w / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={c.rotulo} />
      <text x={meio} y={y + 22} textAnchor="middle" fontSize="11" fontWeight="600" fill={c.detalhe} letterSpacing="0.5">
        Safra Certa
      </text>
      <line x1={x + 16} x2={x + w - 16} y1={y + 32} y2={y + 32} stroke={c.texto} strokeOpacity="0.15" />
      {linhas.map((l, i) => (
        <text key={l} x={meio} y={y + 56 + i * 21} textAnchor="middle" fontSize="18" fontWeight="600" fill={c.texto}>
          {l}
        </text>
      ))}
      <text x={meio} y={y + h - 14} textAnchor="middle" fontSize="11" fill={c.texto} fillOpacity="0.7">
        {nomeCategoria(categoria)}
      </text>
    </g>
  );
}

export function Embalagem({
  tipo,
  nome,
  categoria,
  className = "",
}: {
  tipo: TipoEmbalagem;
  nome: string;
  categoria: Categoria;
  className?: string;
}) {
  const c = cores[categoria];
  return (
    <svg viewBox="0 0 220 300" className={`font-sans ${className}`} role="img" aria-label={`Ilustração da embalagem de ${nome}`}>
      {/* sombra no chão */}
      <ellipse cx="110" cy="292" rx="78" ry="6" fill="#000" opacity="0.12" />

      {tipo === "saco" && (
        <g>
          <path d="M36 44 Q34 24 56 22 L164 22 Q186 24 184 44 L194 268 Q195 286 176 286 L44 286 Q25 286 26 268 Z" fill={c.corpo} />
          <path d="M40 34 l8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6 8 6" stroke={c.texto} strokeOpacity="0.25" fill="none" strokeWidth="2" />
          <rect x="30" y="236" width="160" height="22" fill={c.faixa} />
          <Rotulo x={46} y={82} w={128} h={136} nome={nome} categoria={categoria} c={c} />
        </g>
      )}

      {tipo === "bag" && (
        <g>
          <path d="M44 58 q-8 -38 16 -40 M176 58 q8 -38 -16 -40" stroke={c.faixa} strokeWidth="7" fill="none" strokeLinecap="round" />
          <rect x="24" y="52" width="172" height="234" rx="14" fill={c.corpo} />
          <path d="M24 98 h172 M24 240 h172" stroke={c.texto} strokeOpacity="0.12" strokeWidth="2" />
          <rect x="24" y="252" width="172" height="18" fill={c.faixa} />
          <Rotulo x={44} y={106} w={132} h={128} nome={nome} categoria={categoria} c={c} />
        </g>
      )}

      {tipo === "galao" && (
        <g>
          <rect x="124" y="20" width="36" height="24" rx="4" fill={c.faixa} />
          <path d="M62 86 Q62 52 96 46 L174 46 Q186 48 186 64 L188 268 Q188 286 170 286 L52 286 Q34 286 34 268 L34 110 Q34 92 62 86 Z" fill={c.corpo} />
          <path d="M70 60 Q48 64 50 88" stroke={c.corpo} strokeWidth="12" fill="none" strokeLinecap="round" />
          <Rotulo x={48} y={110} w={126} h={132} nome={nome} categoria={categoria} c={c} />
          <rect x="34" y="256" width="154" height="14" fill={c.faixa} opacity="0.9" />
        </g>
      )}

      {tipo === "frasco" && (
        <g>
          <rect x="84" y="18" width="52" height="26" rx="5" fill={c.faixa} />
          <rect x="92" y="42" width="36" height="22" fill={c.corpo} />
          <path d="M92 62 Q60 70 58 100 L56 266 Q56 286 76 286 L144 286 Q164 286 164 266 L162 100 Q160 70 128 62 Z" fill={c.corpo} />
          <Rotulo x={66} y={114} w={88} h={128} nome={nome} categoria={categoria} c={c} />
        </g>
      )}
    </svg>
  );
}
