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

        const query = { "card_all.id_card" : friend_req.id_card, id: friend_req.id };
        const options = { projection: { _id: 0 , card_all: 1 } };

        const result = await col.findOne(query, options);

        return {status: true, message: "success", result: result.card_all[0]}
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

        const ref = { id: add_req.id }
        // const options = { upsert: true }

        const result = await col.updateOne(ref, { $addToSet: { friend_list: {
            id: add_req.id,
            id_friend_profile: add_req.id_friend_profile,
            id_friend_card : add_req.id_friend_card,
            provider_friend : add_req.provider_friend,
            group : add_req.group,
            // timestmap_addfriend: Math.floor(Date.now() / 1000)
        } } });

        return {status: true, message: "success"}
    }
    catch(error) {
        console.log(error.message)
        return { status: false, message: "fail" }
    }
}

//deleteFriend function
async function deleteFriend(delete_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        const ref = { id: delete_req.id }

        const result = await col.updateOne(ref, { $pull: { friend_list: { id_friend_profile: delete_req.id_friend_profile, id_friend_card: delete_req.id_friend_card}}})

        return { status: true, message: "success" }
    }
    catch(error) {
        return { status: false, message: "fail"}
    }
}

module.exports = { getFriendList, addFriend, deleteFriend}