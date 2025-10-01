const apiBase = '/api';

const els = {
  tabSignin: document.getElementById('tab-signin'),
  tabSignup: document.getElementById('tab-signup'),
  linkProfile: document.getElementById('link-profile'),
  login: document.getElementById('login-section'),
  signup: document.getElementById('signup-section'),
  profile: document.getElementById('profile-section'),
  profileJson: document.getElementById('profile-json'),
  logout: document.getElementById('logout-btn'),
  profileName: document.getElementById('profile-name'),
  profileEmail: document.getElementById('profile-email'),
  profileRole: document.getElementById('profile-role'),
  profileRoles: document.getElementById('profile-roles'),
  profileId: document.getElementById('profile-id'),
  profileStatus: document.getElementById('profile-status'),
  profileAvatar: document.getElementById('profile-avatar'),
  // forgot password helpers
  forgot: document.getElementById('forgot-section'),
  forgotLink: document.getElementById('forgot-link'),
  backToLogin: document.getElementById('back-to-login'),
  authCard: document.getElementById('auth-card'),
};

function setActive(tab) {
  ['login', 'signup', 'profile', 'forgot'].forEach((id) => {
    const sec = els[id];
    if (sec) sec.classList.toggle('hidden', id !== tab);
  });
  [els.tabSignin, els.tabSignup].forEach((btn) => btn && btn.classList.remove('active'));
  if (tab === 'login' && els.tabSignin) els.tabSignin.classList.add('active');
  if (tab === 'signup' && els.tabSignup) els.tabSignup.classList.add('active');
  // hide entire auth card when showing profile or forgot
  if (els.authCard) els.authCard.classList.toggle('hidden', tab === 'profile' || tab === 'forgot');
}

function saveToken(token) { localStorage.setItem('accessToken', token); }
function getToken() { return localStorage.getItem('accessToken'); }
function clearToken() { localStorage.removeItem('accessToken'); }

async function api(path, options = {}) {
  const headers = options.headers || {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  headers['Content-Type'] = 'application/json';
  const res = await fetch(apiBase + path, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : res.text();
}

function initials(value, fallback = 'VS') {
  if (!value) return fallback;
  const chars = value
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .join('');
  return chars.slice(0, 2).toUpperCase() || fallback;
}

function prettifyRole(role) {
  if (!role) return '';
  return role
    .replace(/^ROLE_/i, '')
    .replace(/[_-]+/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractRoles(rawRoles) {
  if (!rawRoles) return [];
  if (Array.isArray(rawRoles)) {
    return rawRoles
      .map((role) => {
        if (typeof role === 'string') return role;
        if (role && typeof role === 'object') return role.name || role.role || role.code;
        return null;
      })
      .filter(Boolean);
  }
  if (typeof rawRoles === 'string') return [rawRoles];
  if (rawRoles && typeof rawRoles === 'object') {
    return Object.values(rawRoles);
  }
  return [];
}

function updateProfileCard(me) {
  if (!me) return;
  const name = me.fullName || me.name || me.email || 'Member';
  const roles = extractRoles(me.roles || me.role);
  const prettyRoles = roles.map(prettifyRole);

  if (els.profileName) els.profileName.textContent = name;
  if (els.profileEmail) els.profileEmail.textContent = me.email || 'Not provided';
  if (els.profileRole) els.profileRole.textContent = prettyRoles[0] || 'Member';
  if (els.profileRoles) els.profileRoles.textContent = prettyRoles.length ? prettyRoles.join(', ') : '—';
  if (els.profileAvatar) els.profileAvatar.textContent = initials(name);
  if (els.profileId) els.profileId.textContent = me.id != null ? `#${String(me.id).padStart(3, '0')}` : '—';

  const isActive = me.isActive !== false;
  if (els.profileStatus) {
    els.profileStatus.textContent = isActive ? 'Active' : 'Inactive';
    els.profileStatus.classList.toggle('inactive', !isActive);
  }

  if (els.profileJson) {
    els.profileJson.textContent = JSON.stringify(me, null, 2);
  }
}

const loginForm = document.getElementById('login-form');
if (loginForm) loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  try {
    const resp = await api('/auth/login', { method: 'POST', body: JSON.stringify(data) });
    saveToken(resp.accessToken);
    await loadProfile();
    setActive('profile');
  } catch (err) {
    alert('Login failed: ' + err.message);
  }
});

const signupForm = document.getElementById('signup-form');
if (signupForm) signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  try {
    // Normalize role value to expected enum
    if (data.role) data.role = String(data.role).toUpperCase();
    // If admin, require hard-coded access code
    if (data.role === 'ADMIN') {
      if (!data.adminCode || data.adminCode !== '11111') {
        alert('Password error: invalid admin access code');
        setActive('login');
        return;
      }
    }
    const resp = await api('/auth/signup', { method: 'POST', body: JSON.stringify(data) });
    // After successful signup, redirect to Sign In tab
    // Do not keep user logged in automatically
    clearToken();
    setActive('login');
    alert('Account created. Please sign in.');
  } catch (err) {
    // Try to show server message if present as JSON
    let message = err.message || '';
    try {
      const parsed = JSON.parse(message);
      if (parsed && parsed.message) message = parsed.message;
    } catch (_) {}
    alert('Signup failed: ' + message);
    if ((message || '').toLowerCase().includes('password')) {
      setActive('login');
    }
  }
});

if (els.logout) els.logout.addEventListener('click', () => { clearToken(); setActive('login'); });

if (els.tabSignin) els.tabSignin.addEventListener('click', () => setActive('login'));
if (els.tabSignup) els.tabSignup.addEventListener('click', () => setActive('signup'));
if (els.linkProfile) els.linkProfile.addEventListener('click', async () => { await loadProfile(); setActive('profile'); });
if (els.forgotLink) els.forgotLink.addEventListener('click', (e) => { e.preventDefault(); setActive('forgot'); });
if (els.backToLogin) els.backToLogin.addEventListener('click', (e) => { e.preventDefault(); setActive('login'); });

// Toggle admin code field visibility based on role
const signupRole = document.getElementById('signup-role');
const adminCodeGroup = document.getElementById('admin-code-group');
if (signupRole && adminCodeGroup) {
  const toggleAdmin = () => {
    const isAdmin = String(signupRole.value || '').toUpperCase() === 'ADMIN';
    adminCodeGroup.classList.toggle('hidden', !isAdmin);
  };
  signupRole.addEventListener('change', toggleAdmin);
  toggleAdmin();
}

document.querySelectorAll('.toggle-password').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const input = targetId ? document.getElementById(targetId) : null;
    if (!input) return;
    const isHidden = input.getAttribute('type') === 'password';
    input.setAttribute('type', isHidden ? 'text' : 'password');
    btn.setAttribute('aria-pressed', String(isHidden));
    btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
  });
});

async function loadProfile() {
  try {
    const me = await api('/users/me');
    updateProfileCard(me);
    setActive('profile');
  } catch (err) {
    alert('Please login first');
    setActive('login');
  }
}

// Initialize only when auth/profile sections exist
if (els.login || els.signup || els.profile || els.forgot) {
  const wantsForgot = location.hash === '#forgot' || location.pathname.endsWith('/forgot-password');
  if (wantsForgot && els.forgot) {
    setActive('forgot');
  } else if (getToken()) {
    loadProfile().catch(() => setActive('login'));
  } else {
    setActive('login');
  }
}

// Optional: handle forgot form submit gracefully (no backend required)
const forgotForm = document.getElementById('forgot-form');
if (forgotForm) forgotForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  alert('If the email exists, a reset link will be sent to ' + (data.email || 'your email'));
  setActive('login');
});
