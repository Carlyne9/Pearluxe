export interface Color {
  name: string;
  hex: string;
  inStock: boolean;
  images: string[];
  /** Plays as the first slide on the bag's page: public/products/<slug>/video.mp4 + video-poster.jpg */
  video?: { src: string; poster: string };
}

export interface Product {
  slug: string;
  name: string;
  edition?: string;
  price: number;
  compareAt?: number;
  isNew?: boolean;
  sizes?: string[];
  description: string;
  dimensions: string;
  colors: Color[];
}

// shortcut: generated placeholder photos; replace with the client's real product images.
const photos = (hex: string, count = 3) =>
  Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000"><rect width="800" height="1000" fill="#F1EBF8"/><g transform="rotate(${(n - 2) * 8} 400 540)"><path d="M300 400q100-190 200 0" fill="none" stroke="${hex}" stroke-width="26"/><rect x="200" y="390" width="400" height="320" rx="28" fill="${hex}"/></g></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  });

const color = (name: string, hex: string, inStock = true): Color => ({ name, hex, inStock, images: photos(hex) });

// Real bag photos from the client's TikTok: public/products/<slug>/1.jpg, 2.jpg, ...
const real = (slug: string, count: number) => Array.from({ length: count }, (_, i) => `/products/${slug}/${i + 1}.jpg`);

export const products: Product[] = [
  // --- Real bags (from the client's TikTok). Prices set 2026-10-12. TODO: dimensions from the client. ---
  {
    slug: 'noir-ribbed-tote', name: 'Noir Ribbed Tote', edition: 'Ribbed leather', price: 250, isNew: true,
    description: 'A sleek everyday tote in fine ribbed leather with rounded top handles.',
    dimensions: 'To be confirmed',
    colors: [{ name: 'Black', hex: '#1A1A1C', inStock: true, images: real('noir-ribbed-tote', 3), video: { src: '/products/noir-ribbed-tote/video.mp4', poster: '/products/noir-ribbed-tote/video-poster.jpg' } }],
  },
  {
    slug: 'ines-top-handle', name: 'Ines Top Handle', edition: 'Snake-embossed', price: 250, isNew: true,
    description: 'A structured top-handle bag in snake-embossed finish with a signature leather tab and detachable strap.',
    dimensions: 'To be confirmed',
    colors: [{ name: 'Navy', hex: '#1F2A44', inStock: true, images: real('ines-top-handle', 3), video: { src: '/products/ines-top-handle/video.mp4', poster: '/products/ines-top-handle/video-poster.jpg' } }],
  },
  {
    slug: 'pearl-denim-shoulder-bag', name: 'Pearl Denim Shoulder Bag', edition: 'Washed denim', price: 250, isNew: true,
    description: 'A washed denim shoulder bag with black leather trim, adjustable buckle straps and a pearl charm.',
    dimensions: 'To be confirmed',
    colors: [{ name: 'Washed black', hex: '#4A4C52', inStock: true, images: real('pearl-denim-shoulder-bag', 2), video: { src: '/products/pearl-denim-shoulder-bag/video.mp4', poster: '/products/pearl-denim-shoulder-bag/video-poster.jpg' } }],
  },
  {
    slug: 'chrisbella-shoulder-bag', name: 'Chrisbella Shoulder Bag', edition: 'Two-tone leather', price: 650, isNew: true,
    description: 'A structured two-tone shoulder bag with long slim straps, a knotted tassel and a matching coin pouch.',
    dimensions: 'To be confirmed',
    colors: [
      { name: 'Olive', hex: '#6B7A45', inStock: true, images: ['/products/chrisbella-shoulder-bag/olive-1.jpg', '/products/chrisbella-shoulder-bag/olive-2.jpg'], video: { src: '/products/chrisbella-shoulder-bag/video-olive.mp4', poster: '/products/chrisbella-shoulder-bag/video-olive-poster.jpg' } },
      { name: 'Cream', hex: '#E8DFCC', inStock: true, images: ['/products/chrisbella-shoulder-bag/cream-1.jpg', '/products/chrisbella-shoulder-bag/cream-2.jpg'], video: { src: '/products/chrisbella-shoulder-bag/video.mp4', poster: '/products/chrisbella-shoulder-bag/video-poster.jpg' } },
    ],
  },

  // --- Sample bags (placeholder photos), shown on /bags only. ---
  {
    slug: 'mira-shoulder-bag', name: 'Mira Shoulder Bag', edition: 'Smooth leather', price: 1250,
    description: 'A soft structured shoulder bag with a magnetic flap and adjustable strap.',
    dimensions: '28 × 18 × 9 cm',
    colors: [color('Plum', '#6E1F57'), color('Black', '#1C1622'), color('Cream', '#EDE3D3', false)],
  },
  {
    slug: 'ava-mini', name: 'Ava Mini', edition: 'Textured leather', price: 890, compareAt: 990, sizes: ['Mini', 'Medium'],
    description: 'A compact crossbody that fits your phone, cards and keys.',
    dimensions: 'Mini 18 × 12 × 6 cm · Medium 24 × 16 × 8 cm',
    colors: [color('Cream', '#EDE3D3'), color('Blush', '#E3C3BC')],
  },
  {
    slug: 'noor-tote', name: 'Noor Tote', edition: 'Smooth leather', price: 740, compareAt: 1480,
    description: 'An everyday tote with room for a 13" laptop and an inner zip pocket.',
    dimensions: '38 × 30 × 14 cm',
    colors: [color('Black', '#1C1622')],
  },
  {
    slug: 'lila-crossbody', name: 'Lila Crossbody', edition: 'Pebbled leather', price: 760,
    description: 'A rounded crossbody with a gold-tone zip.',
    dimensions: '20 × 20 × 7 cm',
    colors: [color('Lavender', '#C9B6E4', false), color('Olive', '#6B6A3C', false)],
  },
  {
    slug: 'zara-bucket-bag', name: 'Zara Bucket Bag', edition: 'Suede', price: 1120,
    description: 'A drawstring bucket bag with a detachable pouch.',
    dimensions: '25 × 27 × 15 cm',
    colors: [color('Tan', '#A8653A'), color('Olive', '#6B6A3C', false), color('Black', '#1C1622')],
  },
  {
    slug: 'esi-clutch', name: 'Esi Clutch', edition: 'Satin', price: 520,
    description: 'An evening clutch with a slim chain you can tuck away.',
    dimensions: '24 × 13 × 4 cm',
    colors: [color('Gold', '#C9A45C')],
  },
  {
    slug: 'ama-top-handle', name: 'Ama Top Handle', edition: 'Croc-embossed', price: 1190, compareAt: 1700,
    description: 'A structured top-handle bag with a removable shoulder strap.',
    dimensions: '26 × 19 × 11 cm',
    colors: [color('Violet', '#5E3B8C'), color('Black', '#1C1622'), color('Cream', '#EDE3D3')],
  },
  {
    slug: 'kemi-tote', name: 'Kemi Tote', edition: 'Woven', price: 980, sizes: ['Small', 'Large'],
    description: 'A hand-woven tote, light enough for every day.',
    dimensions: 'Small 30 × 24 × 12 cm · Large 40 × 32 × 16 cm',
    colors: [color('Natural', '#D9C6A0'), color('Black', '#1C1622', false)],
  },
];

export const ghs = (n: number) => `GH₵ ${n.toLocaleString('en-GH')}`;
export const percentOff = (p: Product) =>
  p.compareAt && p.compareAt > p.price ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
export const isSoldOut = (p: Product) => p.colors.every((c) => !c.inStock);
export const defaultColor = (p: Product) => (p.colors.find((c) => c.inStock) ?? p.colors[0]).name;
export const productUrl = (p: Product) => `/bags/${p.slug}`;

// Minimal product info the browser needs to draw the cart and checkout (keeps page scripts small).
export type CatalogItem = { name: string; price: number; compareAt?: number; url: string; colors: Record<string, { hex: string; image: string }> };
export const cartCatalog = (): Record<string, CatalogItem> =>
  Object.fromEntries(
    products.map((p) => [
      p.slug,
      {
        name: p.name,
        price: p.price,
        compareAt: p.compareAt,
        url: productUrl(p),
        colors: Object.fromEntries(p.colors.map((c) => [c.name, { hex: c.hex, image: c.images[0] }])),
      },
    ]),
  );
