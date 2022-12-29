import aws from 'aws-sdk';

aws.config.update({ region: 'us-east-1' });

const credentials = new aws.SharedIniFileCredentials({
    profile: 'wbot',
});

aws.config.credentials = credentials;
