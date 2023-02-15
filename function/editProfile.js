require('dotenv').config();

//connect to mongodb
const { MongoClient } = require("mongodb");
const db = process.env.DATABASE_URL;
const client = new MongoClient(db);
const database_env = process.env.DATABASE;
const col_env = process.env.COL;

//updatePicProfile function
async function updatePicProfile(pic_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        const ref = { id: pic_req.id };
        const result = await col.updateOne(ref, { $set: { img_base64: pic_req.img_base64} })

        return {status: true, result: result}
    } catch (error) {
        error.message
        return { status: false, result: "update failed"}
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
            dict["nickcame_th"] = input_req.nickcame_th
        } 
        
        if (typeof input_req.nickname_en !== "undefined" && input_req.nickname_en !== "") {
            dict["nickcame_en"] = input_req.nickcame_en
        } 
        
        if (typeof input_req.img_url !== "undefined"  && input_req.img_url !== "") {
            dict["img_url"] = input_req.img_url
        } 
        
        if (typeof input_req.img_base64 !== "undefined"  && input_req.img_base64 !== "") {
            dict["img_base64"] = input_req.img_base64
        } 
        
        if (typeof input_req.email !== "undefined"  && input_req.email !== "") {
            dict["email"] = input_req.email
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

        return {status: true, result: result}
    } catch (error) {
        error.message
        return {status: false, result: "save failed"}
    }
}

module.exports = { updatePicProfile, saveProfile };