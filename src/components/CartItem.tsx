import type { CartItem as CartItemType } from '../types';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { handleQuantityChange, setItemToRemove } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item-image">圖片</div>
      <div className="cart-item-details">
        <div className="cart-item-title">{item.product.name}</div>
        <div className="cart-item-price">NT$ {item.product.price}</div>
        <div className="quantity-controls">
          <button className="quantity-btn" onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}>-</button>
          <input 
            type="number" 
            className="quantity-input" 
            value={item.quantity} 
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val)) {
                handleQuantityChange(item.product.id, val);
              }
            }}
            min="0"
          />
          <button className="quantity-btn" onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}>+</button>
          <button className="remove-btn" onClick={() => setItemToRemove(item.product.id)}>移除</button>
        </div>
      </div>
    </div>
  );
}
