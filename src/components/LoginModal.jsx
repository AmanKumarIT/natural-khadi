import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import useBodyScrollLock from '../hooks/useBodyScrollLock';
import * as authService from '../services/authService';
import { DEMO_OTP_HINT } from '../config/site';
import Logo from './Logo';

const VIOLET = '#6F5CE6';

function IndiaFlag() {
  return (
    <svg width="22" height="15" viewBox="0 0 22 15" aria-hidden="true" className="rounded-[2px] flex-shrink-0">
      <rect width="22" height="5" fill="#FF9933" />
      <rect y="5" width="22" height="5" fill="#fff" />
      <rect y="10" width="22" height="5" fill="#138808" />
      <circle cx="11" cy="7.5" r="1.9" fill="none" stroke="#000080" strokeWidth="0.7" />
    </svg>
  );
}

function Terms({ onNavigate }) {
  const link = 'font-bold underline underline-offset-2 text-[#333]';
  return (
    <div className="flex gap-1.5 mt-3 px-1 font-nav-link text-[13px] leading-[15px] text-[#444]">
      <span className="material-symbols-outlined text-[15px] mt-[1px]">info</span>
      <p>
        By proceeding, you are agreeing to our{' '}
        <Link to="/info/terms" onClick={onNavigate} className={link}>T&amp;C</Link> and{' '}
        <Link to="/info/terms" onClick={onNavigate} className={link}>Privacy Policy</Link> and Shiprocket&apos;s{' '}
        <a href="https://www.shiprocket.in/terms-and-conditions/" target="_blank" rel="noopener noreferrer" className={link}>T&amp;C</a> and{' '}
        <a href="https://www.shiprocket.in/privacy-policy/" target="_blank" rel="noopener noreferrer" className={link}>Privacy Policy</a>.
      </p>
    </div>
  );
}

const fieldCls =
  'w-full h-[48px] border border-card-border rounded-[8px] px-3 font-nav-link text-[15px] text-near-black placeholder:text-[#6B6B6B] outline-none focus:border-[#6F5CE6] focus:ring-2 focus:ring-[#6F5CE6]/30';

function LoginModalInner() {
  const { login, user, cancelLogin, finishLogin, loginUser, updateProfile } = useStore();
  const editing = login.mode === 'profile' && !!user;

  const [step, setStep] = useState(editing ? 'profile' : 'phone'); // phone → otp → profile
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState(editing ? user.name || '' : '');
  const [email, setEmail] = useState(editing ? user.email || '' : '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  useBodyScrollLock(true);

  const close = () => (step === 'profile' && !editing ? finishLogin() : cancelLogin());

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    if (resendIn <= 0) return undefined;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  const submitPhone = async (e) => {
    e?.preventDefault();
    setError('');
    if (!authService.isValidIndianMobile(phone)) { setError('Enter a valid 10-digit mobile number.'); return; }
    setLoading(true);
    try {
      await authService.sendOtp(phone);
      setStep('otp');
      setResendIn(30);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const submitOtp = async (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user: u } = await authService.verifyOtp(phone, otp);
      loginUser(u);
      if (u.name && u.email) finishLogin(); else setStep('profile');
      if (u.name) setName(u.name);
      if (u.email) setEmail(u.email);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const resend = async () => {
    if (resendIn > 0) return;
    setError('');
    try { await authService.sendOtp(phone); setResendIn(30); } catch (err) { setError(err.message); }
  };

  const submitProfile = async (e) => {
    e?.preventDefault();
    setError('');
    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError('Enter a valid email address.'); return; }
    setLoading(true);
    try {
      await updateProfile({ name: name.trim(), email: email.trim() });
      finishLogin();
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const rowCls = 'flex h-[60px] border-[1.5px] rounded-[10px] overflow-hidden bg-white';

  return (
    <div className="fixed inset-0 z-[70] bg-scrim-dark flex items-center justify-center kn-fade-in" onMouseDown={(e) => e.target === e.currentTarget && close()} role="dialog" aria-modal="true" aria-label="Login">
      <div className="relative w-[475px] max-w-[94vw] h-[650px] max-h-[92vh] rounded-[24px] bg-gradient-to-b from-modal-violet-top to-modal-violet-bottom kn-pop-in">
        {/* close */}
        <button type="button" onClick={close} aria-label="Close" className="absolute left-1/2 -translate-x-1/2 -top-[46px] w-[30px] h-[30px] rounded-[9999px] bg-white flex items-center justify-center shadow-md" style={{ color: '#4F46E5' }}>
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* logo */}
        <div className="absolute top-[7%] left-1/2 -translate-x-1/2 w-[285px] max-w-[80%] h-[125px] bg-white flex items-center justify-center">
          <Logo compact />
        </div>

        {/* inner card */}
        <div className="absolute left-[15px] right-[15px] bottom-[45px] bg-white rounded-[16px] px-[15px] pt-5 pb-5 min-h-[255px] flex flex-col justify-end">
          <div className="flex-1 pb-4 px-1">
            {step === 'phone' && (
              <>
                <h3 className="font-nav-link text-[22px] font-semibold text-near-black">Login / Sign up</h3>
                <p className="font-nav-link text-sm text-heading-gray mt-1">{login.reason || 'Enter your mobile number to continue'}</p>
              </>
            )}
            {step === 'otp' && (
              <>
                <h3 className="font-nav-link text-[22px] font-semibold text-near-black">Verify OTP</h3>
                <p className="font-nav-link text-sm text-heading-gray mt-1">Enter the 6-digit code sent to +91 {phone}</p>
              </>
            )}
            {step === 'profile' && (
              <>
                <h3 className="font-nav-link text-[22px] font-semibold text-near-black">{editing ? 'Edit profile' : 'Complete your profile'}</h3>
                <p className="font-nav-link text-sm text-heading-gray mt-1">Mobile: +91 {user?.phone}</p>
              </>
            )}
          </div>

          {step === 'phone' && (
            <form onSubmit={submitPhone}>
              <div className={rowCls} style={{ borderColor: VIOLET }}>
                <div className="flex items-center gap-2 pl-3 pr-3 border-r border-card-border">
                  <IndiaFlag />
                  <span className="font-nav-link text-[19px] text-near-black">+91</span>
                </div>
                <input
                  autoFocus
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile number"
                  aria-label="10-digit mobile number"
                  className="flex-1 min-w-0 px-3 font-nav-link text-[17px] text-near-black placeholder:text-[#9a9a9a] outline-none"
                />
                <button type="submit" disabled={loading} className="px-[16px] text-on-primary font-nav-link text-[18px] font-semibold disabled:opacity-70" style={{ background: VIOLET }}>
                  {loading ? '…' : 'Login'}
                </button>
              </div>
              {error && <p className="mt-2 px-1 font-nav-link text-[13px] text-error">{error}</p>}
              <Terms onNavigate={cancelLogin} />
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={submitOtp}>
              <div className={rowCls} style={{ borderColor: VIOLET }}>
                <input
                  autoFocus
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="6-digit OTP"
                  aria-label="6-digit OTP"
                  className="flex-1 min-w-0 px-4 font-nav-link text-[20px] tracking-[0.3em] text-near-black placeholder:text-[#9a9a9a] placeholder:tracking-normal placeholder:text-[17px] outline-none"
                />
                <button type="submit" disabled={loading || otp.length !== 6} className="px-[18px] text-on-primary font-nav-link text-[18px] font-semibold disabled:opacity-60" style={{ background: VIOLET }}>
                  {loading ? '…' : 'Verify'}
                </button>
              </div>
              {error && <p className="mt-2 px-1 font-nav-link text-[13px] text-error">{error}</p>}
              <div className="flex items-center justify-between mt-3 px-1 font-nav-link text-[13px]">
                <button type="button" onClick={() => { setStep('phone'); setOtp(''); setError(''); }} className="font-bold underline underline-offset-2 text-[#333]">Change number</button>
                <button type="button" onClick={resend} disabled={resendIn > 0} className="font-bold text-[#333] disabled:text-[#888] disabled:no-underline underline underline-offset-2">
                  {resendIn > 0 ? `Resend OTP in 0:${String(resendIn).padStart(2, '0')}` : 'Resend OTP'}
                </button>
              </div>
              {DEMO_OTP_HINT && <p className="mt-2 px-1 font-nav-link text-[12px] text-[#888]">Demo mode: any 6-digit code works (e.g. 123456).</p>}
            </form>
          )}

          {step === 'profile' && (
            <form onSubmit={submitProfile} className="flex flex-col gap-3">
              <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" aria-label="Full name" className={fieldCls} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" aria-label="Email address" className={fieldCls} />
              {error && <p className="px-1 font-nav-link text-[13px] text-error">{error}</p>}
              <button type="submit" disabled={loading} className="h-[52px] rounded-[10px] text-on-primary font-nav-link text-[17px] font-semibold disabled:opacity-70" style={{ background: VIOLET }}>
                {loading ? 'Saving…' : editing ? 'Save changes' : 'Save & Continue'}
              </button>
              {!editing && (
                <button type="button" onClick={finishLogin} className="font-nav-link text-[13px] font-bold underline underline-offset-2 text-[#333]">Skip for now</button>
              )}
            </form>
          )}
        </div>

        <div className="absolute bottom-[14px] left-0 right-0 flex items-center justify-center gap-1 font-nav-link text-[13px] text-near-black">
          <span className="font-semibold text-on-primary">Powered by</span>
          <span className="font-bold text-on-primary">Shiprocket</span>
        </div>
      </div>
    </div>
  );
}

export default function LoginModal() {
  const { login } = useStore();
  if (!login.open) return null;
  return <LoginModalInner key={`${login.mode}-${login.reason}`} />;
}
