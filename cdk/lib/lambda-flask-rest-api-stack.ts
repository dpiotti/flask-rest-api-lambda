import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { PythonFunction } from '@aws-cdk/aws-lambda-python-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha';
import * as path from 'path';

export class LambdaFlaskRestApi extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const flaskApiFn = new PythonFunction(this, 'flask-api-demo', {
      functionName: 'flask-api-demo',
      timeout: Duration.minutes(1),
      entry: path.join(__dirname, `../../src`),
      runtime: Runtime.PYTHON_3_9,
      index: 'lambda.py',
      handler: 'handler',
    });

    const flaskApiIntegration = new HttpLambdaIntegration(
      'flaskApiIntegration',
      flaskApiFn
    );

    const httpApi = new HttpApi(this, 'HttpApi', { apiName: 'flask-api-demo' });

    httpApi.addRoutes({
      path: '/',
      methods: [HttpMethod.ANY],
      integration: flaskApiIntegration,
    });
  }
}
