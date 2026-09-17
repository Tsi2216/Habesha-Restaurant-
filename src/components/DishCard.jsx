import { Icon } from "./Icons";

export default function DishCard({ dish, onOpen, onAdd, isFavorite, onToggleFavorite, compact = false }) {
  const handleFavorite = (event) => {
    event.stopPropagation();
    onToggleFavorite(dish.id);
  };

  return (
    <article className={compact ? "dish-card compact" : "dish-card"} onClick={() => onOpen(dish)}>
      <div className="dish-image-wrap">
        <img src={dish.image} alt={dish.name} className="dish-image" />
        {dish.tag && <span className="image-tag">{dish.tag}</span>}
        <button
          className={isFavorite ? "heart-button favorite" : "heart-button"}
          onClick={handleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          type="button"
        >
          <Icon name="heart" size={15} />
        </button>
      </div>
      <div className="dish-info">
        <div className="dish-title-row">
          <h3>{dish.name}</h3>
          <span className="rating"><Icon name="star" size={11} /> {dish.rating}</span>
        </div>
        <p className="dish-category">{dish.category}</p>
        <div className="dish-price-row">
          <div>
            <strong>ETB {dish.price}</strong>
            {dish.oldPrice && <del>ETB {dish.oldPrice}</del>}
          </div>
          <button className="quick-add" type="button" onClick={(event) => { event.stopPropagation(); onAdd(dish); }}>
            <Icon name="plus" size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
