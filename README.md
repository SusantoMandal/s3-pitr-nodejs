# S3 point in time restore in javascript

This is the repository for s3-pitr-nodejs, a point in time restore script for Amazon S3.

The most common use case for this is when you have enabled versioning on an S3 bucket and wish to restore some or all of the files to a specific point in time, to the same S3 bucket.

It takes time to do this with the web interface: The Amazon S3 online administration gui does not provide a straightforward method to do this on a massive scale.

With this script, you can simply restore a file version at specific point in time by executing a simple command such as:

* To same s3 bucket:-
	```
	$ node index.js -b my-bucket -p folder -t "December 15, 2021, 12:52:34 (UTC+05:30)"
	```
Choosing the correct time and date to restore at is as simple as clicking the Versions: Show button in the S3 web gui and navigating through the now-displayed versions timestamps.

## Installing

clone the repository:

```
$ git clone https://github.com/SusantoMandal/s3-pitr-nodejs.git
```

Go to the repository: 

```
$ cd s3-pitr-nodejs
```

Install the packages:

```
$ npm install
```

Run the script:

```
$ node index.js -b my-bucket -p folder -t "December 15, 2021, 12:52:34 (UTC+05:30)"
```

## Requirements

  * NodeJs
  * AWS credentials available in the environment
	* This can be accomplished in various ways:
		* Environment Variables:
			* AWS_ACCESS_KEY_ID
			* AWS_SECRET_ACCESS_KEY
			* AWS_DEFAULT_REGION
		* Your `~/.aws/ files`
			* Configured with `aws configure`

## Command line options

```
usage: node index.js [-b BUCKET] [-p PREFIX] [-t TIMESTAMP]

required arguments:
  -b BUCKET     s3 bucket to restore from
  -p PREFIX     s3 path to restore from                     
  -t TIMESTAMP  point in time to restore at  

optional arguments  
  --dryrun  DRYRUN execute query without restoring files
                        
```
##Dryrun

You may use the following command to dry run the script and see all of the files that will be restored:

```
$ node index.js -b my-bucket -p folder -t "December 15, 2021, 12:52:34 (UTC+05:30)" --dryrun
```



