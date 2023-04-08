
#Lambda function to add albumm to dynamo db
import boto3
import json
import uuid

s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
table_name = 'albumlist'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    body = json.loads(event['body'])
    album_title = body['album']
    artist = body['artist']
    genre = body['genre']
    year = body['year']
    album_id = str(uuid.uuid4())
      
    # Add album to DynamoDB
    response = table.put_item(
        Item={
            'id': album_id,
            'Album': album_title,
            'Artist': artist,
            'Genre': genre,
            'Year': year,
           
        }
    )

    # Return a response to API Gateway
    return {
        'statusCode': 200,
        'body': json.dumps('Album added to DynamoDB!')
    }
