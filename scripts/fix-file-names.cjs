const fs = require('fs');
const path = require('path');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.name.includes("&#39;")) {
      const newName = entry.name.replace(/&#39;/g, "'").replace(/'/g, ""); // remove apostrophe
      const dest = path.join(dir, newName);
      console.log(`Renaming: ${full} -> ${dest}`);
      fs.renameSync(full, dest);
      if (entry.isDirectory()) {
        walk(dest);
      }
    } else if (entry.isDirectory()) {
      walk(full);
    }
  }
}

const root = path.join(__dirname, '..', 'public', 'drive-images');
walk(root);
console.log('Done');
