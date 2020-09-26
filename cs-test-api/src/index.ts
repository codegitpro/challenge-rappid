import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { config } from './config/environment';
import { ErrorFilter } from './error.filter';

import express = require('express');
import http = require('http');

console.log('Preparing app');

async function bootstrap() {
  const server = express();
  let app = await NestFactory.create(ApplicationModule, server, { cors: true });
  await app.init();

  http.createServer(server).listen(config.ports.http || 3000);

  console.log(`${config.name} listening from ${config.ip}:${config.ports.http}`);
  console.log('Environment is ' + process.env.NODE_ENV);
}

bootstrap();
