const fs = require('fs');
const path = require('path');

function isPointerFile(filePath){
  try{
    const s = fs.readFileSync(filePath, 'utf8');
    return s.startsWith('version https://git-lfs.github.com/spec/v1');
  }catch(e){
    return false;
  }
}

function walk(dir){
  const results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for(const ent of list){
    const full = path.join(dir, ent.name);
    if(ent.isDirectory()){
      results.push(...walk(full));
    }else{
      results.push(full);
    }
  }
  return results;
}

const imagesDir = path.resolve(__dirname, '..', 'public', 'drive-images');
if(!fs.existsSync(imagesDir)){
  console.log('No public/drive-images directory found — skipping LFS pointer check.');
  process.exit(0);
}

const allFiles = walk(imagesDir);
const pointers = [];
for(const f of allFiles){
  if(isPointerFile(f)) pointers.push(path.relative(process.cwd(), f));
}

if(pointers.length){
  console.error('ERROR: Found Git LFS pointer files in public/drive-images:');
  for(const p of pointers) console.error(' -', p);
  console.error('\nRun `git lfs pull` before building, or switch the images to a real object store/CDN.');
  process.exit(1);
}

console.log('No Git LFS pointer files detected in public/drive-images.');
