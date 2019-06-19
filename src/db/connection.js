node var  Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

var config = {
    server: 'PW10inf-SQL.perkinswill.net',
    authentication: {
        type: 'default',
        options: {
            userName: 'PW_DataCollect',
            password: 'IWRhdGEh'
        }
    },
    options: {
        database: 'PWAssetsPush'
    }
}

var connection = new Connection(config);

connection.on('connect', ( (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected')
    }
}))