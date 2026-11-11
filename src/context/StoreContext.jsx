import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { productById } from '../data/products';
import * as authService from '../services/authService';

const StoreContext = createContext(null);

const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
};
const save = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* storage unavailable */ }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load('khadi_cart', [])); // [{ id, qty }]
  const [user, setUser] = useState(() => load('khadi_user', null)); // { phone, name, email }
  const [orders, setOrders] = useState(() => load('khadi_orders', []));
  const [cartOpen, setCartOpen] = useState(false);
  const [login, setLogin] = useState({ open: false, mode: 'login', reason: '' });
  const pendingAfterLogin = useRef(null);

  useEffect(() => save('khadi_cart', cart), [cart]);
  useEffect(() => save('khadi_user', user), [user]);
  useEffect(() => save('khadi_orders', orders), [orders]);

  /* ---------------- cart ---------------- */
  const addToCart = useCallback((id, qty = 1, { openDrawer = true } = {}) => {
    const product = productById[id];
    if (!product || !product.inStock) return;
    setCart((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: Math.min(i.qty + qty, 10) } : i));
      return [...prev, { id, qty: Math.min(qty, 10) }];
    });
    if (openDrawer) setCartOpen(true);
  }, []);

  const setQty = useCallback((id, qty) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(qty, 10)) } : i)));
  }, []);
  const removeFromCart = useCallback((id) => setCart((prev) => prev.filter((i) => i.id !== id)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const cartItems = useMemo(
    () => cart.map((i) => ({ product: productById[i.id], qty: i.qty })).filter((i) => i.product),
    [cart]
  );
  const cartCount = useMemo(() => cartItems.reduce((s, i) => s + i.qty, 0), [cartItems]);
  const cartSubtotal = useMemo(() => cartItems.reduce((s, i) => s + i.product.price * i.qty, 0), [cartItems]);

  /* ---------------- auth ---------------- */
  const openLogin = useCallback((reason = '', mode = 'login') => setLogin({ open: true, mode, reason }), []);
  const openProfileEdit = useCallback(() => setLogin({ open: true, mode: 'profile', reason: '' }), []);

  /** Runs `cb` straight away when logged in, otherwise opens the login overlay and runs it after login. */
  const requireLogin = useCallback((cb, reason = 'Login to continue to checkout') => {
    if (user) { cb(); return; }
    pendingAfterLogin.current = cb;
    setLogin({ open: true, mode: 'login', reason });
  }, [user]);

  const cancelLogin = useCallback(() => {
    pendingAfterLogin.current = null;
    setLogin((l) => ({ ...l, open: false }));
  }, []);

  const finishLogin = useCallback(() => {
    const cb = pendingAfterLogin.current;
    pendingAfterLogin.current = null;
    setLogin((l) => ({ ...l, open: false }));
    if (cb) setTimeout(cb, 0);
  }, []);

  const loginUser = useCallback((u) => setUser(u), []);
  const updateProfile = useCallback(async (patch) => {
    const next = { ...user, ...patch };
    await authService.saveProfile(next);
    setUser(next);
    return next;
  }, [user]);
  const logout = useCallback(() => { setUser(null); }, []);

  /* ---------------- orders ---------------- */
  const addOrder = useCallback((order) => setOrders((prev) => [order, ...prev]), []);

  const value = {
    cart, cartItems, cartCount, cartSubtotal, addToCart, setQty, removeFromCart, clearCart,
    cartOpen, openCart: () => setCartOpen(true), closeCart: () => setCartOpen(false),
    user, login, openLogin, openProfileEdit, requireLogin, cancelLogin, finishLogin, loginUser, updateProfile, logout,
    orders, addOrder,
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
};
