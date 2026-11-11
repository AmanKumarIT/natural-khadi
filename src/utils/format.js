const nf = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** ₹1,097.00 */
export const formatINR = (n) => `₹${nf.format(n || 0)}`;

/** RS. 1,097.00 – the format used on the product cards */
export const formatRS = (n) => `RS. ${nf.format(n || 0)}`;

export const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
