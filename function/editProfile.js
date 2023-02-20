require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

//connect to mongodb
const { MongoClient } = require("mongodb");
const db = process.env.DATABASE_URL;
const client = new MongoClient(db);
const database_env = process.env.DATABASE;
const col_env = process.env.COL;

//updatePicProfile function
// {
//     "id_profile": "uuid1",
//     "img_base64": "ddasd"
// }
async function updatePicProfile(pic_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        const ref = { id: pic_req.id };
        const result = await col.updateOne(ref, { $set: { img_base64: pic_req.img_base64} })

        return {status: true, message: "success"}
    } catch (error) {
        return { status: false, message: "fail"}
    }
}

//saveProfile function
async function saveProfile(input_req) {
    try {
        var dict = {}

        if (typeof input_req.name_full_en !== "undefined" && input_req.name_full_en !== "") {
            dict["name_full_en"] = input_req.name_full_en
        } 
        
        if (typeof input_req.name_first_en !== "undefined"  && input_req.name_first_en !== "") {
            dict["name_first_en"] = input_req.name_first_en
        } 
        
        if (typeof input_req.name_mid_en !== "undefined"  && input_req.name_mid_en !== "") {
            dict["name_mid_en"] = input_req.name_mid_en
        } 
        
        if (typeof input_req.name_last_en !== "undefined"  && input_req.name_last_en !== "") {
            dict["name_last_en"] = input_req.name_last_en
        } 
        
        if (typeof input_req.name_full_th !== "undefined" && input_req.name_full_th !== "") {
            dict["name_full_th"] = input_req.name_full_th
        } 
        
        if (typeof input_req.name_first_th !== "undefined"  && input_req.name_fisrt_th !== "") {
            dict["name_first_th"] = input_req.name_first_th
        } 
        
        if (typeof input_req.name_mid_th !== "undefined"  && input_req.name_mid_th !== "") {
            dict["name_mid_th"] = input_req.name_mid_th
        } 
        
        if (typeof input_req.name_last_th !== "undefined"  && input_req.name_last_th !== "") {
            dict["name_last_th"] = input_req.name_last_th
        } 
        
        if (typeof input_req.nickname_th !== "undefined" && input_req.nickname_th !== "") {
            dict["nickname_th"] = input_req.nickcame_th
        } 
        
        if (typeof input_req.nickname_en !== "undefined" && input_req.nickname_en !== "") {
            dict["nickname_en"] = input_req.nickcame_en
        } 
        
        if (typeof input_req.department !== "undefined"  && input_req.department !== "") {
            dict["department"] = input_req.department
        } 
        
        if (typeof input_req.division !== "undefined"  && input_req.division !== "") {
            dict["division"] = input_req.division
        } 
        
        if (typeof input_req.position !== "undefined"  && input_req.position !== "") {
            dict["position"] = input_req.position
        } 
        
        if (typeof input_req.level !== "undefined"  && input_req.level !== "") {
            dict["level"] = input_req.level
        }

        if (typeof input_req.employee !== "undefined"  && input_req.employee !== "") {
            dict["employee"] = input_req.employee
        }

        if (typeof input_req.workPhone !== "undefined"  && input_req.workPhone !== "") {
            dict["workPhone"] = input_req.workPhone
        }

        const database = client.db(database_env);
        const col = database.collection(col_env);

        const filter = { id: input_req.id };
        const options = { upsert: true };
        const updateDoc = { $set: dict };
        const result = await col.updateOne(filter, updateDoc, options);

        return {status: true, message: "success"}
    } catch (error) {
        return {status: false, message: "fail"}
    }
}

//changeUudiProfile function
// {
//     id_profile: "uuid1"
// }
async function changeUuidProfile(change_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);
        let new_card_uuid_profile = uuidv4();

        const query = { id: change_req.id }

        const result = await col.updateOne(query, { $set: { id : new_card_uuid_profile } });
        
        return { status: true, message: "success", result: result}
    } catch(error) {
        error.message
        return {status: false, message: "fail", result: {}}
    }
}

module.exports = { updatePicProfile, saveProfile , changeUuidProfile};