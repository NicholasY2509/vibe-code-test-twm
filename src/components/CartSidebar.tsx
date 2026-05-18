import { useCart } from '../context/CartContext';
import { CartItem } from './CartItem';

export function CartSidebar() {
  const { 
    isCartOpen, setIsCartOpen, cart, totalItems, totalPrice, attemptCheckout 
  } = useCart();

  return (
    <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>購物車</h2>
        <button className="close-cart" onClick={() => setIsCartOpen(false)}>×</button>
      </div>
      
      <div>
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', marginTop: '50px' }}>購物車是空的</p>
        ) : (
          cart.map(item => (
            <CartItem key={item.product.id} item={item} />
          ))
        )}
      </div>
      
      <div className="cart-total">
        <div style={{ marginBottom: '10px', color: '#555' }}>共 {totalItems} 件商品</div>
        <div className="total-price">總計: NT$ {totalPrice}</div>
        <button className="checkout-btn" onClick={attemptCheckout}>結帳</button>
      </div>
    </div>
  );
}
