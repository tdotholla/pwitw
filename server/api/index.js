const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize');

const configServer = require('../config').configServer;

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;
const async = require('async');

const config = {
    server: 'PW10inf-SQL.perkinswill.net',
    authentication: {
        type: 'default',
        options: {
            userName: 'PW_DataCollect',
            password: '!data!'
        }
    },
    options: {
        database: 'PWAssetsPush'
    }
}
const config2 = {
    userName: 'PW_DataCollect',
    password: '!data!',
    hostName: 'PW10inf-SQL.perkinswill.net',
    dbName: 'PWAssetsPush'
}

const connection = new Connection(config);
    
function Start(callback) {
    console.log('Starting...');
    return
    // callback(null, 'Jake', 'United States');
}

function Insert(name, location, callback) {
    console.log("Inserting '" + name + "' into Table...");

    request = new Request(
        'INSERT INTO TestSchema.Employees (Name, Location) OUTPUT INSERTED.Id VALUES (@Name, @Location);',
        function(err, rowCount, rows) {
        if (err) {
            callback(err);
        } else {
            console.log(rowCount + ' row(s) inserted');
            callback(null, 'Nikita', 'United States');
        }
        });
    request.addParameter('Name', TYPES.NVarChar, name);
    request.addParameter('Location', TYPES.NVarChar, location);

    // Execute SQL statement
    connection.execSql(request);
}

function Update(name, location, callback) {
    console.log("Updating Location to '" + location + "' for '" + name + "'...");

    // Update the employee record requested
    request = new Request(
    'UPDATE TestSchema.Employees SET Location=@Location WHERE Name = @Name;',
    function(err, rowCount, rows) {
        if (err) {
        callback(err);
        } else {
        console.log(rowCount + ' row(s) updated');
        callback(null, 'Jared');
        }
    });
    request.addParameter('Name', TYPES.NVarChar, name);
    request.addParameter('Location', TYPES.NVarChar, location);

    // Execute SQL statement
    connection.execSql(request);
}

function Delete(name, callback) {
    console.log("Deleting '" + name + "' from Table...");

    // Delete the employee record requested
    request = new Request(
        'DELETE FROM TestSchema.Employees WHERE Name = @Name;',
        function(err, rowCount, rows) {
        if (err) {
            callback(err);
        } else {
            console.log(rowCount + ' row(s) deleted');
            callback(null);
        }
        });
    request.addParameter('Name', TYPES.NVarChar, name);

    // Execute SQL statement
    connection.execSql(request);
}

function Read(callback) {
    console.log('Reading rows from the Table...');

    // Read all rows from table
    request = new Request(
        'SELECT date_created, computer_name FROM [PWAssetsPush].[dbo].[CollectedData];',
        function(err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log(rowCount + ' row(s) returned');
                // callback(null);
                // return rows;
            }
        }
    );

    // Print the rows read
    var result = "";
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log("got result");
        // result = "";
        return result
    });

    // Execute SQL statement
    connection.execSql(request);
}

function Complete(err, result) {
    if (err) {
        callback(err);
    } else {
        console.log("Done!");
        connection.close()
    }
}

router.get('/test', function (req,res) {
    console.log("running tests...")
    // console.log(res)
    return res.json({"result": [
        {"ID":1,
    "name":"howdyho"},
    {"ID": 2,
    "name": "heidhgie"}
    ]})
})

router.get('/assets', (req,res) => {
    // Attempt to connect and execute queries if connection goes through
    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to SQL DB: ');

            // Execute all functions in the array serially
            return async.waterfall([
                Start,
                Read
            ], Complete)
        }
    });
    // console.log(res);
    return res.json({return: "hi"})
})

router.get('/sql', (req,res) => {
    const sqlz =  new Sequelize(config2.dbName, config2.userName, config2.password, {
        dialect: 'mssql',
        host: config2.hostName,
        port: 1433
    });
    const CollectedData = sqlz.define('CollectedData', {
        date_created: {
            type: Sequelize.DATE
        },
        computer_name: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        site: {
            type: Sequelize.STRING
        },
        serial: {
            type: Sequelize.STRING
        },
        console_user: {
            type: Sequelize.STRING
        },
        UPN: {
            type: Sequelize.STRING
        },
        logon_time_UTC: {
            type: Sequelize.TIME
        },
        ipv4_address: {
            type: Sequelize.STRING
        },
        manufacturer: {
            type: Sequelize.STRING
        },
        model_name: {
            type: Sequelize.STRING
        },
        model_number: {
            type: Sequelize.STRING
        },
        os_build_number: {
            type: Sequelize.STRING
        },
        current_os_install_date: {
            type: Sequelize.STRING
        },
        original_os_install_date: {
            type: Sequelize.STRING
        },
        original_os_build_number: {
            type: Sequelize.STRING
        }
    },
    {timestamps: false});
    
    CollectedData.findAll({
        limit: 1000,
        attributes: ["date_created", "site", "computer_name", "console_user", "UPN", "ipv4_address", "manufacturer","model_name","os_build_number","original_os_build_number"]
    }).then(ws => res.json(ws))
});

module.exports = router
