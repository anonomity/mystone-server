import express from "express";

import mongoose from "mongoose"

import {routes } from "./routes/project";

const app = express()

const bodyParser = require('body-parser');

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
})

app.use(routes)

mongoose.connect("mongodb+srv://Jackie:B5qAmCst4vNvUasT@cluster0-dbmjj.mongodb.net/projects?retryWrites=true&w=majority")
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.log(err)
    })


app.listen(8080)

