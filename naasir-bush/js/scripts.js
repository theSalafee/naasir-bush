const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
let savedTheme;
try { savedTheme = localStorage.getItem('theme'); } catch { /* Theme still works when storage is unavailable. */ }
function setTheme(dark) {
  root.dataset.theme = dark ? 'dark' : 'light';
  toggle.setAttribute('aria-pressed', String(dark));
  toggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  document.querySelector('meta[name="theme-color"]').content = dark ? '#20251e' : '#f4f1e9';
}
setTheme(savedTheme ? savedTheme === 'dark' : systemTheme.matches);
toggle.addEventListener('click', () => {
  const dark = root.dataset.theme !== 'dark';
  setTheme(dark);
  savedTheme = dark ? 'dark' : 'light';
  try { localStorage.setItem('theme', savedTheme); } catch { /* Keep the selected theme for this page. */ }
});
systemTheme.addEventListener('change', event => {
  if (!savedTheme) setTheme(event.matches);
});
document.getElementById('year').textContent = new Date().getFullYear();
