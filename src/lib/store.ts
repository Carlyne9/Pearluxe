// shortcut: cart + favourites live in this browser only (localStorage); move the cart server-side when Paystack checkout is built.
export interface CartItem {
  slug: string;
  color: string;
  size?: string;
  qty: number;
}

const read = <T>(key: string, fallback: T): T => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '') ?? fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
  document.dispatchEvent(new CustomEvent('store:change'));
};

export const getCart = () => read<CartItem[]>('pl-cart', []);

export function addToCart(item: CartItem) {
  const cart = getCart();
  const same = cart.find((i) => i.slug === item.slug && i.color === item.color && i.size === item.size);
  if (same) same.qty += item.qty;
  else cart.push(item);
  write('pl-cart', cart);
}

export const getFavorites = () => read<string[]>('pl-favs', []);

export function toggleFavorite(slug: string) {
  const favs = getFavorites();
  const i = favs.indexOf(slug);
  if (i < 0) favs.push(slug);
  else favs.splice(i, 1);
  write('pl-favs', favs);
}

export function setQty(index: number, qty: number) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].qty = Math.min(10, Math.max(1, qty));
  write('pl-cart', cart);
}

export function removeFromCart(index: number) {
  const cart = getCart();
  cart.splice(index, 1);
  write('pl-cart', cart);
}

export function addFavorite(slug: string) {
  if (!getFavorites().includes(slug)) toggleFavorite(slug);
}
