export function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    back: <><path d="m15 18-6-6 6-6" /></>,
    heart: <><path d="M20.8 8.8c0 5.4-8.8 10.2-8.8 10.2S3.2 14.2 3.2 8.8A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    cart: <><path d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></>,
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.7-3.4 3.1-5 7-5s6.3 1.6 7 5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    minus: <><path d="M5 12h14" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    chevron: <><path d="m9 18 6-6-6-6" /></>,
    star: <><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    phone: <><path d="M6 3h3l1.2 4-2 1.5a15 15 0 0 0 7.3 7.3l1.5-2L21 15v3c0 1.1-.9 2-2 2C10.7 20 4 13.3 4 5a2 2 0 0 1 2-2Z" /></>,
  };

  return <svg {...common}>{paths[name] || null}</svg>;
}
