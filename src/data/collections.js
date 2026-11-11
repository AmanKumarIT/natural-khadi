import { products } from './products';
import { navMenu } from './navMenu';
import { concerns } from './concerns';

const ingredientTitles = {
  'amla-bhringraj': 'AMLA & BHRINGRAJ',
  'honey-almond': 'HONEY & ALMOND',
  'honey-sandalwood': 'HONEY & SANDALWOOD',
  'neem-aloe-vera': 'NEEM & ALOE VERA',
};

// Resolves /collection/:slug (+ optional ?type=sub-slug) into a title and product list.
export function resolveCollection(slug, type) {
  const typeLabel = (menu) => menu?.items.find((i) => i.slug === type)?.label;

  if (slug === 'all') return { title: 'ALL PRODUCTS', products, kind: 'all' };
  if (slug === 'best-sellers') return { title: 'BEST SELLERS', products: products.filter((p) => p.badge === 'BESTSELLER'), kind: 'all' };
  if (slug === 'new-arrivals') return { title: 'NEW ARRIVALS', products: products.filter((p) => p.badge === 'NEW LAUNCH'), kind: 'all' };

  const menu = navMenu.find((m) => m.slug === slug);
  if (menu) {
    let list = products.filter((p) => p.categories.includes(slug));
    const label = typeLabel(menu);
    if (type) list = list.filter((p) => p.subs.includes(type));
    return { title: menu.label, subtitle: label, products: list, kind: slug === 'private-label' ? 'enquiry' : 'category', menu, activeType: type, typeLabel: label };
  }
  const concern = concerns.find((c) => c.slug === slug);
  if (concern) return { title: `SHOP FOR ${concern.label}`, products: products.filter((p) => p.concerns.includes(slug)), kind: 'concern' };
  if (ingredientTitles[slug]) return { title: ingredientTitles[slug], products: products.filter((p) => p.ingredients.includes(slug)), kind: 'ingredient' };
  return null;
}
