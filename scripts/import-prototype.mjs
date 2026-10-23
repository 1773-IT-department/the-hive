// Converts Claude Design .dc.html pages into content files for the Next.js routes.
// Usage: node scripts/import-prototype.mjs <prototype-dir>
import fs from 'node:fs';
import path from 'node:path';

const src = process.argv[2];
if (!src) throw new Error('Pass the prototype folder');

export const PAGES = [
  ['Home', ''],
  ['Workspaces', 'workspaces'],
  ['Coworking Desks', 'coworking-desks'],
  ['Private Pods', 'private-pods'],
  ['Meeting Rooms', 'meeting-rooms'],
  ['Private Offices', 'private-offices'],
  ['Plans', 'plans'],
  ['Events', 'events'],
  ['Gallery', 'gallery'],
  ['About', 'about'],
  ['Contact', 'contact'],
  ['Book a Spot', 'book'],
  ['Member Portal', 'member-portal'],
  ['Staff App', 'staff-app'],
  ['Manager Dashboard', 'manager-dashboard'],
  ['Style Guide', 'style-guide'],
];

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function rewrite(text) {
  let out = text;
  for (const [name, slug] of PAGES) {
    const forms = [name, encodeURIComponent(name), name.replace(/ /g, '%20')];
    for (const f of [...new Set(forms)]) {
      out = out.replace(new RegExp('(?:\\./)?' + esc(f) + '\\.dc\\.html', 'g'), '/' + slug);
    }
  }
  out = out.replace(/(?:\.\/)?assets\/photos\/([a-z0-9-]+)\.png/g, '/assets/photos/$1.webp');
  return out;
}

function extract(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const start = raw.indexOf('<x-dc');
  const scriptStart = raw.indexOf('<script type="text/x-dc"');
  const scriptEnd = raw.indexOf('</script>', scriptStart);
  if (start < 0) throw new Error('No x-dc in ' + file);
  const end = scriptStart >= 0 ? scriptEnd + '</script>'.length : raw.lastIndexOf('</x-dc>') + 7;
  return rewrite(raw.slice(start, end));
}

fs.mkdirSync('content', { recursive: true });
for (const [name] of PAGES) {
  const body = extract(path.join(src, name + '.dc.html'));
  fs.writeFileSync(path.join('content', name.replace(/ /g, '-').toLowerCase() + '.html'), body);
  console.log('page', name, body.length);
}
// Imported component (fetched by the runtime at /Staff%20App%20Phone.dc.html)
const phone = rewrite(fs.readFileSync(path.join(src, 'Staff App Phone.dc.html'), 'utf8'));
fs.writeFileSync(path.join('public', 'Staff App Phone.dc.html'), phone);
console.log('component Staff App Phone', phone.length);
