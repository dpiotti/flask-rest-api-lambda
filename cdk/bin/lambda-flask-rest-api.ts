#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaFlaskRestApi } from '../lib/lambda-flask-rest-api-stack';

const app = new cdk.App();
new LambdaFlaskRestApi(app, 'CdkStack');
