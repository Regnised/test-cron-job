import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.PRICES_DB_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export { sequelize };
