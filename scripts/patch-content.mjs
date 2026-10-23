// Mobile fixes applied on top of the imported Claude Design pages.
// Run after import-prototype.mjs:  node scripts/patch-content.mjs
import fs from 'node:fs';

function patch(file, pairs) {
  let s = fs.readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    if (s.includes(to)) continue; // already patched
    if (!s.includes(from)) throw new Error('Patch target not found in ' + file + ': ' + from.slice(0, 80));
    s = s.replace(from, to);
  }
  fs.writeFileSync(file, s);
}

// Manager Dashboard: turn the fixed sidebar into a slide-in drawer with a hamburger on phones and tablets.
const DASH_CSS = `
@media (max-width:900px){
[data-dash-grid]{grid-template-columns:minmax(0,1fr)!important}
[data-dash-side]{position:fixed!important;top:0;left:0;bottom:0;width:min(280px,84vw);height:100%!important;z-index:60;transform:translateX(-102%);transition:transform .3s cubic-bezier(.2,.7,.2,1);box-shadow:20px 0 50px rgba(43,45,66,.25)}
#dash-nav:checked ~ [data-dash-grid] [data-dash-side]{transform:none}
[data-dash-backdrop]{display:block!important;position:fixed;inset:0;background:rgba(43,45,66,.45);z-index:55;opacity:0;pointer-events:none;transition:opacity .3s}
#dash-nav:checked ~ [data-dash-backdrop]{opacity:1;pointer-events:auto}
[data-dash-burger]{display:inline-flex!important}
[data-dash-head]{padding:12px 16px!important}
[data-dash-main]{padding:18px 16px 56px!important}
[data-dash-head] h1{font-size:20px!important}
[data-m-stack]{grid-template-columns:minmax(0,1fr)!important}
[data-m-floor]{grid-template-columns:repeat(4,minmax(0,1fr))!important}
}
`;

patch('content/manager-dashboard.html', [
  ['@keyframes hvLive{', DASH_CSS + '@keyframes hvLive{'],
  [
    '<div style="display:grid;grid-template-columns:240px minmax(0,1fr);min-height:100vh">',
    '<input type="checkbox" id="dash-nav" aria-hidden="true" style="position:absolute;opacity:0;pointer-events:none;width:1px;height:1px">\n<label for="dash-nav" data-dash-backdrop aria-hidden="true" style="display:none"></label>\n<div data-dash-grid style="display:grid;grid-template-columns:240px minmax(0,1fr);min-height:100vh">',
  ],
  [
    '<aside style="background:#2B2D42;color:#F5F5F5;position:sticky;top:0;height:100vh;',
    '<aside data-dash-side style="background:#2B2D42;color:#F5F5F5;position:sticky;top:0;height:100vh;',
  ],
  [
    '<div style="max-width:1480px;margin:0 auto;padding:16px 28px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap">\n      <div>',
    '<div data-dash-head style="max-width:1480px;margin:0 auto;padding:16px 28px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap">\n      <div style="display:flex;align-items:center;gap:12px"><label for="dash-nav" data-dash-burger role="button" aria-label="Open menu" tabindex="0" style="display:none;width:42px;height:42px;border-radius:10px;border:1px solid #E4E4EA;background:#FFFFFF;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0"><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="#2B2D42" stroke-width="2" stroke-linecap="round"/></svg></label><div>',
  ],
  [
    '<div style="font-size:13px;color:#5A5C72">{{ subtitle }}</div>\n      </div>',
    '<div style="font-size:13px;color:#5A5C72">{{ subtitle }}</div>\n      </div></div>',
  ],
  [
    '<main style="flex:1;width:100%;max-width:1480px;margin:0 auto;padding:24px 28px 64px">',
    '<main data-dash-main style="flex:1;width:100%;max-width:1480px;margin:0 auto;padding:24px 28px 64px">',
  ],
  [
    '<div style="display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:16px">',
    '<div data-m-stack style="display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:16px">',
  ],
  [
    'padding:24px;display:grid;grid-template-columns:minmax(220px,1fr) minmax(0,3fr);gap:24px">',
    'padding:24px;display:grid;grid-template-columns:minmax(220px,1fr) minmax(0,3fr);gap:24px" data-m-stack>',
  ],
  [
    '<div style="display:grid;grid-template-columns:minmax(0,2fr) minmax(300px,1fr);gap:16px;align-items:start">',
    '<div data-m-stack style="display:grid;grid-template-columns:minmax(0,2fr) minmax(300px,1fr);gap:16px;align-items:start">',
  ],
  [
    '<div style="background:#F4F4F6;border-radius:12px;padding:12px;display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px">',
    '<div data-m-floor style="background:#F4F4F6;border-radius:12px;padding:12px;display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px">',
  ],
]);
console.log('patched manager-dashboard');

// Hero load-in waits for the global preloader (public/preloader.js) so the animation is seen, on every page.
for (const f of fs.readdirSync('content')) {
  if (!f.endsWith('.html')) continue;
  const file = 'content/' + f;
  let s = fs.readFileSync(file, 'utf8');
  const from = 'else requestAnimationFrame(() => requestAnimationFrame(() => {';
  if (s.includes(from)) {
    s = s.split(from).join('else (window.__hiveAfter || requestAnimationFrame)(() => requestAnimationFrame(() => {');
    fs.writeFileSync(file, s);
    console.log('hero load-in waits for preloader:', f);
  }
}

// Home: the preloader replaces the once-per-session intro; hero videos use direct Pexels files and autoplay at once.
const VIDEO_FILES = {
  '8685430': '8685430-sd_640_360_25fps.mp4',
  '8731297': '8731297-sd_360_640_25fps.mp4',
  '9365167': '9365167-sd_640_360_25fps.mp4',
  '9365386': '9365386-sd_640_360_25fps.mp4',
  '9365445': '9365445-sd_640_360_25fps.mp4',
  '9365450': '9365450-sd_640_360_25fps.mp4',
  '9365653': '9365653-sd_640_360_25fps.mp4',
  '9464643': '9464643-sd_960_506_30fps.mp4',
  '9464653': '9464653-sd_960_506_30fps.mp4',
  '9464877': '9464877-sd_506_960_30fps.mp4',
};
{
  const file = 'content/home.html';
  let s = fs.readFileSync(file, 'utf8');
  let n = 0;
  s = s.replace(/<video data-src="https:\/\/www\.pexels\.com\/download\/video\/(\d+)\/\?[wh]=\d+"([^>]*?) preload="none"/g, (m, id, rest) => {
    const fileName = VIDEO_FILES[id];
    if (!fileName) throw new Error('No direct file for video ' + id);
    n++;
    const url = `https://videos.pexels.com/video-files/${id}/${fileName}`;
    return `<video src="${url}" data-src="${url}" autoplay${rest} preload="auto"`;
  });
  if (n === 0 && !s.includes('videos.pexels.com/video-files')) throw new Error('Home videos not found');
  const loader = 'next(); next(); // two in flight';
  if (s.includes(loader)) s = s.replace(loader, "vids.forEach((v) => { v.muted = true; v.defaultMuted = true; v.setAttribute('muted', ''); v.playsInline = true; const p = () => v.play().catch(() => {}); if (v.readyState >= 2) p(); else v.addEventListener('canplay', p, { once: true }); p(); });");
  const intro = "if (reduced || seen || this.props.showIntro === false) heroIn(); else this.intro(heroIn);";
  if (s.includes(intro)) s = s.replace(intro, 'if (window.__hiveAfter) window.__hiveAfter(heroIn); else heroIn();');
  fs.writeFileSync(file, s);
  console.log('home videos switched:', n);
}
