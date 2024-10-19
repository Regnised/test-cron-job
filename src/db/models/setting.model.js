import { DataTypes } from 'sequelize';
import { sequelize } from '../client.js';

const Setting = sequelize.define(
  'Setting',
  {
    setting: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

await Setting.sync();

export default Setting;
