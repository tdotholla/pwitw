const express = require('express');
const next = require('next');

const configServer = require("./config").configServer;
const slog = configServer.console.express;
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

// need to connect to sql database, spin up server to listen on a port just to handle sql queries, and also a separate server for client.
app.prepare()
    .then( () => {
        const server = express()
        if(slog){
            server.use(function (req,res,next) {
                console.log(`[EXPRESS][${req.method}] ${req.path}`)
                next()
            })
        }

        var apis = require('./api/index');
        // console.log(apis)
        server.use('/api', apis)

        server.get('*', (req,res) => {
            return handle(req,res)
        })

        server.listen(configServer.port, (err) => {
            if (err) throw err
            console.log(`> Ready on Port ${configServer.port}`)
        })
    })