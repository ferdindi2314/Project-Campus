import { createContext, useContext, useEffect, useState } from "react";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("orders");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setOrders(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error("Failed to parse orders", e);
        setOrders([]);
      }
    }
  }, []);

  const persist = (next) => {
    setOrders(next);
    localStorage.setItem("orders", JSON.stringify(next));
  };

  const addOrder = (payload) => {
    const id = Date.now();
    const orderId = `ORD-${String(id).slice(-6)}`;
    const order = {
      id,
      orderId,
      status: "completed",
      date: new Date().toISOString(),
      ...payload,
    };
    persist([order, ...orders]);
    return order;
  };

  const stats = {
    totalRevenue: orders.reduce((sum, o) => sum + (o.total || 0), 0),
    totalOrders: orders.length,
    completedOrders: orders.filter((o) => o.status === "completed").length,
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, stats }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
};
