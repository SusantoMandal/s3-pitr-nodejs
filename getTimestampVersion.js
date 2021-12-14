const { getVersion } = require('./s3Restore');

async function getTimestampVersion(bucket, prefix, timestamp) {

  const { Versions, DeleteMarkers } = await getVersion(bucket, prefix);

  let latestVersion = null;

  Versions.some((version) => {
    if (Date.parse(timestamp) >= Date.parse(version.LastModified)) {
      latestVersion = version;
      return true;
    }
  });

  DeleteMarkers.some((deleteMarker) => {
    if (Date.parse(timestamp) >= Date.parse(deleteMarker.LastModified) && Date.parse(latestVersion.LastModified) < Date.parse(deleteMarker.LastModified)) {
      latestVersion = null;
      return true;
    }
  });

  if(latestVersion !== null) {
    return latestVersion.VersionId;
  } 
  return null;
};

module.exports = { getTimestampVersion };
