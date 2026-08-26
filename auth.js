// ── Login ─────────────────────────────────────────
function handleLogin(e) {
  e.preventDefault();
  const id  = document.getElementById('identifier').value.trim();
  const pw  = document.getElementById('password').value;
  const err = document.getElementById('error-msg');

  if (!id || !pw) {
    err.textContent = 'Please enter your callsign/email and password.';
    err.style.display = 'block';
    return;
  }
  err.style.display = 'none';
  const btn = document.querySelector('.btn-submit');
  btn.textContent = 'Signing in…';
  btn.disabled = true;
  setTimeout(() => { window.location.href = 'index.html'; }, 1200);
}

// ── Register ──────────────────────────────────────
function updateStrength(pw) {
  const fill  = document.getElementById('strength-fill');
  const label = document.getElementById('strength-label');
  if (!fill || !label) return;
  let score = 0;
  if (pw.length >= 8)          score++;
  if (pw.length >= 12)         score++;
  if (/[A-Z]/.test(pw))        score++;
  if (/[0-9]/.test(pw))        score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const levels = [
    { w: '0%',   c: 'var(--border)',  t: 'Enter a password' },
    { w: '25%',  c: '#ff4757',        t: 'Weak' },
    { w: '50%',  c: '#ffd32a',        t: 'Fair' },
    { w: '75%',  c: '#3b82f6',        t: 'Good' },
    { w: '100%', c: '#2ed573',        t: 'Strong' },
  ];
  const lvl = pw.length === 0 ? 0 : Math.min(score, 4);
  fill.style.width      = levels[lvl].w;
  fill.style.background = levels[lvl].c;
  label.textContent     = levels[lvl].t;
  label.style.color     = levels[lvl].c;
}

function handleRegister(e) {
  e.preventDefault();
  const err = document.getElementById('error-msg');
  const suc = document.getElementById('success-msg');
  err.style.display = 'none';
  suc.style.display = 'none';

  const pw    = document.getElementById('password').value;
  const cfm   = document.getElementById('confirm').value;
  const mem   = document.getElementById('membership').value;
  const terms = document.getElementById('terms').checked;

  if (pw !== cfm) {
    err.textContent = 'Passwords do not match. Please re-enter.';
    err.style.display = 'block'; return;
  }
  if (pw.length < 8) {
    err.textContent = 'Password must be at least 8 characters.';
    err.style.display = 'block'; return;
  }
  if (!mem) {
    err.textContent = 'Please select a membership type.';
    err.style.display = 'block'; return;
  }
  if (!terms) {
    err.textContent = 'You must agree to the Terms of Membership to proceed.';
    err.style.display = 'block'; return;
  }

  const btn = document.getElementById('submit-btn');
  btn.textContent = 'Creating account…';
  btn.disabled = true;
  setTimeout(() => {
    suc.textContent = 'Account created! Your application has been submitted. A PARC officer will review and confirm your membership within 1–2 business days. Redirecting…';
    suc.style.display = 'block';
    setTimeout(() => { window.location.href = 'index.html'; }, 3000);
  }, 1400);
}

// ── Social OAuth (demo) ───────────────────────────
function handleSocialLogin(provider) {
  const btn = event.currentTarget;
  const original = btn.innerHTML;
  btn.innerHTML = `<span style="font-size:0.8rem;opacity:0.7">Redirecting to ${provider === 'google' ? 'Google' : 'Apple'}…</span>`;
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.disabled = false;
    alert(`${provider === 'google' ? 'Google' : 'Apple'} Sign-In requires server-side OAuth setup. This is a demo.`);
  }, 1500);
}

function handleSocialReg(provider) {
  handleSocialLogin(provider);
}
