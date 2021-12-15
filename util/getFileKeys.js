const { getVersion } = require('./s3Restore');

async function getKeys(bucket, prefix) {

    let keys = new Set();
    
    const { Versions } = await getVersion(bucket, prefix);

    Versions.forEach((version)=> {
        if(version.Key.slice(-1) !== '/') {
            keys.add(version.Key);
        }
    })
    return keys;
}

module.exports = { getKeys };

