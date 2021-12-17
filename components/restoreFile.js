const { getTimestampVersion } = require("./getTimestampVersion");
const { restoreObject, deleteObject } = require("../util/s3Methods");
const logger = require('../util/logger');

function printQuery(keys, prefix) {
  logger.info(`keys for ${prefix} is`);
  keys.forEach((key) => {
    logger.info(key);
  });
}

function restoreFile(bucket, keys, timestamp) {
  keys.forEach(async (key) => {
    try {
      const { versionId, isLatest } = await getTimestampVersion(bucket, key, timestamp);

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

module.exports = { restoreFile, printQuery };
