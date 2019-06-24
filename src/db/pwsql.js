import Sequelize from 'sequelize';

const config = {
    userName: 'PW_DataCollect',
    password: '!data!',
    hostName: 'PW10inf-SQL.perkinswill.net',
    dbName: 'PWAssetsPush'
}

const PWAssetDb =  new Sequelize(config.dbName, config.userName, config.password, {
    dialect: 'mssql',
    host: config.hostName,
    port: 1433,
    logging: false,
    dialectOptions: {
        requestTimeout: 30000
    }
});

export const dbFetch = () => {

PWAssetDb.findAll().then(ws =>console.log(ws))
}
