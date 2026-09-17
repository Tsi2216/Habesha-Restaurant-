import { useState } from "react";
import { dishes } from "./data";
import { useCartStore } from "./store/cartStore";
import Home from "./pages/Home";
import DishDetail from "./pages/DishDetail";
import Basket from "./pages/Basket";
import Checkout from "./pages/Checkout";
import Search from "./pages/Search";
import Account from "./pages/Account";
import BottomNav from "./components/BottomNav";

function readList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedDish, setSelectedDish] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState(() => readList("addis-eats-favorites"));
  const [orders, setOrders] = useState(() => readList("addis-eats-orders"));
  const cartCount = useCartStore((s) => s.items.reduce((sum, item) => sum + item.quantity, 0));

  const saveFavorites = (next) => {
    setFavoriteIds(next);
    localStorage.setItem("addis-eats-favorites", JSON.stringify(next));
  };

  const toggleFavorite = (id) => {
    const next = favoriteIds.includes(id)
      ? favoriteIds.filter((itemId) => itemId !== id)
      : [...favoriteIds, id];
    saveFavorites(next);
  };

  const openDish = (dish) => {
    setSelectedDish(dish);
    setScreen("detail");
  };

  const go = (next) => setScreen(next);

  const completeOrder = (order) => {
    const next = [order, ...orders];
    setOrders(next);
    localStorage.setItem("addis-eats-orders", JSON.stringify(next));
    setScreen("home");
  };

  let content;

  if (screen === "home" || screen === "menu") {
    content = (
      <Home
        onOpenDish={openDish}
        onNavigate={go}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
      />
    );
  } else if (screen === "detail") {
    content = (
      <DishDetail
        dish={selectedDish}
        onBack={() => go("home")}
        onCart={() => go("cart")}
        isFavorite={selectedDish ? favoriteIds.includes(selectedDish.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    );
  } else if (screen === "cart") {
    content = <Basket onBack={() => go("home")} onCheckout={() => go("checkout")} />;
  } else if (screen === "checkout") {
    content = <Checkout onBack={() => go("cart")} onDone={completeOrder} />;
  } else if (screen === "search") {
    content = (
      <Search
        onBack={() => go("home")}
        onOpenDish={openDish}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
      />
    );
  } else {
    content = (
      <Account
        favoriteIds={favoriteIds}
        orders={orders}
        onToggleFavorite={toggleFavorite}
        onOpenDish={openDish}
      />
    );
  }

  const showNav = ["home", "menu", "cart", "account"].includes(screen);

  return (
    <div className="app-shell">
      <div className="phone">
        {content}
        {showNav && <BottomNav active={screen} onNavigate={go} cartCount={cartCount} />}
      </div>
    </div>
  );
}
