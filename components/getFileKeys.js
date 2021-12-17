const { getVersion } = require('../util/s3Methods');

async function getKeys(bucket, prefix) {
    try {
        let keys = new Set();
    
        const { Versions } = await getVersion(bucket, prefix);

        Versions.forEach((version)=> {
            if(version.Key.slice(-1) !== '/') {
                keys.add(version.Key);
            }
        })
        return keys;
    } catch(e) {
        throw new Error(e);
    }
    
}

module.exports = { getKeys };

