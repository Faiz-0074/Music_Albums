#Lambda function to get all albums
import json
import boto3
from boto3.dynamodb.conditions import Attr


dynamodb = boto3.resource('dynamodb')
table_name = 'albumlist'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    if event['queryStringParameters'] is not None:
        genre = event['queryStringParameters'].get('genre')
    else:
    # handle the case where queryStringParameters is None
        genre = None

    
    if genre:
        response = table.scan(
            FilterExpression=Attr('Genre').eq(genre)
        )
    else:
        response = table.scan()
        
    items = response['Items']
    
    return {
        'statusCode': 200,
        
        'body': json.dumps(items)
    }
