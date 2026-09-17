import { useState } from "react";
import { Icon } from "../components/Icons";
import { useCartStore } from "../store/cartStore";

export default function DishDetail({ dish, onBack, onCart, isFavorite, onToggleFavorite }) {
  const addItem = useCartStore((s) => s.addItem);
  const handleAdd = () => addItem(dish);

  return (
    <div className="screen detail-screen">
      <div className="detail-top">
        <button className="floating-button" onClick={onBack}><Icon name="back" size={19} /></button>
        <span>Dish Detail</span>
        <button className="floating-button cart-top" onClick={onCart}><Icon name="cart" size={18} /></button>
      </div>

      <div className="detail-photo">
        <img src={dish.image} alt={dish.name} />
        <div className="photo-actions">
          <button className={isFavorite ? "floating-button favorite" : "floating-button"} onClick={() => onToggleFavorite(dish.id)}>
            <Icon name="heart" size={17} />
          </button>
        </div>
        <div className="photo-badges">
          <span>{dish.tag || "HOUSE FAVORITE"}</span>
          <span>{dish.category === "Vegetarian" ? "VEGETARIAN" : "HALAL • 14 HR"}</span>
        </div>
      </div>

      <div className="detail-body">
        <div className="title-price">
          <div>
            <h1>{dish.name}</h1>
            <p className="muted">Chef's recommendation · Addis Ababa</p>
          </div>
          <strong>ETB {dish.price}</strong>
        </div>

        <div className="detail-stats">
          <span><Icon name="star" size={14} /> {dish.rating} <small>Rating</small></span>
          <span><Icon name="clock" size={14} /> 35 min <small>Ready</small></span>
          <span><Icon name="check" size={14} /> Fresh <small>Today</small></span>
        </div>

        <p className="description">{dish.description}</p>

        <div className="detail-section">
          <div className="section-label">STEP 1 · CHOOSE A SIDE</div>
          {["Traditional (2/3)", "Firfir Aynee (3/3)"].map((item, i) => (
            <label className="option-row" key={item}>
              <span className="radio selected">{i === 0 ? "✓" : ""}</span>
              <span><b>{item}</b><small>{i === 0 ? "House injera & seasoned ayib" : "Warm shredded injera"}</small></span>
              <em>{i === 0 ? "Included" : "+ ETB 80"}</em>
            </label>
          ))}
        </div>

        <div className="detail-section">
          <div className="section-label">STEP 2 · REQUIRED</div>
          <div className="option-row">
            <span className="radio selected">✓</span>
            <span><b>Standard Teff & Barley Blend</b><small>Classic sourdough injera</small></span>
            <em>Included</em>
          </div>
          <div className="option-row">
            <span className="radio"></span>
            <span><b>100% Pure Teff</b><small>Deep flavor, naturally fermented</small></span>
            <em>+ ETB 60</em>
          </div>
        </div>

        <div className="detail-section side-section">
          <div className="section-label">SIDE ACCOMPANIMENTS</div>
          {["Fresh Ayib Curd Cheese", "Shredded Greens", "House Avocado Paste"].map((item) => (
            <div className="small-option" key={item}>
              <span>{item}</span><em>Free</em>
            </div>
          ))}
        </div>

        <button className="wide-add" onClick={handleAdd}>
          <span>Add to basket</span><strong>ETB {dish.price}</strong>
        </button>
      </div>
    </div>
  );
}
