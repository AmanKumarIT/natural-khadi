import { useStore } from '../context/StoreContext';

/** Dropdown under the profile icon – shows only name, phone and email (as requested). */
export default function ProfileMenu({ onClose }) {
  const { user, openProfileEdit, logout } = useStore();
  const initial = (user.name || user.phone || '?').trim().charAt(0).toUpperCase();

  return (
    <div className="absolute right-0 top-[calc(100%+22px)] w-[300px] bg-surface-container-lowest border border-card-border rounded-[12px] shadow-[0_12px_28px_rgba(0,0,0,0.16)] p-5 kn-pop-in z-50 text-left">
      <div className="flex items-center gap-3 pb-4 border-b border-card-border">
        <div className="w-11 h-11 rounded-[9999px] bg-primary text-on-primary flex items-center justify-center font-card-price text-lg">{initial}</div>
        <div className="min-w-0">
          <p className="font-nav-link text-[15px] font-semibold text-near-black truncate">{user.name || 'Add your name'}</p>
          <p className="font-nav-link text-xs text-heading-gray">My Profile</p>
        </div>
      </div>
      <dl className="py-4 space-y-3 font-nav-link text-sm">
        <div>
          <dt className="text-[11px] uppercase tracking-widest text-heading-gray">Name</dt>
          <dd className="text-near-black">{user.name || '—'}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-widest text-heading-gray">Phone</dt>
          <dd className="text-near-black">+91 {user.phone}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-widest text-heading-gray">Email</dt>
          <dd className="text-near-black break-all">{user.email || '—'}</dd>
        </div>
      </dl>
      <div className="flex gap-2">
        <button type="button" onClick={() => { onClose(); openProfileEdit(); }} className="flex-1 h-10 rounded-[8px] border border-near-black text-near-black text-xs font-semibold uppercase tracking-wider hover:bg-near-black hover:text-on-primary transition-colors">
          Edit
        </button>
        <button type="button" onClick={() => { onClose(); logout(); }} className="flex-1 h-10 rounded-[8px] bg-near-black text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
}
