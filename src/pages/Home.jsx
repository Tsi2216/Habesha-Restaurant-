import { useMemo, useState } from "react";
import { dishes, categories } from "../data";
import { useCartStore } from "../store/cartStore";
import DishCard from "../components/DishCard";
import { Icon } from "../components/Icons";

export default function Home({ onOpenDish, onNavigate, favoriteIds, onToggleFavorite }) {
  const addItem = useCartStore((s) => s.addItem);
  const [category, setCategory] = useState("All Dishes");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesCategory =
        category === "All Dishes" ||
        dish.category === category ||
        (category === "Fasting" && dish.tag === "FASTING");
      const matchesSearch = dish.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  return (
    <div className="screen">
      <header className="home-header">
        <div className="header-row">
          <div>
            <p className="eyebrow">MESOB DINING</p>
            <h1>Welcome to the Mesob Table</h1>
          </div>
          <button className="profile-dot" onClick={() => onNavigate("account")}>
            <Icon name="user" size={17} />
          </button>
        </div>
        <div className="search-box">
          <Icon name="search" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes, injera, tibs..."
          />
          <span className="search-shortcut">⌘</span>
        </div>
      </header>

      <section className="hero-banner">
        <div>
          <span className="mini-label">FROM OUR KITCHEN</span>
          <h2>Communal warmth,<br />slow-cooked soul.</h2>
          <p>Traditional flavors made for sharing around the mesob.</p>
          <button onClick={() => onOpenDish(dishes[0])}>Explore today's special <Icon name="chevron" size={14} /></button>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="step">THE GRAND MESOB</span>
            <h2>Our Feast</h2>
          </div>
          <button className="text-button" onClick={() => setCategory("All Dishes")}>See all</button>
        </div>

        <div className="category-scroll">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "category active" : "category"}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="dish-grid">
          {filtered.map((dish) => (
            <DishCard key={dish.id} dish={dish} onOpen={onOpenDish} onAdd={addItem} isFavorite={favoriteIds.includes(dish.id)} onToggleFavorite={onToggleFavorite} />
          ))}
        </div>
      </section>

      <section className="green-card">
        <div>
          <span className="step">THE SPIRIT OF GURSHA</span>
          <h3>One table. Many hands.</h3>
          <p>Sharing food is sharing care. Pass the plate, break the bread, stay a little longer.</p>
        </div>
        <div className="green-card-icon">✦</div>
      </section>
    </div>
  );
}
