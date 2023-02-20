require('dotenv').config();

//connect to mongodb
const { MongoClient } = require("mongodb");
const db = process.env.DATABASE_URL;
const client = new MongoClient(db);
const database_env = process.env.DATABASE;
const col_env = process.env.COL;

//setActiveCard function
// {
//     "id_profile": "",
//     "set_active_card": ""
// }
async function setActiveCard(active_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        const ref = { id: active_req.id }

        const result = await col.updateOne(ref, { $set: { set_active_card: active_req.set_active_card } });

        return {status: true, message: "success"}
    } catch (error) {
        return {status: false, message: "fail"}
    }
}

module.exports = { setActiveCard };