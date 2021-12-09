const AWS = require('aws-sdk');

const s3 = new AWS.S3({
});

async function getVersion(bucket, fileName, timestamp) {
  try {
    const params = {
      Bucket: bucket,
      Prefix: fileName
    }
    const data = await s3.listObjectVersions(params).promise();
    const versions = data.Versions;
    const deleteMarkers = data.DeleteMarkers;
    return getLatestVersion(versions, deleteMarkers, timestamp);
  } catch (e) {
    throw new Error(`Could not retrieve file from S3: ${e.message}`)
  }
};

getLatestVersion = (versions, deleteMarkers, timestamp) => {
  let latestVersion = '';
  versions.every((version) => {
    if (Date.parse(timestamp) >= Date.parse(version.LastModified)) {
      latestVersion = version;
      return false;
    }
    return true;
  });
  deleteMarkers.every((deleteMarker) => {
    if (Date.parse(timestamp) >= Date.parse(deleteMarker.LastModified) && Date.parse(latestVersion.LastModified) < Date.parse(deleteMarker.LastModified)) {
      latestVersion = deleteMarker;
      return false;
    }
    return true;
  });
  return latestVersion;
};

module.exports = { getVersion };
