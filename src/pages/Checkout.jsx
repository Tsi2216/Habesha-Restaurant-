import { useState } from "react";
import { Icon } from "../components/Icons";
import { useCartStore } from "../store/cartStore";

export default function Checkout({ onBack, onDone }) {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const [method, setMethod] = useState("telebirr");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = items.length ? 120 : 0;
  const total = subtotal + delivery;

  const submit = (event) => {
    event.preventDefault();
    if (!items.length) return;

    const order = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-ET", { day: "2-digit", month: "short", year: "numeric" }),
      items: items.map((item) => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
      total,
      payment: method === "telebirr" ? "Telebirr" : "Cash / Card",
      address,
    };

    if (address.trim()) {
      const saved = JSON.parse(localStorage.getItem("addis-eats-addresses") || "[]");
      const next = [address.trim(), ...saved.filter((item) => item !== address.trim())].slice(0, 5);
      localStorage.setItem("addis-eats-addresses", JSON.stringify(next));
    }

    clear();
    setMessage("Order placed successfully.");
    onDone(order);
  };

  return (
    <div className="screen checkout-screen">
      <div className="page-head">
        <button className="icon-button" onClick={onBack}><Icon name="back" size={19} /></button>
        <div><span className="step">STEP 3 OF 3</span><h1>Checkout</h1></div>
        <span className="secure"><Icon name="lock" size={13} /> Secure</span>
      </div>

      <form onSubmit={submit}>
        <section className="checkout-card">
          <div className="section-label">RECIPIENT CONTACT</div>
          <label>Full name<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Abebe Bekele" /></label>
          <label>Phone number<input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+251 91 123 4567" /></label>
          <label>Delivery destination<input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Bole, Addis Ababa" /></label>
        </section>

        <section className="checkout-card">
          <div className="section-label">PAYMENT METHOD</div>
          {[
            ["telebirr", "Telebirr", "Fast mobile payment"],
            ["cash", "Cash / Card on delivery", "Pay when your order arrives"],
          ].map(([id, title, text]) => (
            <button type="button" key={id} className={method === id ? "payment-method selected" : "payment-method"} onClick={() => setMethod(id)}>
              <span className="payment-logo">{id === "telebirr" ? "T" : "ET"}</span>
              <span><b>{title}</b><small>{text}</small></span>
              <span className="radio">{method === id ? "✓" : ""}</span>
            </button>
          ))}
        </section>

        <section className="checkout-card">
          <div className="section-label">ORDER TOTAL</div>
          <p><span>Items</span><b>ETB {subtotal}</b></p>
          <p><span>Delivery</span><b>ETB {delivery}</b></p>
          <div className="total-line"><span>Grand Total</span><strong>ETB {total}</strong></div>
        </section>

        {message && <p className="form-message success-message">{message}</p>}
        <button className="wide-add" type="submit">
          <span>Place order</span><strong>ETB {total}</strong>
        </button>
      </form>
    </div>
  );
}
