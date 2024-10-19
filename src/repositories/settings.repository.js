import Setting from '../db/models/setting.model.js';

const getSetting = async (setName = 'timeout') => {
  const result = await Setting.findAll({ where: { id: 1 } });
  // const result = await client.query(
  //   `SELECT setting -> '${setName}' as setting FROM ${SETTINGS_STORE} WHERE setting -> '${setName}'  is NOT NULL`
  // );
  console.log(`getSetting: ${result[0]?.setting[setName]}`);
  const setting = result[0]?.setting[setName];

  if (!setting) {
    throw new Error('Setting was not found');
  }

  return result[0].setting[setName];
};

const saveSetting = async (timeoutValue) => {
  const results = await Setting.findOne();

  if (!results) {
    throw new Error('Settings were not found');
  }

  const settings = results.getDataValue('setting');
  const result = await results.update(
    { setting: { ...settings, timeout: timeoutValue } },
    { returning: true }
  );

  console.log(`res`);
  console.log(result?.getDataValue('setting'));
};

export { getSetting, saveSetting };
