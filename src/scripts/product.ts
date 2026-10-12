// Behaviour for anything inside [data-product]: product cards and the bag detail page.
import { addToCart, getFavorites, toggleFavorite } from '../lib/store';

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function syncFavorites() {
  const favs = getFavorites();
  document.querySelectorAll<HTMLElement>('[data-fav]').forEach((b) => {
    b.setAttribute('aria-pressed', String(favs.includes(b.dataset.fav!)));
  });
}

// Swatch picked: show that color's photos.
document.addEventListener('change', (e) => {
  const input = e.target as HTMLInputElement;
  if (!input.matches('[data-swatch]')) return;
  const product = input.closest<HTMLElement>('[data-product]')!;
  product.querySelectorAll<HTMLElement>('[data-gallery-color]').forEach((g) => {
    g.hidden = g.dataset.galleryColor !== input.value;
    // Only the shown color's video plays.
    const video = g.querySelector<HTMLVideoElement>('[data-slide-video]');
    if (!video) return;
    if (g.hidden || reduceMotion) video.pause();
    else {
      g.querySelector('[data-track]')?.scrollTo({ left: 0 });
      video.play().catch(() => {});
    }
  });
  const label = product.querySelector('[data-color-label]');
  if (label) label.textContent = input.value;
});

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  const fav = target.closest<HTMLElement>('[data-fav]');
  if (fav) return toggleFavorite(fav.dataset.fav!);

  const gallery = target.closest<HTMLElement>('[data-step]');
  if (gallery) {
    const track = gallery.closest('.gallery')!.querySelector<HTMLElement>('[data-track]')!;
    return track.scrollBy({ left: Number(gallery.dataset.step) * track.clientWidth, behavior: 'smooth' });
  }

  const step = target.closest<HTMLElement>('[data-qty-step]');
  if (step) {
    const input = step.parentElement!.querySelector<HTMLInputElement>('[data-qty]')!;
    input.value = String(Math.min(10, Math.max(1, Number(input.value) + Number(step.dataset.qtyStep))));
    return;
  }

  if (target.closest('[data-toast-close]')) return hideToast();

  const add = target.closest<HTMLButtonElement>('[data-add]');
  if (!add) return;
  const product = add.closest<HTMLElement>('[data-product]')!;
  const color = product.querySelector<HTMLInputElement>('[data-swatch]:checked')?.value;
  if (!color) return;
  addToCart({
    slug: product.dataset.product!,
    color,
    size: product.querySelector<HTMLInputElement>('[data-size]:checked')?.value ?? product.dataset.defaultSize,
    qty: Math.min(10, Math.max(1, Number(product.querySelector<HTMLInputElement>('[data-qty]')?.value) || 1)),
  });
  showToast(`${product.querySelector('h1, h3')?.textContent} (${color}) added to cart`);
  const label = add.innerHTML;
  add.textContent = 'Added ✓';
  add.disabled = true;
  setTimeout(() => {
    add.innerHTML = label;
    add.disabled = false;
  }, 1500);
});

// "Added to cart" pop-up (src/components/CartToast.astro).
let toastTimer: ReturnType<typeof setTimeout>;
function showToast(text: string) {
  const toast = document.querySelector<HTMLElement>('[data-cart-toast]');
  if (!toast) return;
  toast.querySelector('[data-toast-text]')!.textContent = text;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 6000);
}
function hideToast() {
  const toast = document.querySelector<HTMLElement>('[data-cart-toast]');
  if (toast) toast.hidden = true;
}

// Gallery dots follow the swipe position.
document.querySelectorAll<HTMLElement>('[data-track]').forEach((track) => {
  const dots = track.closest('.gallery')!.querySelectorAll('.dots span');
  const video = track.querySelector<HTMLVideoElement>('[data-slide-video]');
  track.addEventListener('scroll', () => {
    const i = Math.round(track.scrollLeft / track.clientWidth);
    dots.forEach((d, j) => d.classList.toggle('on', i === j));
    // The video is slide 1: pause it while the shopper looks at the photos.
    if (video && !reduceMotion) (i === 0 ? video.play().catch(() => {}) : video.pause());
  }, { passive: true });
  if (video && reduceMotion) video.pause();
});

document.addEventListener('store:change', syncFavorites);
syncFavorites();
