require('dotenv').config();

//connect to mongodb
const { MongoClient } = require("mongodb");
const db = process.env.DATABASE_URL;
const client = new MongoClient(db);
const database_env = process.env.DATABASE;
const col_env = process.env.COL;

//getFriendforGateway function
async function getFriendList(friend_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        return {status: true, message: "success", result: result}
    }
    catch(error) {
        return { status: false, message: "fail", result: {}}
    }
}


//addFriend function
async function addFriend(add_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        return { status: true, message: "success" }
    }
    catch(error) {
        return { status: false, message: "fail" }
    }
}

//deleteFriend function
async function deleteFriend(delete_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        return { status: true, message: "success" }
    }
    catch(error) {
        return { status: false, message: "fail"}
    }
}

module.exports = { getFriendList, addFriend, deleteFriend}