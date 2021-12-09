
const { getVersion } = require('./function1');
const { restoreObject } = require('./function2');

const sourceBucket = process.argv[2];
const folder = process.argv[3];
const timestamp = process.argv[4];

(async () => {
  const version = await getVersion(sourceBucket, folder, timestamp);
  await restoreObject(version, sourceBucket);
})();
