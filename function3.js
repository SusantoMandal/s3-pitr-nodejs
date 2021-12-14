const AWS = require('aws-sdk');

const s3 = new AWS.S3({
});

var allKeys = [];
async function getKeys(bucket,prefix) {
    var params = { 
        Bucket: bucket,
        Delimiter: '/',
        Prefix: prefix
       }
    let data = await s3.listObjects(params).promise();
    console.log(data);
    data.Contents.slice(1).forEach( d => {
            allKeys.push(d.Key);
    })
    for(let i=0; i<data.CommonPrefixes.length ;i++ ) {
        await getKeys(bucket,data.CommonPrefixes[i].Prefix);
    }
    return allKeys;
}

module.exports = { getKeys };

