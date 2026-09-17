import { Icon } from "./Icons";

export default function TopBar({ title, onBack, onCart, cartCount, onSearch }) {
  return (
    <header className="topbar">
      <button className="icon-button" onClick={onBack} aria-label="Go back">
        <Icon name="back" size={19} />
      </button>
      <div className="brand-small">
        <strong>{title || "Mesob"}</strong>
        <span>ADDIS ABABA</span>
      </div>
      <div className="top-actions">
        {onSearch && (
          <button className="icon-button" onClick={onSearch}>
            <Icon name="search" size={18} />
          </button>
        )}
        {onCart && (
          <button className="icon-button cart-top" onClick={onCart}>
            <Icon name="cart" size={18} />
            {cartCount > 0 && <b>{cartCount}</b>}
          </button>
        )}
      </div>
    </header>
  );
}
