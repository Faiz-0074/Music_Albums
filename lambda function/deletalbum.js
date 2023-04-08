const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  const tableName = 'albumlist';
  const albumId = event.pathParameters.id;
  const genre = event.pathParameters.genre;
  
  const params = {
    TableName: tableName,
    Key: {
      'id': albumId.toString(),
    }
  };
  
  try {
    const data = await docClient.delete(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify('Album deleted successfully')
    };
    return response;
  } catch (err) {
    console.error('Unable to delete album', err);
    const response = {
      statusCode: 500,
      body: JSON.stringify('Unable to delete album')
    };
    return response;
  }
};
