import commonRoutes from './router';
import serverless from 'serverless-http';
import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Context as LambdaContext } from 'aws-lambda/handler';
import express from 'express';
import dotenv from 'dotenv';

const app = express();

const config = dotenv.config();
if (config.error) {
  dotenv.config({ path: './process.env' });
}

app.use('/', commonRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${process.env.PORT}`,
  );
});
const server = serverless(app);
export const handler = async (
  event: APIGatewayProxyEvent,
  context: LambdaContext,
): Promise<APIGatewayProxyResultV2> => {
  return server(event, context);
};

export default app;
