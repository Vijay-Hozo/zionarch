const { execSync } = require('child_process');
const path = require('path');

const bucket = process.env.S3_BUCKET;
const prefix = process.env.S3_PREFIX || '';
const region = process.env.AWS_REGION || 'us-east-1';

if(!bucket){
  console.error('ERROR: S3_BUCKET environment variable is required.');
  console.error('Usage: S3_BUCKET=my-bucket [S3_PREFIX=folder] AWS_REGION=... node scripts/upload-to-s3.cjs');
  process.exit(1);
}

const src = path.resolve(__dirname, '..', 'public', 'drive-images');

console.log('Uploading', src, 'to s3://' + bucket + '/' + prefix);

try{
  // Build aws s3 sync command
  const target = prefix ? `s3://${bucket}/${prefix}` : `s3://${bucket}`;
  const cmd = `aws s3 sync "${src}" "${target}" --acl public-read`;
  console.log('Running:', cmd);
  execSync(cmd, { stdio: 'inherit', env: process.env });
  console.log('\nUpload complete.');
  console.log('If you use CloudFront or another CDN in front of the bucket, invalidate/cache as needed.');
}catch(err){
  console.error('Upload failed:', err.message || err);
  process.exit(1);
}
