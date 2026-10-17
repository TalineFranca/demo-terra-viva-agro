// Ícones funcionais de traço simples (só onde ajudam a entender a ação). Todos aria-hidden.
type Props = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function IconeConversa({ className = "size-5" }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6Z" />
      <path d="M9.2 9.3c.3 1.9 1.6 3.4 3.6 4.1l1.1-1 1.7.8-.4 1.5c-3.2.1-6.4-2.8-6.8-6l1.5-.4.8 1.7Z" />
    </svg>
  );
}

export function IconeTelefone({ className = "size-5" }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 4h3.2l1.5 4-2 1.3a10.5 10.5 0 0 0 5 5l1.3-2 4 1.5V17a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function IconeSeta({ className = "size-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconeMais({ className = "size-5" }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconeFechar({ className = "size-6" }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconeAlerta({ className = "size-5" }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 4 2.8 19.5h18.4Z" />
      <path d="M12 10v4.5M12 17.2v.1" />
    </svg>
  );
}

export function IconeCheck({ className = "size-6" }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}
