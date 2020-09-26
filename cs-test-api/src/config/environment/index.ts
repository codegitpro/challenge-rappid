import { baseConfig } from './development';

// All configurations will extend these options
// ============================================

export interface IConfig {
  env: string | undefined;
  name: string;
  root: any;
  sql: {
    username: any,
    password: any,
    host: any,
    port: any,
    db: any,
  };
  ports: {
    http: any,
  };
  ip: any;
  seedDB: boolean;
  secrets: any;
  bcrypt: any;
  userRoles: string[];
}

export const config = function(): IConfig {
  return baseConfig;
}();
