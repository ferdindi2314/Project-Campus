import { createContext, useContext, useEffect, useState } from "react";
import { products as seedProducts } from "../data/products";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProducts(Array.isArray(parsed) ? parsed : seedProducts);
      } catch (e) {
        console.error("Failed to parse products from localStorage", e);
        setProducts(seedProducts);
        localStorage.setItem("products", JSON.stringify(seedProducts));
      }
    } else {
      setProducts(seedProducts);
      localStorage.setItem("products", JSON.stringify(seedProducts));
    }
  }, []);

  const persist = (next) => {
    setProducts(next);
    localStorage.setItem("products", JSON.stringify(next));
  };

  const addProduct = (product) => {
    const nextId = products.length
      ? Math.max(...products.map((p) => p.id)) + 1
      : 1;
    const newProduct = { ...product, id: nextId };
    persist([...products, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, patch) => {
    const next = products.map((p) => (p.id === id ? { ...p, ...patch } : p));
    persist(next);
  };

  const deleteProduct = (id) => {
    const next = products.filter((p) => p.id !== id);
    persist(next);
  };

  const getById = (id) => products.find((p) => p.id === Number(id));
  const getCategories = () => ["", ...new Set(products.map((p) => p.category))];

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getById,
        getCategories,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
};
