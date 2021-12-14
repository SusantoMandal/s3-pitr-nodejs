const AWS = require('aws-sdk');

const s3 = new AWS.S3({
});

async function restoreObject(bucket, key, versionId) {
    try {
        const params = {
            Bucket: bucket,
            CopySource: `${bucket}/${key}?versionId=${versionId}`,
            Key: key,
        };
        const data = await s3.copyObject(params).promise();
        console.log("restore- ", key);
    } catch (e) {
        throw new Error(`Could not restore file from S3: ${e.message}`)
    }
}

async function deleteObject(bucket, key) {
    try {
        const params = {
            Bucket: bucket,
            Key: key,
        };
        const data = await s3.deleteObject(params).promise();
        console.log("deleted- ", key);
    } catch (e) {
        throw new Error(`Could not delete file from S3: ${e.message}`)
    }
}

async function getVersion(bucket, prefix) {
    try {
        const params = {
            Bucket: bucket,
            Prefix: prefix
        }
        const data = await s3.listObjectVersions(params).promise();
        return data;
    } catch (e) {
        throw new Error(`Could not retrieve file from S3: ${e.message}`)
    }
};

module.exports = { restoreObject, deleteObject, getVersion };

