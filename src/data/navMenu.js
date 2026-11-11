// Primary navigation + hover dropdowns.
// Skin Care & Hair Care lists come from the reference screenshots; the rest were authored to fit each header.
const sub = (label, slug) => ({ label, slug });

export const navMenu = [
  {
    label: 'GIFTING', slug: 'gifting',
    items: [
      sub('Festive Gift Boxes', 'festive-gift-boxes'),
      sub('Skin Care Gift Kits', 'skin-care-gift-kits'),
      sub('Hair Care Gift Kits', 'hair-care-gift-kits'),
      sub('Soap Gift Sets', 'soap-gift-sets'),
      sub('Corporate Gifting', 'corporate-gifting'),
    ],
  },
  {
    label: 'SKIN CARE', slug: 'skin-care',
    items: [
      sub('Toners', 'toners'), sub('Face Wash', 'face-wash'), sub('Moisturisers', 'moisturisers'),
      sub('Face Scrub', 'face-scrub'), sub('Face Pack/Mask', 'face-pack-mask'), sub('Face Spray', 'face-spray'),
      sub('Hydro Gels', 'hydro-gels'), sub('Lip Balms', 'lip-balms'), sub('Sunscreen', 'sunscreen'),
      sub('Face Creams', 'face-creams'), sub('Body Butter', 'body-butter'),
      sub('Beauty Accessories', 'beauty-accessories'), sub('Hygiene Care', 'hygiene-care'),
    ],
  },
  {
    label: 'HAIR CARE', slug: 'hair-care',
    items: [
      sub('Hair Cleanser (Shampoo)', 'hair-cleanser-shampoo'), sub('Hair Conditioner', 'hair-conditioner'),
      sub('Hair Oils', 'hair-oils'), sub('Hair Colours', 'hair-colours'), sub('Mehndi', 'mehndi'),
      sub('Organic Powders', 'organic-powders'), sub('Hair Cream / Serum', 'hair-cream-serum'),
      sub('Hair Mask', 'hair-mask'),
    ],
  },
  {
    label: 'BODY CARE', slug: 'body-care',
    items: [
      sub('Body Wash', 'body-wash'), sub('Body Lotion', 'body-lotion'), sub('Body Scrub', 'body-scrub'),
      sub('Hand Cream', 'hand-cream'), sub('Foot Care', 'foot-care'), sub('Body Oils', 'body-oils'),
    ],
  },
  {
    label: 'SOAPS', slug: 'soaps',
    items: [
      sub('Handmade Soaps', 'handmade-soaps'), sub('Glycerine Soaps', 'glycerine-soaps'),
      sub('Herbal Soaps', 'herbal-soaps'), sub('Luxury Soaps', 'luxury-soaps'), sub('Soap Combos', 'soap-combos'),
    ],
  },
  {
    label: 'COMBOS', slug: 'combos',
    items: [
      sub('Hair Care Kits', 'hair-care-kits'), sub('Skin Care Kits', 'skin-care-kits'),
      sub('Facial Kits', 'facial-kits'), sub('Travel Kits', 'travel-kits'), sub('Gift Combos', 'gift-combos'),
    ],
  },
  {
    label: 'POWERED BOTANICS', slug: 'powered-botanics',
    items: [
      sub('Hair Cleansers', 'hair-cleanser-shampoo'), sub('Hair Oils', 'hair-oils'), sub('Hair Masks', 'hair-mask'),
      sub('Scalp Care', 'scalp-care'), sub('Herbal Powders', 'organic-powders'),
    ],
  },
  {
    label: 'BABY CARE', slug: 'baby-care',
    items: [
      sub('Baby Shampoo', 'baby-shampoo'), sub('Baby Lotion', 'baby-lotion'), sub('Baby Oil', 'baby-oil'),
      sub('Baby Soap', 'baby-soap'), sub('Baby Powder', 'baby-powder'),
    ],
  },
  {
    label: 'ESSENTIAL OILS', slug: 'essential-oils',
    items: [
      sub('Lavender Oil', 'lavender-oil'), sub('Tea Tree Oil', 'tea-tree-oil'), sub('Rosemary Oil', 'rosemary-oil'),
      sub('Eucalyptus Oil', 'eucalyptus-oil'), sub('Lemongrass Oil', 'lemongrass-oil'), sub('Sandalwood Oil', 'sandalwood-oil'),
    ],
  },
  {
    label: 'PRIVATE LABEL', slug: 'private-label',
    items: [
      sub('Skin Care Range', 'skin-care-range'), sub('Hair Care Range', 'hair-care-range'),
      sub('Body Care & Soaps', 'body-care-soaps'), sub('Custom Packaging', 'custom-packaging'),
      sub('Enquire Now', 'enquire-now'),
    ],
  },
];

export const subLink = (menu, item) => `/collection/${menu.slug}?type=${item.slug}`;
