require('dotenv').config();


//connect to mongodb
const { MongoClient } = require("mongodb");
const db = process.env.DATABASE_URL;
const client = new MongoClient(db);
const database_env = process.env.DATABASE;
const col_env = process.env.COL;

//setActiveCard function
// {
//     id: "",
//     active_id_card: ""
// }
async function setActiveCard(active_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        const ref = { id: body_req.id }

        const result = await col.updateOne(ref, { $set: { active_id_card: active_req.active_id_card } });

        return {status: true}
    } catch (error) {
        error.message
        return {status: false}
    }
}

module.exports = { setActiveCard };