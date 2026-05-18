import type { Product } from '../types';
import { Button } from './Button';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-image"></div>
      <div className="product-title">{product.name}</div>
      <div className="product-price">NT$ {product.price}</div>
      <Button className="add-to-cart-btn" onClick={() => addToCart(product)}>
        加入購物車
      </Button>
    </div>
  );
}
