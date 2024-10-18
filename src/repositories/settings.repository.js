import { client } from '../db/client.js';

const SETTINGS_STORE = 'hstore_settings';

const getSetting = async (setName = 'timeout') => {
  // Todo: ADD sequelize
  const result = await client.query(
    `SELECT setting -> '${setName}' as setting FROM ${SETTINGS_STORE} WHERE setting -> '${setName}'  is NOT NULL`
  );
  console.log(result.rows);
  return result.rows[0].setting;
};

const saveSetting = async (timeoutValue) => {
  // Todo: ADD sequelize
  const result = await client.query(
    `INSERT INTO ${SETTINGS_STORE} values('"timeout" => ${timeoutValue}');`
  );
  console.log(`saveSetting: ${result}`);
};

export { getSetting, saveSetting };
