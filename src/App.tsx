import { useState } from 'react';
import './index.css';
import { ProductCard } from './components/ProductCard';
import { useProducts } from './hooks/useProducts';
import { CartProvider, useCart } from './context/CartContext';
import { CartSidebar } from './components/CartSidebar';
import { Dialog } from './components/Dialog';
import { ToastContainer } from './components/Toast';
import type { ToastMessage } from './components/Toast';

function MainContent() {
  const { products, isLoading } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  
  const {
    isCartOpen,
    setIsCartOpen,
    checkoutDialogOpen,
    setCheckoutDialogOpen,
    itemToRemove,
    confirmRemoveItem,
    cancelRemoveItem,
    confirmCheckout,
    totalItems,
    totalPrice
  } = useCart();

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>精品商店</h1>
          <div className="cart-icon" onClick={() => setIsCartOpen(!isCartOpen)}>
            🛒 購物車
            <div className="cart-count">{totalItems}</div>
          </div>
        </div>
        
        <div className="search-container">
          <input 
            type="search" 
            className="search-input" 
            placeholder="搜尋商品..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isLoading && <div className="loading">載入中...</div>}
        
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {!isLoading && filteredProducts.length === 0 && (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#999' }}>找不到相關商品</p>
          )}
        </div>
      </div>
      
      <CartSidebar />

      <Dialog 
        isOpen={checkoutDialogOpen}
        title="確認結帳"
        onConfirm={confirmCheckout}
        onCancel={() => setCheckoutDialogOpen(false)}
      >
        <p>您即將結帳共 {totalItems} 件商品，總金額為 NT$ {totalPrice}。確定要繼續嗎？</p>
      </Dialog>

      <Dialog 
        isOpen={itemToRemove !== null}
        title="移除商品"
        onConfirm={confirmRemoveItem}
        onCancel={cancelRemoveItem}
        confirmText="移除"
      >
        <p>確定要從購物車中移除這個商品嗎？</p>
      </Dialog>
    </>
  );
}

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (message: string) => {
    setToasts(prev => [...prev, { id: Date.now(), message }]);
  };
  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <CartProvider addToast={addToast}>
      <MainContent />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </CartProvider>
  );
}
