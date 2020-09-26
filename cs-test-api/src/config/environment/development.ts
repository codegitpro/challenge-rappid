import { IConfig } from './index';
import * as path from 'path';

// Development specific configuration
// ==================================

export const baseConfig: IConfig = {
    env: process.env.NODE_ENV || 'development',

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    ports: {
      http: process.env.PORT || 9000,
    },

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    name: 'cs-test-api',

    // Should we populate the DB with sample data?
    seedDB: true,

    secrets: {
      session: process.env.SESSION_SECRET,
    },

    sql: {
      username: process.env.SQL_USER || 'root',
      password: process.env.SQL_PASSWORD || 'admin',
      host: process.env.INSTANCE || '127.0.0.1',
      port: '3306',
      db: 'healthhubtest',
    },

    bcrypt: {
      rounds: 2,
    },

    // shared
    userRoles: ['guest', 'user', 'admin'],
};
