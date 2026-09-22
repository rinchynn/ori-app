'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogIn, LogOut, Edit2, Check, Eye, EyeOff } from 'lucide-react';

interface UserProfile {
  phone: string;
  password: string;
  name: string;
  email: string;
  address: string;
}

const STORAGE_KEY = 'ori-user';
const ADMIN_PHONE = '11111111';

function getStoredUser(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export default function AccountPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [regName, setRegName] = useState('');
  const [regSurname, setRegSurname] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [nameVal, setNameVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [addressVal, setAddressVal] = useState('');

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
      setNameVal(stored.name);
      setEmailVal(stored.email);
      setAddressVal(stored.address);
    }
  }, []);

  const handleLogin = useCallback(() => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 8) {
      setError('Утасны дугаар 8 оронтой байх ёстой');
      return;
    }
    if (!password) {
      setError('Нууц үг оруулна уу');
      return;
    }
    setError('');
    if (cleaned === ADMIN_PHONE) {
      if (password === 'admin123') {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem('ori-admin-auth', ADMIN_PHONE);
        router.push('/admin');
      } else {
        setError('Нууц үг буруу байна');
      }
      return;
    }
    const existing = localStorage.getItem(`ori-user-${cleaned}`);
    if (isRegistering) {
      if (existing) {
        setError('Энэ дугаар бүртгэлтэй байна. Нэвтрэнэ үү.');
        return;
      }
      if (password.length < 8) {
        setError('Нууц үг дор хаяж 8 тэмдэгт байх ёстой');
        return;
      }
      if (password !== confirmPassword) {
        setError('Нууц үг таарахгүй байна');
        return;
      }
      if (!regSurname.trim() || !regName.trim()) {
        setError('Овог, нэрээ оруулна уу');
        return;
      }
      if (regEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) {
        setError('Зөв имэйл оруулна уу');
        return;
      }
      const profile: UserProfile = { phone: cleaned, password, name: `${regSurname.trim()} ${regName.trim()}`, email: regEmail.trim(), address: '' };
      localStorage.setItem(`ori-user-${cleaned}`, JSON.stringify(profile));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      router.push('/');
    } else {
      if (!existing) {
        setError('Бүртгэл олдсонгүй. Бүртгүүлнэ үү.');
        return;
      }
      const profile: UserProfile = JSON.parse(existing);
      if (profile.password !== password) {
        setError('Нууц үг буруу байна');
        return;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setUser(profile);
      setNameVal(profile.name);
      setEmailVal(profile.email);
      setAddressVal(profile.address);
    }
  }, [phone, password, confirmPassword, isRegistering, router, regName, regSurname, regEmail]);

  const saveField = useCallback((field: keyof UserProfile, value: string) => {
    if (!user) return;
    const updated = { ...user, [field]: value };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(`ori-user-${updated.phone}`, JSON.stringify(updated));
  }, [user]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setPhone('');
  }, []);

  /* ─── Logged-in view ─── */
  if (user) {
    return (
      <div className="mx-auto max-w-lg px-4 md:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-stone-900">Миний бүртгэл</h1>
          <button onClick={handleLogout} className="text-sm text-stone-500 hover:text-stone-800 flex items-center gap-1">
            <LogOut className="h-4 w-4" /> Гарах
          </button>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
            <div className="h-12 w-12 rounded-full bg-stone-900 flex items-center justify-center text-white font-bold text-lg">
              {user.name ? user.name[0].toUpperCase() : user.phone[0]}
            </div>
            <div>
              <p className="font-semibold text-stone-900">{user.name || 'Нэр оруулна уу'}</p>
              <p className="text-sm text-stone-500">{user.phone}</p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-xs font-medium text-stone-500">Нэр</label>
            <div className="flex items-center gap-2 mt-1">
              {editName ? (
                <>
                  <input value={nameVal} onChange={e => setNameVal(e.target.value)} className="flex-1 h-10 px-3 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900" />
                  <button onClick={() => { saveField('name', nameVal); setEditName(false); }} className="h-10 w-10 rounded-lg bg-stone-900 text-white flex items-center justify-center"><Check className="h-4 w-4" /></button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-sm text-stone-800">{user.name || '—'}</span>
                  <button onClick={() => setEditName(true)} className="text-stone-400 hover:text-stone-700"><Edit2 className="h-4 w-4" /></button>
                </>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-medium text-stone-500">Имэйл</label>
            <div className="flex items-center gap-2 mt-1">
              {editEmail ? (
                <>
                  <input value={emailVal} onChange={e => setEmailVal(e.target.value)} type="email" className="flex-1 h-10 px-3 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900" />
                  <button onClick={() => { saveField('email', emailVal); setEditEmail(false); }} className="h-10 w-10 rounded-lg bg-stone-900 text-white flex items-center justify-center"><Check className="h-4 w-4" /></button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-sm text-stone-800">{user.email || '—'}</span>
                  <button onClick={() => setEditEmail(true)} className="text-stone-400 hover:text-stone-700"><Edit2 className="h-4 w-4" /></button>
                </>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-xs font-medium text-stone-500">Хаяг</label>
            <div className="flex items-center gap-2 mt-1">
              {editAddress ? (
                <>
                  <input value={addressVal} onChange={e => setAddressVal(e.target.value)} className="flex-1 h-10 px-3 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900" />
                  <button onClick={() => { saveField('address', addressVal); setEditAddress(false); }} className="h-10 w-10 rounded-lg bg-stone-900 text-white flex items-center justify-center"><Check className="h-4 w-4" /></button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-sm text-stone-800">{user.address || '—'}</span>
                  <button onClick={() => setEditAddress(true)} className="text-stone-400 hover:text-stone-700"><Edit2 className="h-4 w-4" /></button>
                </>
              )}
            </div>
          </div>
        </div>


      </div>
    );
  }

  /* ─── Login view ─── */
  return (
    <div className="mx-auto max-w-lg px-4 md:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-stone-900 mb-2">Хэрэглэгчийн бүртгэл</h1>
      <p className="text-sm text-stone-500 mb-8">Нэвтрэн орж захиалгаа хянах, мэдээллээ удирдах.</p>

      <div className="bg-white rounded-xl border border-stone-200 p-6 text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-stone-100 flex items-center justify-center mb-4">
          <User className="h-7 w-7 text-stone-400" />
        </div>
        <h2 className="text-base font-semibold text-stone-900">{isRegistering ? 'Бүртгүүлэх' : 'Нэвтрэх'}</h2>
        <p className="mt-1 text-sm text-stone-500">{isRegistering ? 'Шинэ бүртгэл үүсгэх' : 'Утас, нууц үгээр нэвтэрнэ үү.'}</p>

        <div className="mt-5 space-y-3 max-w-xs mx-auto">
          {isRegistering && (
            <>
              <div>
                <input
                  type="text"
                  value={regSurname}
                  onChange={e => { setRegSurname(e.target.value); setError(''); }}
                  placeholder="Овог *"
                  className="w-full h-11 px-4 rounded-lg border border-stone-300 text-sm text-center focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={regName}
                  onChange={e => { setRegName(e.target.value); setError(''); }}
                  placeholder="Нэр *"
                  className="w-full h-11 px-4 rounded-lg border border-stone-300 text-sm text-center focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={regEmail}
                  onChange={e => { setRegEmail(e.target.value); setError(''); }}
                  placeholder="Имэйл"
                  className="w-full h-11 px-4 rounded-lg border border-stone-300 text-sm text-center focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>
            </>
          )}
          <div>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={8}
              value={phone}
              onChange={e => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 8)); setError(''); }}
              placeholder="Утасны дугаар (8 орон)"
              className="w-full h-11 px-4 rounded-lg border border-stone-300 text-sm text-center focus:outline-none focus:ring-2 focus:ring-stone-900"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              placeholder="Нууц үг"
              className="w-full h-11 px-4 pr-11 rounded-lg border border-stone-300 text-sm text-center focus:outline-none focus:ring-2 focus:ring-stone-900"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {isRegistering && (
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => { setConfirmPassword(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Нууц үг давтах"
                className="w-full h-11 px-4 pr-11 rounded-lg border border-stone-300 text-sm text-center focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
            </div>
          )}
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={phone.length === 0 || password.length === 0}
            className="w-full h-11 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <LogIn className="h-4 w-4" />
            {isRegistering ? 'Бүртгүүлэх' : 'Нэвтрэх'}
          </button>
          <button
            type="button"
            onClick={() => { setIsRegistering(!isRegistering); setError(''); setConfirmPassword(''); setRegName(''); setRegSurname(''); setRegEmail(''); }}
            className="w-full text-sm text-stone-500 hover:text-stone-800 transition-colors"
          >
            {isRegistering ? 'Бүртгэлтэй юу? Нэвтрэх' : 'Бүртгэлгүй юу? Бүртгүүлэх'}
          </button>
        </div>
      </div>


    </div>
  );
}
