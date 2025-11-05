import { useState, useEffect } from 'react';
import { orderAPI, productAPI } from '../services/api';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    items: [{ product: '', quantity: 1 }],
  });

  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, [statusFilter, customerFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (customerFilter) params.customerName = customerFilter;

      const response = await orderAPI.getAll(params);
      setOrders(response.data.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');

      const orderData = {
        ...formData,
        items: formData.items
          .filter((item) => item.product && item.quantity > 0)
          .map((item) => ({
            product: item.product,
            quantity: parseInt(item.quantity),
          })),
      };

      await orderAPI.create(orderData);
      setSuccess('Order placed successfully!');
      resetForm();
      fetchOrders();
      fetchProducts(); // Refresh products to update stock
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order');
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await orderAPI.updateStatus(id, newStatus);
      setSuccess('Order status updated successfully!');
      fetchOrders();
      fetchProducts(); // Refresh products in case order was cancelled
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update order status');
    }
  };

  const addOrderItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product: '', quantity: 1 }],
    });
  };

  const removeOrderItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const updateOrderItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      customerPhone: '',
      customerAddress: '',
      items: [{ product: '', quantity: 1 }],
    });
    setShowForm(false);
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      pending: 'badge-warning',
      processing: 'badge-info',
      shipped: 'badge-primary',
      delivered: 'badge-success',
      cancelled: 'badge-danger',
    };
    return classes[status] || 'badge-secondary';
  };

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Order Management</h2>
          <button className="btn btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
            {showForm ? 'Cancel' : '+ Place New Order'}
          </button>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label>Customer Name</label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Customer Phone</label>
              <input
                type="text"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Customer Address</label>
              <input
                type="text"
                value={formData.customerAddress}
                onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Order Items</label>
              {formData.items.map((item, index) => (
                <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                  <select
                    value={item.product}
                    onChange={(e) => updateOrderItem(index, 'product', e.target.value)}
                    required
                    style={{ flex: 2 }}
                  >
                    <option value="">Select Product</option>
                    {products
                      .filter((p) => p.stockQuantity > 0)
                      .map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.name} - ${product.price.toFixed(2)} (Stock: {product.stockQuantity})
                        </option>
                      ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateOrderItem(index, 'quantity', e.target.value)}
                    required
                    style={{ flex: 1, maxWidth: '100px' }}
                    placeholder="Qty"
                  />
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => removeOrderItem(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="btn btn-sm btn-secondary" onClick={addOrderItem}>
                + Add Item
              </button>
            </div>
            <button type="submit" className="btn btn-primary">
              Place Order
            </button>
          </form>
        )}
      </div>

      <div className="card">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by customer name..."
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading orders...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id.slice(-8)}</td>
                      <td>{order.customerName}</td>
                      <td>{order.customerPhone}</td>
                      <td>
                        {order.items.map((item, idx) => (
                          <div key={idx} style={{ marginBottom: '4px' }}>
                            {item.product?.name || 'N/A'} x{item.quantity}
                          </div>
                        ))}
                      </td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                          className="btn btn-sm"
                          style={{ padding: '6px 12px' }}
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;

