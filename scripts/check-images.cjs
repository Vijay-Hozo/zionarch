const fs = require('fs');
const path = require('path');

function walkProjectsJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  const images = [];

  function collect(obj) {
    if (Array.isArray(obj)) {
      obj.forEach(collect);
      return;
    }
    if (obj && typeof obj === 'object') {
      for (const k of Object.keys(obj)) {
        if (k === 'image' || k === 'images') {
          if (Array.isArray(obj[k])) {
            obj[k].forEach((i) => images.push(i));
          } else if (typeof obj[k] === 'string') {
            images.push(obj[k]);
          }
        } else {
          collect(obj[k]);
        }
      }
    }
  }

  collect(data);
  return images;
}

function fileExistsInsensitive(expectedPath) {
  if (fs.existsSync(expectedPath)) return {exists: true, path: expectedPath};
  const dir = path.dirname(expectedPath);
  const expectedName = path.basename(expectedPath);
  if (!fs.existsSync(dir)) return {exists: false};
  const entries = fs.readdirSync(dir);
  for (const e of entries) {
    if (e.toLowerCase() === expectedName.toLowerCase()) {
      return {exists: true, path: path.join(dir, e), caseMismatch: true};
    }
    // also compare decoded names
    try {
      const decodedExpected = decodeURIComponent(expectedName).toLowerCase();
      if (e.toLowerCase() === decodedExpected) {
        return {exists: true, path: path.join(dir, e), decodedMatch: true};
      }
    } catch (e) {}
  }
  return {exists: false};
}

const projectsPath = path.join(__dirname, '..', 'src', 'lib', 'Projects.json');
const images = walkProjectsJson(projectsPath);

const missing = [];
for (const img of images) {
  if (!img || typeof img !== 'string') continue;
  if (!img.startsWith('/drive-images/')) continue;
  // make local path
  const rel = img.replace(/^\//, '');
  const localPath = path.join(__dirname, '..', 'public', rel);
  // try raw
  let res = fileExistsInsensitive(localPath);
  if (!res.exists) {
    // try decodeURI
    let decoded;
    try { decoded = decodeURI(img).replace(/^\//, ''); } catch { decoded = img.replace(/^\//, ''); }
    const decodedLocal = path.join(__dirname, '..', decoded);
    res = fileExistsInsensitive(decodedLocal);
    if (!res.exists) {
      missing.push({referenced: img, checkedPaths: [localPath, decodedLocal]});
    } else {
      missing.push({referenced: img, foundAt: res.path, note: res.caseMismatch ? 'case mismatch' : res.decodedMatch ? 'decoded match' : 'found'});
    }
  }
}

if (missing.length === 0) {
  console.log('All referenced drive-images exist on disk.');
  process.exit(0);
}

console.log('Missing or mismatched image paths:');
missing.slice(0,200).forEach((m) => {
  console.log('- Referenced:', m.referenced);
  if (m.foundAt) console.log('  -> Found at:', m.foundAt, m.note ? `(${m.note})` : '');
  else console.log('  -> Checked:', m.checkedPaths.join(' | '));
});
console.log('\nTotal problems:', missing.length);
process.exit(1);
