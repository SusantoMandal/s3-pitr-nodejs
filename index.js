const { getTimestampVersion } = require('./util/getTimestampVersion');
const { restoreObject, deleteObject } = require('./util/s3Restore');
const { getKeys } = require('./util/getFileKeys');
const argv = require('minimist')(process.argv.slice(2));

const bucket = argv.b;
const prefix = argv.p;
const timestamp = new Date(argv.t).toISOString();

(async () => {
  try {
    const keys = await getKeys(bucket, prefix);

    keys.forEach(async (key) => {

      try {
        const { versionId, isLatest } = await getTimestampVersion(bucket, key, timestamp);

        if (isLatest) {
          console.log("No action needed for restore- ", key);
        } else if (versionId) {
          await restoreObject(bucket, key, versionId);
        } else {
          await deleteObject(bucket, key);
        }
      } catch (e) {
        console.log(e);
      }
    })
  } catch (e) {
    console.log(e);
  }

})();