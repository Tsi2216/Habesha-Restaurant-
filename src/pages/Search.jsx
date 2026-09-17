import { useMemo, useState } from "react";
import { dishes } from "../data";
import DishCard from "../components/DishCard";
import { Icon } from "../components/Icons";
import { useCartStore } from "../store/cartStore";

export default function Search({ onBack, onOpenDish, favoriteIds, onToggleFavorite }) {
  const [query, setQuery] = useState("");
  const addItem = useCartStore((s) => s.addItem);

  const results = useMemo(
    () => dishes.filter((dish) => dish.name.toLowerCase().includes(query.toLowerCase()) || dish.category.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div className="screen">
      <div className="page-head">
        <button className="icon-button" onClick={onBack}><Icon name="back" size={19} /></button>
        <div><span className="step">FIND YOUR DISH</span><h1>Search</h1></div>
      </div>
      <div className="search-box large">
        <Icon name="search" size={18} />
        <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search dishes, Shiro, Tibs..." />
        {query && <button onClick={() => setQuery("")}><Icon name="close" size={15} /></button>}
      </div>
      <p className="result-count">{results.length} dishes found</p>
      <div className="dish-grid search-grid">
        {results.map((dish) => <DishCard key={dish.id} dish={dish} onOpen={onOpenDish} onAdd={addItem} isFavorite={favoriteIds.includes(dish.id)} onToggleFavorite={onToggleFavorite} />)}
      </div>
    </div>
  );
}
