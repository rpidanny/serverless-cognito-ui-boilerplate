echo "Generating Config from Template"

sed "s@YOUR_API_GATEWAY_ID@$API_GATEWAY_ID@g;s@YOUR_S3_BUCKET_NAME@$S3_BUCKET_NAME@g;s@YOUR_REGION@$REGION@g;s@YOUR_USER_POOL_ID@$USER_POOL_ID@g;s@YOUR_APP_CLIENT_ID@$APP_CLIENT_ID@g;s@YOUR_IDENTITY_POOL_ID@$IDENTITY_POOL_ID@g" ./src/config/amplify/amplify.config.example.ts > ./src/config/amplify/amplify.config.ts
