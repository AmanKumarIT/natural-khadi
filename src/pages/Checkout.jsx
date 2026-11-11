import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import CheckoutHeader from '../components/checkout/CheckoutHeader';
import BagStep from '../components/checkout/BagStep';
import DeliveryStep, { PAYMENT_METHODS, validateDelivery } from '../components/checkout/DeliveryStep';
import OrderSummary from '../components/checkout/OrderSummary';
import Confirmation from '../components/checkout/Confirmation';
import LoginModal from '../components/LoginModal';
import CartDrawer from '../components/CartDrawer';
import { computePricing, validatePromo } from '../utils/pricing';
import { PRICING } from '../config/site';
import { samples } from '../data/samples';
import { placeOrder } from '../services/orderService';
import { formatINR } from '../utils/format';

const STEPS = ['01. Bag Review', '02. Delivery & Payment', '03. Confirmation'];

export default function Checkout() {
  const { user, cartItems, setQty, removeFromCart, clearCart, addOrder, requireLogin } = useStore();
  const navigate = useNavigate();

  const [step, setStep] = useState(0); // 0 bag · 1 delivery/payment · 2 done
  const [promo, setPromo] = useState(null);
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [samplesSelected, setSamplesSelected] = useState(samples.slice(0, PRICING.samplesToChoose).map((s) => s.id));
  const [gift, setGift] = useState({ on: false, message: '' });
  const [address, setAddress] = useState({ name: user?.name || '', phone: user?.phone || '', email: user?.email || '', line1: '', landmark: '', pincode: '', city: '', state: '' });
  const [payment, setPayment] = useState({ method: 'upi', upiId: '', cardNumber: '', cardExpiry: '', cardCvv: '', cardName: '', bank: '' });
  const [showErrors, setShowErrors] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null);

  /* ----- login guard: checkout needs a logged-in customer ----- */
  useEffect(() => {
    if (!user && !order) {
      navigate('/', { replace: true });
      requireLogin(() => navigate('/checkout'), 'Login to proceed to checkout');
    }
  }, [user, order, navigate, requireLogin]);

  /* keep promo valid as the bag changes */
  useEffect(() => {
    if (promo && !validatePromo(promo.code, cartItems).ok) setPromo(null);
  }, [cartItems, promo]);

  useEffect(() => { window.scrollTo(0, 0); }, [step]);
  useEffect(() => { document.title = 'Checkout – Khadi Natural'; return () => { document.title = 'Khadi Natural – Herbal & Ayurvedic Luxury'; }; }, []);

  const pricing = useMemo(
    () => computePricing({ items: cartItems, promo, paymentMethod: step >= 1 ? payment.method : null }),
    [cartItems, promo, payment.method, step]
  );

  const applyPromo = () => {
    const res = validatePromo(promoInput, cartItems);
    if (!res.ok) { setPromoError(res.error); return; }
    setPromoError('');
    setPromo(res.promo);
    setPromoInput('');
  };
  const removePromo = () => { setPromo(null); setPromoError(''); };

  const toggleSample = (id) => {
    setSamplesSelected((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      const next = [...prev, id];
      return next.length > PRICING.samplesToChoose ? next.slice(1) : next; // oldest pick is replaced
    });
  };

  const errors = validateDelivery(address, payment);

  const handlePlaceOrder = async () => {
    if (Object.keys(errors).length) { setShowErrors(true); return; }
    setPlacing(true);
    try {
      const methodLabel = PAYMENT_METHODS.find((m) => m.id === payment.method).label;
      const created = await placeOrder({
        items: cartItems.map(({ product, qty }) => ({ id: product.id, name: product.name, price: product.price, qty, image: product.image })),
        samples: samples.filter((s) => samplesSelected.includes(s.id)).map((s) => `${s.name} (${s.size})`),
        gift,
        address,
        payment: { method: payment.method, label: methodLabel },
        promoCode: promo?.code || null,
        pricing,
        customerPhone: user?.phone,
      });
      addOrder(created);
      setOrder(created);
      clearCart();
      setStep(2);
    } finally { setPlacing(false); }
  };

  const emptyBag = cartItems.length === 0 && step < 2;
  const stepper = (
    <ol className="flex items-center gap-2 md:gap-3 flex-wrap font-announcement-text text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.12em]">
      {STEPS.map((s, i) => (
        <li key={s} className="flex items-center gap-2 md:gap-3">
          <span className={i === step ? 'text-crimson-promo' : i < step ? 'text-forest-badge' : 'text-heading-gray'}>{s}</span>
          {i < STEPS.length - 1 && <span className="text-card-border">—</span>}
        </li>
      ))}
    </ol>
  );

  return (
    <div className="min-h-screen bg-surface">
      <CheckoutHeader />
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 pt-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="font-announcement-text text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] text-olive-gold-cta">Secure Natural Checkout</p>
            <h1 className="font-headline-xl text-[30px] md:text-[36px] tracking-normal normal-case text-near-black mt-1">{step === 2 ? 'Order Confirmed' : 'Your Natural Bag'}</h1>
          </div>
          {stepper}
        </div>

        {step === 2 && order ? (
          <Confirmation order={order} />
        ) : emptyBag ? (
          <div className="text-center py-20 bg-surface-container-lowest border border-card-border rounded-lg">
            <span className="material-symbols-outlined text-5xl text-heading-gray">shopping_bag</span>
            <p className="font-nav-link text-[17px] text-near-black mt-3">Your bag is empty.</p>
            <Link to="/collection/all" className="inline-flex items-center justify-center mt-6 h-12 px-8 rounded-[6px] bg-near-black text-on-primary font-announcement-text text-[12px] font-bold uppercase tracking-[0.16em] hover:bg-neutral-800 transition-colors">Continue shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
            {step === 0 ? (
              <BagStep items={cartItems} onQty={setQty} onRemove={removeFromCart} samplesSelected={samplesSelected} onToggleSample={toggleSample} gift={gift} setGift={setGift} />
            ) : (
              <DeliveryStep address={address} setAddress={setAddress} payment={payment} setPayment={setPayment} errors={errors} showErrors={showErrors} onBack={() => setStep(0)} samplesSelected={samplesSelected} gift={gift} />
            )}
            <OrderSummary
              pricing={pricing}
              promo={promo}
              promoInput={promoInput}
              setPromoInput={(v) => { setPromoInput(v); setPromoError(''); }}
              promoError={promoError}
              onApplyPromo={applyPromo}
              onRemovePromo={removePromo}
              showPrepaid={step >= 1}
              showExpress={step === 0}
              onExpress={() => { setPayment((p) => ({ ...p, method: 'upi' })); setStep(1); }}
              ctaLabel={step === 0 ? 'Proceed to Secure Checkout' : `Place Order · ${formatINR(pricing.total)}`}
              ctaIcon={step === 0 ? 'lock' : 'verified_user'}
              ctaBusy={placing}
              onCta={step === 0 ? () => setStep(1) : handlePlaceOrder}
            />
          </div>
        )}
      </div>
      <CartDrawer />
      <LoginModal />
    </div>
  );
}
