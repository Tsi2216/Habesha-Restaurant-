import { Icon } from "../components/Icons";
import { useCartStore } from "../store/cartStore";

export default function Basket({ onBack, onCheckout }) {
  const items = useCartStore((s) => s.items);
  const increase = useCartStore((s) => s.addItem);
  const decrease = useCartStore((s) => s.decrease);
  const remove = useCartStore((s) => s.remove);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = items.length ? 120 : 0;
  const total = subtotal + delivery;

  return (
    <div className="screen basket-screen">
      <div className="page-head">
        <button className="icon-button" onClick={onBack}><Icon name="back" size={19} /></button>
        <div><span className="step">YOUR ORDER</span><h1>Your Gusha Basket</h1></div>
        <span className="order-count">{items.length} items</span>
      </div>

      <div className="delivery-card">
        <div className="delivery-icon"><Icon name="location" size={18} /></div>
        <div><b>Complimentary Delivery</b><p>Within Addis Ababa · 45–60 min</p></div>
        <span>FREE</span>
      </div>

      {items.length === 0 ? (
        <div className="empty">
          <div className="empty-icon"><Icon name="cart" size={28} /></div>
          <h2>Your basket is empty</h2>
          <p>Add something delicious from the menu to get started.</p>
        </div>
      ) : (
        <>
          <div className="basket-list">
            {items.map((item) => (
              <div className="basket-item" key={item.id}>
                <img src={item.image} alt="" />
                <div className="basket-main">
                  <div className="basket-name">
                    <div><b>{item.name}</b><small>{item.category}</small></div>
                    <button onClick={() => remove(item.id)}><Icon name="close" size={14} /></button>
                  </div>
                  <div className="basket-bottom">
                    <strong>ETB {item.price * item.quantity}</strong>
                    <div className="qty">
                      <button onClick={() => decrease(item.id)}><Icon name="minus" size={13} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increase(item)}><Icon name="plus" size={13} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="payment-box">
            <div className="section-label">PAYMENT SUMMARY</div>
            <p><span>Subtotal</span><b>ETB {subtotal}</b></p>
            <p><span>Delivery</span><b>{delivery ? `ETB ${delivery}` : "FREE"}</b></p>
            <div className="total-line"><span>Grand Total</span><strong>ETB {total}</strong></div>
          </div>

          <button className="wide-add" onClick={onCheckout}>
            <span>Proceed to checkout</span><strong>ETB {total}</strong>
          </button>
        </>
      )}
    </div>
  );
}
