const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'src', 'lib', 'Projects.json');
const cdnBase = process.env.CDN_BASE_URL;

if(!cdnBase){
  console.error('ERROR: CDN_BASE_URL environment variable is required.');
  console.error('Example: CDN_BASE_URL=https://cdn.example.com/ node scripts/update-projects-cdn.cjs');
  process.exit(1);
}

let data = JSON.parse(fs.readFileSync(file, 'utf8'));
const normalizedBase = cdnBase.endsWith('/') ? cdnBase.slice(0, -1) : cdnBase;

function replacePath(s){
  if(typeof s !== 'string') return s;
  if(!s.startsWith('/drive-images')) return s;
  // remove leading slash and join with CDN base
  return normalizedBase + s;
}

for(const item of data){
  if(item.images && Array.isArray(item.images)){
    item.images = item.images.map(replacePath);
  }
  if(item.image) item.image = replacePath(item.image);
}

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated Projects.json to use CDN base:', normalizedBase);
