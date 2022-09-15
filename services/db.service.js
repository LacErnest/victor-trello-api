const MongoClient = require('mongodb').MongoClient
//const { MongoClient } = require("mongodb");
const logger = require('../services/logger.service')
const config = require('../config')

module.exports = {
    getCollection
}

// Database Name
const dbName = 'bambello-victor-db'

var dbConn = null

//const client = new MongoClient(config.dbURL);

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = await client.db(dbName)
        console.log("mongo_db", db)
        dbConn = db
        return db
    } catch (err) {
        console.log("mongo_uri", config.dbURL)
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}




