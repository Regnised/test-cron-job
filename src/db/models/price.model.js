import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../client.js';

const BitcoinPrice = sequelize.define(
  'BitcoinPrice',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    price_usd: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    // Other model options go here
  }
);
await BitcoinPrice.sync();

export default BitcoinPrice;
