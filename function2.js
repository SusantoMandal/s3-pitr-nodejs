var AWS = require('aws-sdk');
s3 = new AWS.S3({
});

const cobj = {
    ETag: '"168a64fad8930480043d4366697698ca"',
    Size: 21,
    StorageClass: 'STANDARD',
    Key: 'restore/a.txt',
    VersionId: 'WDizAvqpY_PtUbI_gsiZmrtwENzL5Riy',
    IsLatest: false, 
    LastModified: '2021-12-09T07:45:11.000Z',
    Owner: [Object]
  }

const arguments = {
    sourceBucket: process.argv[2],
    fileName: cobj.Key,
    versionId: cobj.VersionId
}
var params = {
    Bucket: arguments.sourceBucket, 
    CopySource: `${arguments.sourceBucket}/${cobj.Key}?versionId=${cobj.VersionId}`,
    Key: cobj.Key,
};

s3.copyObject(params, function(err,data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
})