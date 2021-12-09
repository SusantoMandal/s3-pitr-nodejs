const AWS = require('aws-sdk');

const s3 = new AWS.S3({
});

async function restoreObject(version, bucket) {
    try {
        const params = {
            Bucket: bucket,
            CopySource: `${bucket}/${version.Key}?versionId=${version.VersionId}`,
            Key: version.Key,
        };
    const data = await s3.copyObject(params).promise();
    console.log("Folder Updated");
    } catch (e) {
        throw new Error(`Could not restore file from S3: ${e.message}`)
    }
}

module.exports = { restoreObject };

