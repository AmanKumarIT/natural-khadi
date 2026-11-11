import { INDIAN_STATES } from '../../data/states';
import { samples as allSamples } from '../../data/samples';

const BANKS = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank', 'Other banks'];

export const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI (GPay / PhonePe / Paytm)', icon: 'qr_code_2', prepaid: true },
  { id: 'card', label: 'Credit / Debit Card', icon: 'credit_card', prepaid: true },
  { id: 'netbanking', label: 'Net Banking', icon: 'account_balance', prepaid: true },
  { id: 'cod', label: 'Cash on Delivery', icon: 'payments', prepaid: false },
];

export function validateDelivery(address, payment) {
  const e = {};
  if (!address.name.trim()) e.name = 'Enter your full name';
  if (!/^[6-9]\d{9}$/.test(address.phone)) e.phone = 'Enter a valid 10-digit mobile number';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email.trim())) e.email = 'Enter a valid email address';
  if (!address.line1.trim()) e.line1 = 'Enter your address';
  if (!/^\d{6}$/.test(address.pincode)) e.pincode = 'Enter a 6-digit pincode';
  if (!address.city.trim()) e.city = 'Enter your city';
  if (!address.state) e.state = 'Select your state';
  if (payment.method === 'upi' && !/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(payment.upiId.trim())) e.upiId = 'Enter a valid UPI ID (e.g. name@upi)';
  if (payment.method === 'card') {
    if (payment.cardNumber.replace(/\s/g, '').length !== 16) e.cardNumber = 'Enter a 16-digit card number';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.cardExpiry)) e.cardExpiry = 'Use MM/YY';
    if (!/^\d{3,4}$/.test(payment.cardCvv)) e.cardCvv = 'Invalid CVV';
    if (!payment.cardName.trim()) e.cardName = 'Name on card';
  }
  if (payment.method === 'netbanking' && !payment.bank) e.bank = 'Select your bank';
  return e;
}

const inputCls = (err) =>
  `w-full h-[44px] border rounded-[8px] px-3 bg-white font-nav-link text-sm text-near-black placeholder:text-[#6B6B6B] outline-none focus:ring-2 focus:ring-olive-gold-cta focus:ring-offset-1 ${err ? 'border-error' : 'border-card-border'}`;

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="block font-announcement-text text-[10px] font-semibold uppercase tracking-[0.14em] text-heading-gray mb-1">{label}</span>
      {children}
      {error && <span className="block font-nav-link text-[11px] text-error mt-1">{error}</span>}
    </label>
  );
}

export default function DeliveryStep({ address, setAddress, payment, setPayment, errors, showErrors, onBack, samplesSelected, gift }) {
  const err = (k) => (showErrors ? errors[k] : undefined);
  const setA = (k) => (e) => setAddress({ ...address, [k]: e.target.value });
  const setP = (k, fn) => (e) => setPayment({ ...payment, [k]: fn ? fn(e.target.value) : e.target.value });
  const chosen = allSamples.filter((s) => samplesSelected.includes(s.id));

  return (
    <div className="flex flex-col gap-5">
      <button type="button" onClick={onBack} className="self-start flex items-center gap-1 font-announcement-text text-[10px] font-bold uppercase tracking-[0.14em] text-heading-gray hover:text-near-black transition-colors">
        <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to bag
      </button>

      <section className="bg-surface-container-lowest border border-card-border rounded-lg p-5">
        <h2 className="font-headline-xl text-[18px] tracking-normal normal-case text-near-black">Delivery Details</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full name" error={err('name')}><input className={inputCls(err('name'))} value={address.name} onChange={setA('name')} autoComplete="name" placeholder="Your full name" /></Field>
          <Field label="Mobile number" error={err('phone')}>
            <input className={inputCls(err('phone'))} value={address.phone} inputMode="numeric" autoComplete="tel-national" onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} placeholder="10-digit mobile number" />
          </Field>
          <Field label="Email" error={err('email')} className="sm:col-span-2"><input type="email" className={inputCls(err('email'))} value={address.email} onChange={setA('email')} autoComplete="email" placeholder="you@example.com" /></Field>
          <Field label="Address" error={err('line1')} className="sm:col-span-2"><input className={inputCls(err('line1'))} value={address.line1} onChange={setA('line1')} autoComplete="address-line1" placeholder="House no., street, area" /></Field>
          <Field label="Landmark (optional)" className="sm:col-span-2"><input className={inputCls()} value={address.landmark} onChange={setA('landmark')} placeholder="Nearby landmark" /></Field>
          <Field label="Pincode" error={err('pincode')}><input className={inputCls(err('pincode'))} value={address.pincode} inputMode="numeric" autoComplete="postal-code" onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })} placeholder="6-digit pincode" /></Field>
          <Field label="City" error={err('city')}><input className={inputCls(err('city'))} value={address.city} onChange={setA('city')} autoComplete="address-level2" placeholder="City" /></Field>
          <Field label="State" error={err('state')} className="sm:col-span-2">
            <select className={inputCls(err('state'))} value={address.state} onChange={setA('state')} autoComplete="address-level1">
              <option value="">Select state</option>
              {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
        </div>
      </section>

      <section className="bg-surface-container-lowest border border-card-border rounded-lg p-5">
        <h2 className="font-headline-xl text-[18px] tracking-normal normal-case text-near-black">Payment Method</h2>
        <p className="font-nav-link text-xs text-forest-badge mt-1">Pay online and get an extra 5% off on prepaid orders.</p>
        <div className="mt-4 flex flex-col gap-2.5">
          {PAYMENT_METHODS.map((m) => {
            const on = payment.method === m.id;
            return (
              <div key={m.id} className={`rounded-lg border transition-colors ${on ? 'border-crimson-promo bg-[#FFF8F9]' : 'border-card-border'}`}>
                <button type="button" onClick={() => setPayment({ ...payment, method: m.id })} className="w-full flex items-center gap-3 px-4 py-3 text-left" aria-pressed={on}>
                  <span className={`w-[18px] h-[18px] rounded-[9999px] border-2 flex items-center justify-center ${on ? 'border-crimson-promo' : 'border-card-border'}`}>{on && <span className="w-2 h-2 rounded-[9999px] bg-crimson-promo" />}</span>
                  <span className="material-symbols-outlined text-[20px] text-olive-gold-cta">{m.icon}</span>
                  <span className="flex-1 font-nav-link text-sm text-near-black">{m.label}</span>
                  {m.prepaid && <span className="font-announcement-text text-[9px] font-bold uppercase tracking-[0.12em] text-forest-badge bg-forest-badge/10 rounded-[3px] px-1.5 py-0.5">5% off</span>}
                </button>
                {on && (
                  <div className="px-4 pb-4">
                    {m.id === 'upi' && (
                      <Field label="UPI ID" error={err('upiId')}><input className={inputCls(err('upiId'))} value={payment.upiId} onChange={setP('upiId')} placeholder="yourname@upi" /></Field>
                    )}
                    {m.id === 'card' && (
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Card number" error={err('cardNumber')} className="col-span-2">
                          <input className={inputCls(err('cardNumber'))} inputMode="numeric" value={payment.cardNumber} onChange={setP('cardNumber', (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim())} placeholder="1234 5678 9012 3456" />
                        </Field>
                        <Field label="Expiry (MM/YY)" error={err('cardExpiry')}>
                          <input className={inputCls(err('cardExpiry'))} inputMode="numeric" value={payment.cardExpiry} onChange={setP('cardExpiry', (v) => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d; })} placeholder="MM/YY" />
                        </Field>
                        <Field label="CVV" error={err('cardCvv')}>
                          <input className={inputCls(err('cardCvv'))} type="password" inputMode="numeric" value={payment.cardCvv} onChange={setP('cardCvv', (v) => v.replace(/\D/g, '').slice(0, 4))} placeholder="•••" />
                        </Field>
                        <Field label="Name on card" error={err('cardName')} className="col-span-2"><input className={inputCls(err('cardName'))} value={payment.cardName} onChange={setP('cardName')} placeholder="Name as printed on card" /></Field>
                      </div>
                    )}
                    {m.id === 'netbanking' && (
                      <Field label="Select bank" error={err('bank')}>
                        <select className={inputCls(err('bank'))} value={payment.bank} onChange={setP('bank')}>
                          <option value="">Choose your bank</option>
                          {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </Field>
                    )}
                    {m.id === 'cod' && <p className="font-nav-link text-xs text-heading-gray">Pay in cash when your order arrives. The 5% prepaid discount does not apply to Cash on Delivery.</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-3 font-nav-link text-[11px] text-heading-gray flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">lock</span>Payments are simulated in this build – no real charge is made.</p>
      </section>

      {(chosen.length > 0 || gift.on) && (
        <section className="bg-[#F7F3EC] border border-[#E9E0CF] rounded-lg p-4 font-nav-link text-xs text-heading-gray leading-relaxed">
          {chosen.length > 0 && <p><span className="font-semibold text-near-black">Complimentary minis:</span> {chosen.map((s) => s.name).join(', ')}</p>}
          {gift.on && gift.message && <p className="mt-1"><span className="font-semibold text-near-black">Gift message:</span> {gift.message}</p>}
        </section>
      )}
    </div>
  );
}
