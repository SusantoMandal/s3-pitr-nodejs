
const { getTimestampVersion } = require('./getTimestampVersion');
const { restoreObject, deleteObject } = require('./s3Restore');
const { getKeys } = require('./getFileKeys');
const argv = require('minimist')(process.argv.slice(2));

const bucket = argv.b;
const prefix = argv.p;
const timestamp = new Date(argv.t).toISOString();

(async () => {
  const keys = await getKeys(bucket, prefix);
  console.log(keys);

  keys.forEach(async (key) => {
    const versionId = await getTimestampVersion(bucket, key, timestamp);
    if (versionId === null) {
      await deleteObject(bucket, key);
    } else {
      await restoreObject(bucket, key, versionId);
    }
  }) 
  
})();
