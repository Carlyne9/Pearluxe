// Browser-side: joins the saved cart with product info (window.__catalog, set by the page) for the cart + checkout UI.
import { getCart } from './store';
import type { CatalogItem } from '../data/products';

export const ghs = (n: number) => `GH₵ ${n.toLocaleString('en-GH')}`;

const catalog = () => (window as unknown as { __catalog: Record<string, CatalogItem> }).__catalog;

export function cartLines() {
  return getCart()
    .map((item, index) => {
      const product = catalog()[item.slug];
      const color = product?.colors[item.color];
      return product && color ? { ...item, index, product, hex: color.hex, image: color.image } : null;
    })
    .filter((line) => line !== null);
}

export const cartTotals = () => {
  const lines = cartLines();
  return {
    count: lines.reduce((n, l) => n + l.qty, 0),
    subtotal: lines.reduce((sum, l) => sum + l.product.price * l.qty, 0),
  };
};

// Escape catalog text before putting it into innerHTML.
export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
