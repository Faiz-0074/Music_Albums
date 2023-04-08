
//Lambda Function to edit album

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  const tableName = 'albumlist';
  const albumId = event.pathParameters.id;


  const requestBody = JSON.parse(event.body);

  const params = {
    TableName: tableName,
    Key: {
      'id': albumId.toString(),
    },
    UpdateExpression: 'set #a = :album, #r = :artist, #g = :genre, #y = :year',
    ExpressionAttributeNames: {
      '#a': 'Album',
      '#r': 'Artist',
      '#g': 'Genre',
      '#y': 'Year'
    },
    ExpressionAttributeValues: {
      ':album': requestBody.Album,
      ':artist': requestBody.Artist,
      ':genre': requestBody.Genre,
      ':year': requestBody.Year || null
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const data = await docClient.update(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Attributes)
    };
    return response;
  } catch (err) {
    console.error('Unable to update album', err);
    const response = {
      statusCode: 500,
      body: JSON.stringify('Unable to update album')
    };
    return response;
  }
};
