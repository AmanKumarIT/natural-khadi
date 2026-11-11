// ─────────────────────────────────────────────────────────────
// Site-wide settings. Edit here – nothing else needs touching.
// ─────────────────────────────────────────────────────────────

// TODO: replace with the real Khadi Natural social profile URLs.
export const SOCIAL_LINKS = [
  { key: 'facebook', label: 'Share on social', icon: 'public', href: 'https://www.facebook.com/' },
  { key: 'instagram', label: 'Media channel', icon: 'photo_camera', href: 'https://www.instagram.com/' },
  { key: 'youtube', label: 'Video feed', icon: 'smart_display', href: 'https://www.youtube.com/' },
  { key: 'x', label: 'Newsletter feed', icon: 'rss_feed', href: 'https://x.com/' },
];

export const CONTACT = {
  phone: '1800 123 0690',
  email: 'care@khadinatural.com',
  hours: 'Mon - Sat: 9:30 AM - 6:30 PM IST',
};

// Rotating promo bar (arrows + auto-rotate). First entry is the original two-part message.
export const ANNOUNCEMENTS = [
  { parts: ['FREE SHIPPING ON ORDERS ABOVE ₹249', 'SHOP THE DIWALI SALE - USE CODE DWB1G1'], to: '/collection/all' },
  { parts: ['GET 25% FLAT OFF ON SUNSCREEN'], to: '/collection/skin-care?type=sunscreen' },
  { parts: ['UP TO 25% OFF ON GIFT KITS'], to: '/collection/gifting' },
  { parts: ['SHOP @799 & GET A WATERMELON LIP BALM FREE'], to: '/collection/skin-care' },
];

// Pricing rules used by the cart drawer + checkout.
export const PRICING = {
  currency: '₹',
  freeShippingThreshold: 249, // matches the "FREE SHIPPING ON ORDERS ABOVE ₹249" banner
  shippingFee: 49, // ASSUMPTION – charged below the free-shipping threshold. Change if different.
  gstRate: 0.18, // prices are GST-inclusive; this only drives the informational "GST included" line
  prepaidDiscountRate: 0.05, // "5% OFF ON PREPAID ORDERS" – applied for UPI / Card / Net Banking
  samplesToChoose: 2,
};

// Shown as a small hint in the OTP step while the backend is not connected. Set to false to hide.
export const DEMO_OTP_HINT = true;
