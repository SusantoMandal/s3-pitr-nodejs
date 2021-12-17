const AWS = require('aws-sdk');
const logger = require('./logger');

const s3 = new AWS.S3({
});

async function restoreObject(bucket, key, versionId) {
    try {
        const params = {
            Bucket: bucket,
            CopySource: `${bucket}/${key}?versionId=${versionId}`,
            Key: key,
        };
        await s3.copyObject(params).promise();
        logger.info("restore- "+ key);
    } catch (e) {
        throw new Error(`Could not restore file ${key} from S3`)
    }
}

async function deleteObject(bucket, key) {
    try {
        const params = {
            Bucket: bucket,
            Key: key,
        };
        await s3.deleteObject(params).promise();
        logger.info("deleted- "+ key);
    } catch (e) {
        throw new Error(`Could not delete file ${key} from S3`)
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
        throw new Error(`Could not retrieve version of ${key} from S3`)
    }
};

module.exports = { restoreObject, deleteObject, getVersion };

