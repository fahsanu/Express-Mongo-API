require('dotenv').config();

//connect to mongodb
const { MongoClient } = require("mongodb");
const db = process.env.DATABASE_URL;
const client = new MongoClient(db);
const database_env = process.env.DATABASE;
const col_env = process.env.COL;

//not working show only card
//getAll function
//get all profile and card even if true solf delete
async function getAll() {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        const query = {};
        const options = { projection: { _id: 0 } }; //, card_all: { $elemMatch: { solf_delete: false }}
        const result = await col.find(query, options).toArray()

        return result
    } catch (error) {
        return { status: false, return: {}}
    }
}

//getAllCard function
//get all card active from one profile
// {
//     "id_profile": ""
// }
async function getAllCard(getAll_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        const query = { id: getAll_req.id };
        const options = { projection: { _id: 0 , card_all: 1 } };
        const result = await col.find(query, options).toArray();

        const filterValue = result[0].card_all.filter(obj => {
            if (obj['solf_delete'] === true) {
                return false
            } return true
        })
        
        return { status: true, message: "success", result: filterValue }
    } catch (error) {
        return { status: false, message: "fail", result: {}}
    }
}

//getPerCard function
//get only the id card from one profile
// {
//     id : ""
// }
async function getPerCardPublic(getOne_req) {
    try {
        if (getOne_req.id === "" || typeof getOne_req.id === null) {
            return { status: false, result: "not defined" }}

        const database = client.db(database_env);
        const col = database.collection(col_env);
        
        const query = { id : getOne_req.id };
        const options = { projection: { _id: 0 , set_active_card: 1 } };

        const result_active = await col.findOne(query, options);

        const query2 = { "card_all.id_card" : result_active.set_active_card };
        const options2 = { projection: { _id: 0 , card_all: { $elemMatch: { id_card: result_active.set_active_card , solf_delete: false}} } };
        const result = await col.findOne(query2, options2);
  
        const final_result = Object.assign(result.card_all[0], {id: getOne_req.id})

        return { status: true, message: "success", result: final_result}
    } catch (error) {
        return { status: false, message: "fail", result: {} }
    }
}

//get only the id card from one profile
// {
//     id_card : ""
// }
async function getPerCardPrivate(getOne_req) {
    try {
        if (getOne_req.id === "" || typeof getOne_req.id === null) {
            return { status: false, result: "not defined" }}

        const database = client.db(database_env);
        const col = database.collection(col_env);
        
        const query = { "card_all.id_card" : getOne_req.id_card };
        const options = { projection: { _id: 0 , card_all: { $elemMatch: { id_card: getOne_req.id_card , solf_delete: false }} } };

        const result = await col.findOne(query, options);

        return { status: true, message: "success", result: result }
    } catch (error) {
        return { status: false, message: "fail", result: {} }
    }
}

module.exports = { getAll, getAllCard, getPerCardPublic, getPerCardPrivate };