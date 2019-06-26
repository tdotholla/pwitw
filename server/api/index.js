const configServer = require('../config').configServer;
const dblog = configServer.console.express;

const express = require('express')
const router = express.Router()

const sql = require('mssql');

router.get('/test', function (req,res) {
    console.log(res)
    res.json()
})

module.exports = router