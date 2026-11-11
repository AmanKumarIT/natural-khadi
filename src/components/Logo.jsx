/** Brand lockup from the original header (also reused in the login modal). */
export default function Logo({ className = '', compact = false }) {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center mb-space-xs">
        <span className="material-symbols-outlined text-primary text-xl">spa</span>
      </div>
      <span className={`font-headline-xl ${compact ? 'text-[21px] tracking-[0.16em]' : 'text-headline-lg tracking-[0.22em]'} text-near-black uppercase font-medium`}>
        NATURAL KHADI
      </span>
      <span className="font-announcement-text text-[10px] tracking-[0.25em] text-heading-gray uppercase -mt-1">
        HERBAL &amp; AYURVEDIC LUXURY
      </span>
    </div>
  );
}
