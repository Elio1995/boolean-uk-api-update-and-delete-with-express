const { Client } = require ("pg")

const dotenv = require("dotenv")
dotenv.config()

const connection = process.env.PGURL

const dbClient = new Client(connection)

module.exports= dbClient