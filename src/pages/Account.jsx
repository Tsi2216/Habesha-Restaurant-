import { useEffect, useState } from "react";
import { dishes } from "../data";
import { Icon } from "../components/Icons";
import DishCard from "../components/DishCard";
import { useCartStore } from "../store/cartStore";

function readAddresses() {
  try {
    const value = JSON.parse(localStorage.getItem("addis-eats-addresses"));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export default function Account({ favoriteIds, orders, onToggleFavorite, onOpenDish }) {
  const addItem = useCartStore((s) => s.addItem);
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem("addis-eats-session") === "signed-in");
  const [mode, setMode] = useState("signin");
  const [method, setMethod] = useState("mobile");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [panel, setPanel] = useState("");
  const [addresses, setAddresses] = useState(readAddresses);
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    localStorage.setItem("addis-eats-addresses", JSON.stringify(addresses));
  }, [addresses]);

  const signIn = () => {
    setLoggedIn(true);
    localStorage.setItem("addis-eats-session", "signed-in");
    setMessage("");
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    const identity = method === "mobile" ? phone : email;
    if (!identity.trim() || !password.trim()) {
      setMessage(`Please enter your ${method === "mobile" ? "mobile number" : "email address"} and password.`);
      return;
    }
    signIn();
  };

  const handleCreateAccount = (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setMessage("Please complete all the fields.");
      return;
    }
    signIn();
  };

  const handleGoogle = () => {
    signIn();
  };

  const signOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("addis-eats-session");
    setMode("signin");
  };

  const addAddress = (event) => {
    event.preventDefault();
    const value = newAddress.trim();
    if (!value) return;
    setAddresses((current) => [value, ...current.filter((item) => item !== value)].slice(0, 5));
    setNewAddress("");
  };

  const removeAddress = (value) => {
    setAddresses((current) => current.filter((item) => item !== value));
  };

  const favoriteDishes = dishes.filter((dish) => favoriteIds.includes(dish.id));

  return (
    <div className="screen account-screen">
      <div className="account-logo">
        <span>MESOB</span>
        <small>ADDIS ABABA</small>
      </div>

      <div className="account-heading">
        <span className="step">YOUR TABLE AWAITS</span>
        <h1>Welcome to the<br />Mesob Table</h1>
        <p>Save your favorites, track orders, and make every meal feel like home.</p>
      </div>

      {!loggedIn ? (
        <div className="login-card">
          {mode === "signin" ? (
            <>
              <button type="button" className="google-button" onClick={handleGoogle}>
                <span>G</span> Continue with Google
              </button>
              <div className="or"><span>or</span></div>

              <div className="login-tabs">
                <button type="button" className={method === "mobile" ? "active" : ""} onClick={() => { setMethod("mobile"); setMessage(""); }}>
                  Ethiopian Mobile (+251)
                </button>
                <button type="button" className={method === "email" ? "active" : ""} onClick={() => { setMethod("email"); setMessage(""); }}>
                  Email Address
                </button>
              </div>

              <form onSubmit={handleSignIn}>
                <label>
                  {method === "mobile" ? "Mobile number" : "Email address"}
                  <input
                    value={method === "mobile" ? phone : email}
                    onChange={(e) => method === "mobile" ? setPhone(e.target.value) : setEmail(e.target.value)}
                    placeholder={method === "mobile" ? "+251 91 234 5678" : "you@example.com"}
                    type={method === "mobile" ? "tel" : "email"}
                  />
                </label>
                <label>
                  Password
                  <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" />
                </label>
                <button className="sign-button" type="submit">
                  Sign in to Mesob House <Icon name="chevron" size={15} />
                </button>
              </form>

              {message && <p className="form-message">{message}</p>}
              <p className="new-account">Don't have an account? <button type="button" onClick={() => { setMode("signup"); setMessage(""); }}>Create one</button></p>
            </>
          ) : (
            <>
              <div className="form-title">
                <span className="step">JOIN THE MESOB TABLE</span>
                <h2>Create your account</h2>
                <p>Keep your favorite dishes, orders and delivery details together.</p>
              </div>
              <form onSubmit={handleCreateAccount}>
                <label>Full name<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" /></label>
                <label>Email address<input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" type="email" /></label>
                <label>Mobile number<input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+251 91 234 5678" type="tel" /></label>
                <label>Password<input required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" type="password" /></label>
                <button className="sign-button" type="submit">Create Mesob Account <Icon name="chevron" size={15} /></button>
              </form>
              {message && <p className="form-message">{message}</p>}
              <p className="new-account">Already have an account? <button type="button" onClick={() => { setMode("signin"); setMessage(""); }}>Sign in</button></p>
            </>
          )}
        </div>
      ) : (
        <div className="login-card logged-card">
          <div className="success-mark"><Icon name="check" size={24} /></div>
          <h2>Welcome to Mesob House!</h2>
          <p>Your Mesob table is ready.</p>
          <button className="sign-button" type="button" onClick={signOut}>Sign out</button>
        </div>
      )}

      <div className="account-benefits">
        <button type="button" className={panel === "favorites" ? "account-benefit active" : "account-benefit"} onClick={() => setPanel(panel === "favorites" ? "" : "favorites")}>
          <Icon name="heart" size={18} /><b>Favorites</b><small>{favoriteDishes.length ? `${favoriteDishes.length} saved dish${favoriteDishes.length === 1 ? "" : "es"}` : "Quickly reorder loved dishes"}</small>
        </button>
        <button type="button" className={panel === "history" ? "account-benefit active" : "account-benefit"} onClick={() => setPanel(panel === "history" ? "" : "history")}>
          <Icon name="clock" size={18} /><b>Order history</b><small>{orders.length ? `${orders.length} completed order${orders.length === 1 ? "" : "s"}` : "Keep your meals together"}</small>
        </button>
        <button type="button" className={panel === "addresses" ? "account-benefit active" : "account-benefit"} onClick={() => setPanel(panel === "addresses" ? "" : "addresses")}>
          <Icon name="location" size={18} /><b>Saved addresses</b><small>{addresses.length ? `${addresses.length} saved address${addresses.length === 1 ? "" : "es"}` : "Faster delivery next time"}</small>
        </button>
      </div>

      {panel === "favorites" && (
        <section className="account-panel">
          <div className="panel-heading"><div><span className="step">SAVED DISHES</span><h2>Favorites</h2></div></div>
          {favoriteDishes.length ? (
            <div className="account-dish-grid">
              {favoriteDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} onOpen={onOpenDish} onAdd={addItem} isFavorite={true} onToggleFavorite={onToggleFavorite} compact />
              ))}
            </div>
          ) : <p className="panel-empty">Tap the heart on a dish to save it here.</p>}
        </section>
      )}

      {panel === "history" && (
        <section className="account-panel">
          <div className="panel-heading"><div><span className="step">PAST ORDERS</span><h2>Order history</h2></div></div>
          {orders.length ? orders.map((order) => (
            <div className="history-item" key={order.id}>
              <div><b>Order #{String(order.id).slice(-5)}</b><small>{order.date} · {order.payment}</small></div>
              <strong>ETB {order.total}</strong>
              <p>{order.items.map((item) => `${item.name} × ${item.quantity}`).join(", ")}</p>
            </div>
          )) : <p className="panel-empty">Orders you place will appear here.</p>}
        </section>
      )}

      {panel === "addresses" && (
        <section className="account-panel">
          <div className="panel-heading"><div><span className="step">DELIVERY DETAILS</span><h2>Saved addresses</h2></div></div>
          <form className="address-form" onSubmit={addAddress}>
            <input value={newAddress} onChange={(e) => setNewAddress(e.target.value)} placeholder="Add a delivery address" />
            <button type="submit">Save</button>
          </form>
          {addresses.length ? addresses.map((item) => (
            <div className="address-item" key={item}>
              <Icon name="location" size={17} />
              <span>{item}</span>
              <button type="button" onClick={() => removeAddress(item)}><Icon name="close" size={14} /></button>
            </div>
          )) : <p className="panel-empty">Save an address for faster checkout.</p>}
        </section>
      )}
    </div>
  );
}
