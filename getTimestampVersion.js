const { getVersion } = require("./s3Restore");

async function getTimestampVersion(bucket, prefix, timestamp) {

  const restoreTimestamp = Date.parse(timestamp);
  let nearestVersion = null;
  let nearestDeleteMarker = null;
  let returnObject = {
    versionId: null,
    isLatest: null
  };

  const { Versions, DeleteMarkers } = await getVersion(bucket, prefix);

  nearestVersion = Versions.find((version) => {
    return (Date.parse(version.LastModified) <= restoreTimestamp)
  });

  nearestDeleteMarker = DeleteMarkers.find((deleteMarker) => {
    return (Date.parse(deleteMarker.LastModified) <= restoreTimestamp)
  });

  if (nearestVersion) {
    returnObject = {
      versionId: nearestVersion.VersionId,
      isLatest: nearestVersion.IsLatest
    }
  }

  if (nearestDeleteMarker) {
    if (Date.parse(nearestDeleteMarker.LastModified) > Date.parse(nearestVersion.LastModified)) {
      returnObject = {
        versionId: null,
        isLatest: nearestDeleteMarker.IsLatest
      };
    }
  }

  return returnObject;
}

module.exports = { getTimestampVersion };
