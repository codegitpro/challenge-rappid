import { Sequelize } from 'sequelize-typescript';

import { User } from '../endpoints/users/user.entity';
import { Prescription } from '../endpoints/prescriptions/prescription.entity';

import { config } from '../config/environment';

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: async () => {
      console.log('instantiating sequelize');
      let options = {
        dialect: 'mysql',
        host: config.sql.host,
        port: config.sql.port,
        username: config.sql.username,
        password: config.sql.password,
        database: config.sql.db
      };

      console.log('Connection Details: ', options.host, config.sql.username, config.sql.password);

      if (process.env.INSTANCE) {
        options['dialectOptions'] = {
          socketPath: '/cloudsql/' + process.env.INSTANCE
        };
      }

      const sequelize = new Sequelize(options);

      console.log('adding sequelize models');
      sequelize.addModels([
        Prescription,
        User,
      ]);

      try {
        if (config.seedDB) {
          console.log('SeedDB ' + config.seedDB);
          await sequelize.drop();
        }

        await sequelize.sync();
      } catch (error) {
        console.error('Error syncing db, database may not be set up correctly', error);
      }

      if (config.seedDB) {
        // Seeding happens here
        console.log('SeedDB ' + config.seedDB);
        console.log('seeding user');
        let user = await User.seed();

        console.log('seeding prescriptions');
        let prescription = await Prescription.seed(user);
      }

      console.log('done seeding');
      return sequelize;
    },
  },
];