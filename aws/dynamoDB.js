module.exports = {

    fetchSubscriptionID: async function(channel_id) {

        const AWS = require('aws-sdk');

        AWS.config.update({
            region: process.env.REGION,
            accessKeyId: process.env.AWSAccessKeyId,
            secretAccessKey: process.env.AWSSecretKey,
        });

        var ddb = new AWS.DynamoDB();

        var params = {
            TableName: process.env.TABLE_NAME,
            Key: {
              'id': {
                  S: channel_id
              }
            },
            ProjectionExpression: 'subscription_id'
          };

          // Call DynamoDB to read the item from the table
        ddb.getItem(params, function(err, data) {
            if (err) {
                console.log("Error", err);
                return err;
            } else {
                console.log("Success", data.Item);
                return data.Item;
            }
        });

    }
}