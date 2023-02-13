require('dotenv').config();


//connect to mongodb
const { MongoClient } = require("mongodb");
const db = process.env.DATABASE_URL;
const client = new MongoClient(db);
const database_env = process.env.DATABASE;
const col_env = process.env.COL;

//getAll function
//get all profile and card
async function getAll() {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        const query = {};
        const options = { projection: { _id: 0 , card_all: { $elemMatch: { solf_delete: false }}}, sort: { id: 1 } };
        const result = await col.find(query, options).toArray()

        return result
    } catch (error) {
        error.message
    }
}

//getAllCard function
//get all card active from one profile
// {
//     id: ""
// }
async function getAllCard(getAll_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        const query = { id: getAll_req.id };
        const options = { projection: { _id: 0, card_all: { $elemMatch: { solf_delete: false }}  } };

        const result = await col.findOne(query, options);

        return { status: true, result: result }
    } catch (error) {
        error.message
    }
}

//getPerCard function
//get only the id card from one profile
// {
//     id_card : ""
// }
async function getPerCard(getOne_req) {
    try {
        if (getOne_req.id === "" || typeof getOne_req.id === null) {
            return { status: false, result: "not defined" }}

        const database = client.db(database_env);
        const col = database.collection(col_env);
        
        const query = { "card_all.id_card" : getOne_req.id_card };
        const options = { projection: { _id: 0 , card_all: { $elemMatch: { id_card: getOne_req.id_card , solf_delete: false }} } };

        const result = await col.findOne(query, options);

        return { status: true, result: result }
    } catch (error) {
        return { status: false, result: {} }
    }
}

module.exports = { getAll, getAllCard, getPerCard };