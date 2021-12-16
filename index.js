const { getTimestampVersion } = require("./util/getTimestampVersion");
const { restoreObject, deleteObject } = require("./util/s3Restore");
const { getKeys } = require("./util/getFileKeys");
const logger = require("./util/logger");
const argv = require("minimist")(process.argv.slice(2));

const bucket = argv.b;
const prefix = argv.p;
const timestamp = new Date(argv.t).toISOString();
const dryRun = argv.dryrun || false;

function printQuery(keys, prefix) {
  logger.info(`keys for ${prefix} is`);
  keys.forEach((key) => {
    logger.info(key);
  });
}

function restoreFile(bucket, keys, timestamp) {
  keys.forEach(async (key) => {
    try {
      const { versionId, isLatest } = await getTimestampVersion(
        bucket,
        key,
        timestamp
      );

      if (isLatest) {
        logger.info("No action needed for restore- "+ key);
      } else if (versionId) {
        await restoreObject(bucket, key, versionId);
      } else {
        await deleteObject(bucket, key);
      }
    } catch (e) {
      logger.error(e);
    }
  });
}

(async () => {
  try {
    const keys = await getKeys(bucket, prefix);

    if (dryRun) {
      printQuery(keys, prefix);
    } else {
      restoreFile(bucket, keys, timestamp);
    }
  } catch (e) {
    logger.error(e);
  }
})();
