import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/authContext";
import { getCart } from "../services/api";

const Cart = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
      return;
    }

    if (user) {
      fetchCart();
    }
  }, [user, loading]);

  const fetchCart = async () => {
    const data = await getCart();
    setCartItems(data || []);
  };

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">My Cart</h2>
            <p className="text-sm text-slate-600">
              Review your selected items and proceed to checkout.
            </p>
          </div>
          <div className="rounded-full bg-slate-900 px-4 py-2 text-white">
            Total: ₹ {totalAmount}
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            Your cart is empty.
          </div>
        ) : (
          <div className="grid gap-6">
            {cartItems.map((item) => (
              <div key={item._id} className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img
                    src={item.product?.image || "https://via.placeholder.com/200x200?text=No+Image"}
                    alt={item.product?.title || "Cart product image"}
                    className="h-36 w-full max-w-xs shrink-0 rounded-3xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {item.product?.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {item.product?.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-700">
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ₹ {item.product?.price}</span>
                      <span>Subtotal: ₹ {(item.product?.price || 0) * item.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;