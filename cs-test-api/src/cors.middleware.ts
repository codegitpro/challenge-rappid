import { NestMiddleware, MiddlewareFunction, Injectable } from '@nestjs/common';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  resolve(): MiddlewareFunction {
    return (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-Request-With");
      res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,HEAD");
      res.header("X-Powered-By", ' 3.2.1');
      // res.header("Content-Type", "application/json;charset=utf-8");
      next();
    }
  }
}