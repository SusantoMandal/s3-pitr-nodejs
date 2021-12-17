const { getKeys } = require("./components/getFileKeys");
const { restoreFile, printQuery } = require('./components/restoreFile');
const logger = require("./util/logger");
const argv = require("minimist")(process.argv.slice(2));

const bucket = argv.b;
const prefix = argv.p;
const timestamp = new Date(argv.t).toISOString();
const dryRun = argv.dryrun || false;

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
