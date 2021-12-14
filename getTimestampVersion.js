const { getVersion } = require("./s3Restore");

async function getTimestampVersion(bucket, prefix, timestamp) {
  const { Versions, DeleteMarkers } = await getVersion(bucket, prefix);

  let latestVersion = null;
  let isLatest = false;

  Versions.some((version) => {
    if (Date.parse(timestamp) >= Date.parse(version.LastModified)) {
      latestVersion = version;
      isLatest = version.IsLatest;
      return true;
    }
  });

  let flag = false;
  DeleteMarkers.some((deleteMarker) => {
    if (
      Date.parse(timestamp) >= Date.parse(deleteMarker.LastModified) &&
      Date.parse(latestVersion.LastModified) <
        Date.parse(deleteMarker.LastModified)
    ) {
      flag = true;
      latestVersion = null;
      isLatest = deleteMarker.IsLatest;
      return true;
    }
  });

  if (latestVersion !== null) {
    return {
      versionId: latestVersion.VersionId,
      isLatest: isLatest,
    };
  }
  if (!flag && DeleteMarkers.length) {
    isLatest = DeleteMarkers[0].IsLatest;
  }
  return {
    versionId: null,
    isLatest: isLatest,
  };
}

module.exports = { getTimestampVersion };
