import { useState } from 'react';
import ProductManagement from './components/ProductManagement';
import OrderManagement from './components/OrderManagement';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="App">
      <div className="header">
        <h1>🛒 Grocery Shop Management</h1>
        <p>Manage your products and orders efficiently</p>
      </div>

      <div className="container">
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
        </div>

        {activeTab === 'products' && <ProductManagement />}
        {activeTab === 'orders' && <OrderManagement />}
      </div>
    </div>
  );
}

export default App;

