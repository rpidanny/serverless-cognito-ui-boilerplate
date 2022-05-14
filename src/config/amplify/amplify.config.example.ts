export const amplifyConfig = {
  s3: {
    REGION: "YOUR_REGION",
    BUCKET: "YOUR_S3_BUCKET_NAME",
  },
  apiGateway: {
    REGION: "YOUR_REGION",
    URL: "https://YOUR_API_GATEWAY_ID.execute-api.YOUR_REGION.amazonaws.com/dev",
  },
  cognito: {
    REGION: "YOUR_REGION",
    USER_POOL_ID: "YOUR_USER_POOL_ID",
    APP_CLIENT_ID: "YOUR_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_IDENTITY_POOL_ID",
  },
};
