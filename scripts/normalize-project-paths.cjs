const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '..', 'src', 'lib', 'Projects.json');
let raw = fs.readFileSync(file, 'utf8');
let data = JSON.parse(raw);
let changed = false;
function decodePath(s){
  if(typeof s !== 'string') return s;
  // Only decode drive-images paths
  if(!s.startsWith('/drive-images')) return s;
  try{
    const decoded = decodeURIComponent(s);
    if(decoded !== s){
      changed = true;
      return decoded;
    }
  }catch(e){
    // ignore
  }
  return s;
}
for(const item of data){
  if(item.images && Array.isArray(item.images)){
    item.images = item.images.map(decodePath);
  }
  if(item.image) item.image = decodePath(item.image);
}
if(changed){
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('Updated Projects.json with decoded paths.');
}else{
  console.log('No changes needed.');
}
