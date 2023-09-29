const aws = require('aws-sdk');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESSKEY,
  secretAccessKey: process.env.AWS_S3_SECRETKEY,
});

const uploadToS3 = (file) => {
  return new Promise((resolve, reject) => {
    const { originalname, mimetype, buffer } = file;

    const params = {
      Bucket: 'awsbucket2910',
      Key: `${originalname}-${Date.now()}`,
      Body: buffer,
      ContentType: mimetype,
      ACL: 'public-read',
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject('Error uploading to S3');
      } else {
        resolve(data.Location);
      }
    });
  });
};

module.exports = { uploadToS3 };
