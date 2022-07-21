import commonRoutes from './router';
import serverless from 'serverless-http';
import {APIGatewayProxyEvent, APIGatewayProxyResultV2} from 'aws-lambda';
import {Context as LambdaContext} from 'aws-lambda/handler';
import express from 'express';

const app = express();

require('dotenv').config({ path: './process.env' });

app.use('/', commonRoutes);

const server = serverless(app);
export const handler = async (
    event: APIGatewayProxyEvent,
    context: LambdaContext,
): Promise<APIGatewayProxyResultV2> => {
    return server(event, context);
};

export default app;
