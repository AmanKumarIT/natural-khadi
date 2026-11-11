// ─────────────────────────────────────────────────────────────────────────────
// FRONT-END ONLY MOCK. Every function below is the exact seam where the real
// backend call goes later (see the TODO(backend) comments). Signatures can stay.
// ─────────────────────────────────────────────────────────────────────────────
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const PROFILES_KEY = 'khadi_profiles';

const readProfiles = () => {
  try { return JSON.parse(localStorage.getItem(PROFILES_KEY)) || {}; } catch { return {}; }
};
const writeProfiles = (p) => {
  try { localStorage.setItem(PROFILES_KEY, JSON.stringify(p)); } catch { /* ignore */ }
};

export const isValidIndianMobile = (v) => /^[6-9]\d{9}$/.test(v);

/** TODO(backend): POST /auth/send-otp { phone } */
export async function sendOtp(phone) {
  await delay(600);
  if (!isValidIndianMobile(phone)) throw new Error('Enter a valid 10-digit mobile number.');
  return { ok: true };
}

/** TODO(backend): POST /auth/verify-otp { phone, otp } -> { token, user }
 *  MOCK: any 6-digit code is accepted (e.g. 123456). */
export async function verifyOtp(phone, otp) {
  await delay(600);
  if (!/^\d{6}$/.test(otp)) throw new Error('Enter the 6-digit OTP.');
  const saved = readProfiles()[phone];
  return { token: 'mock-token', user: saved || { phone, name: '', email: '' } };
}

/** TODO(backend): PUT /me { name, email } */
export async function saveProfile(profile) {
  await delay(300);
  const all = readProfiles();
  all[profile.phone] = profile;
  writeProfiles(all);
  return profile;
}
