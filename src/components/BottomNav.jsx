import { Icon } from "./Icons";

export default function BottomNav({ active, onNavigate, cartCount }) {
  const links = [
    ["home", "Home"],
    ["menu", "Menu"],
    ["cart", "Cart"],
    ["user", "Account"],
  ];

  return (
    <nav className="bottom-nav">
      {links.map(([icon, label]) => (
        <button
          key={label}
          className={active === label.toLowerCase() ? "nav-item active" : "nav-item"}
          onClick={() => onNavigate(label.toLowerCase())}
        >
          <span className="nav-icon">
            <Icon name={icon} size={19} />
            {label === "Cart" && cartCount > 0 && <b>{cartCount}</b>}
          </span>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
