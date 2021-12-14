
const { getVersion } = require('./function1');
const { restoreObject, deleteObject } = require('./function2');
const { getKeys } = require('./function3');

const sourceBucket = process.argv[2];
const folder = process.argv[3];
const timestamp = process.argv[4];

(async () => {
  let allkeys = await getKeys(sourceBucket, folder);
  console.log('allkeys', allkeys);
  allkeys.forEach(async (key) => {
    const version = await getVersion(sourceBucket, key, timestamp);
    if (version.isDeleted) {
      await deleteObject(version, sourceBucket);
    } else {
      await restoreObject(version, sourceBucket);
    }
  }) 
  
})();
