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
