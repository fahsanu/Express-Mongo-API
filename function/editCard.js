require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

//connect to mongodb
const { MongoClient } = require("mongodb");
const db = process.env.DATABASE_URL;
const client = new MongoClient(db);
const database_env = process.env.DATABASE;
const col_env = process.env.COL;

//updatePicCard function
// { 
//     "id_profile": "",
//     "id_card": "", 
//     "img_base64": ""
// }
async function updatePicCard(pic_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        const query = { id: pic_req.id, "card_all.id_card" : pic_req.id_card };

        const result = await col.updateOne(query, { $set: { "card_all.$.img_base64": pic_req.img_base64} })

        return {status: true, message: "success"}
    } catch (error) {
        error.message
        return {status: false, message: "fail"}
    }
}

//createNewCard function
// {
//     "id_profile": ""
// }
async function createNewCard(card_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        const ref = { id: card_req.id }
        let card_uuid = uuidv4();

        const result = await col.updateOne(ref, { $push: { card_all: {
            id_card: card_uuid,
            type_card: card_req.type_card,
            name_full_en: "",
            name_first_en: "",
            name_mid_en: "",
            name_last_en: "",
            name_full_th: "",
            name_first_th: "",
            name_mid_th: "",
            name_last_th: "",
            nickname_th: "",
            nickname_en: "",
            brith_day: "",
            email: "",
            mobilePhone: "",
            department: "",
            division: "",
            position: "",
            card_active: true,
            solf_delete: false,
            card_theme_style: "default",
            card_color: "",
            company_info: true,
            img_base64: "",
            detail_card: []
        } } });

        return {status: true, message: "success"}
    } catch (error) {
        return {status: false, result: "fail"}
    }
}

//saveProfile function
async function saveCard(input_req) {
    try {
        var dict = {}

        if (typeof input_req.type_card !== "undefined" && input_req.type_card !== "") {
            dict["card_all.$.type_card"] = input_req.type_card
        } 

        if (typeof input_req.name_full_en !== "undefined" && input_req.name_full_en !== "") {
            dict["card_all.$.name_full_en"] = input_req.name_full_en
        } 
        
        if (typeof input_req.name_first_en !== "undefined"  && input_req.name_first_en !== "") {
            dict["card_all.$.name_first_en"] = input_req.name_first_en
        } 
        
        if (typeof input_req.name_mid_en !== "undefined"  && input_req.name_mid_en !== "") {
            dict["card_all.$.name_mid_en"] = input_req.name_mid_en
        } 
        
        if (typeof input_req.name_last_en !== "undefined"  && input_req.name_last_en !== "") {
            dict["card_all.$.name_last_en"] = input_req.name_last_en
        } 
        
        if (typeof input_req.name_full_th !== "undefined" && input_req.name_full_th !== "") {
            dict["card_all.$.name_full_th"] = input_req.name_full_th
        } 
        
        if (typeof input_req.name_first_th !== "undefined"  && input_req.name_fisrt_th !== "") {
            dict["card_all.$.name_first_th"] = input_req.name_first_th
        } 
        
        if (typeof input_req.name_mid_th !== "undefined"  && input_req.name_mid_th !== "") {
            dict["card_all.$.name_mid_th"] = input_req.name_mid_th
        } 
        
        if (typeof input_req.name_last_th !== "undefined"  && input_req.name_last_th !== "") {
            dict["card_all.$.name_last_th"] = input_req.name_last_th
        } 
        
        if (typeof input_req.nickname_th !== "undefined" && input_req.nickname_th !== "") {
            dict["card_all.$.nickname_th"] = input_req.nickcame_th
        } 
        
        if (typeof input_req.nickname_en !== "undefined" && input_req.nickname_en !== "") {
            dict["card_all.$.nickname_en"] = input_req.nickcame_en
        } 

        if (typeof input_req.brith_day !== "undefined"  && input_req.brith_day !== "") {
            dict["card_all.$.brith_day"] = input_req.brith_day
        }
        
        if (typeof input_req.img_base64 !== "undefined"  && input_req.img_base64 !== "") {
            dict["card_all.$.img_base64"] = input_req.img_base64
        } 
        
        if (typeof input_req.email !== "undefined"  && input_req.email !== "") {
            dict["card_all.$.email"] = input_req.email
        } 
        
        if (typeof input_req.department !== "undefined"  && input_req.department !== "") {
            dict["card_all.$.department"] = input_req.department
        } 
        
        if (typeof input_req.division !== "undefined"  && input_req.division !== "") {
            dict["card_all.$.division"] = input_req.division
        } 
        
        if (typeof input_req.position !== "undefined"  && input_req.position !== "") {
            dict["card_all.$.position"] = input_req.position
        } 

        if (typeof input_req.mobilePhone !== "undefined"  && input_req.mobilePhone !== "") {
            dict["card_all.$.mobilePhone"] = input_req.mobilePhone
        }

        if (typeof input_req.card_theme_style !== "undefined"  && input_req.card_theme_style !== "") {
            dict["card_all.$.card_theme_style"] = input_req.card_theme_style
        }

        if (typeof input_req.card_color !== "undefined"  && input_req.card_color !== "") {
            dict["card_all.$.card_color"] = input_req.card_color
        }
        
        dict["card_all.$.card_active"] = true
        dict["card_all.$.solf_delete"] = false
        dict["card_all.$.company_info"] = true
        

        const database = client.db(database_env);
        const col = database.collection(col_env);

        const filter = { "card_all.id_card" : input_req.id_card };
        const options = { upsert: true };
        const updateDoc = { $set: dict };
        const result = await col.updateMany(filter, updateDoc, options);

        return {status: true, message: "success"}
    } catch (error) {
        return {status: false, result: "fail"}
    }
}

//updateThemeCard function
// {
//     "id_profile": "uuid1",
//     "id_card": "uuid2",
//     "card_theme_style": "default"
// }
async function updateThemeCard(theme_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);
        
        const query = { id: theme_req.id, "card_all.id_card": theme_req.id_card }
        const result = await col.updateOne(query, { $set: { "card_all.$.card_theme_style" : theme_req.card_theme_style}})

        return { status: true, message: "success"}
    } catch(error) {
        return { status: false, message: "fail"}
    }
}

//deleteCard function
//change state of solf_delete
async function deleteCard(delete_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        const query = { "card_all.id_card" : delete_req.id_card };
        // const options = { projection: { _id: 0 , card_all: { $elemMatch: { id_card: delete_req.id_card }} } };

        const result = await col.updateOne(query, { $set: { "card_all.$.solf_delete" : true } });

        return { status: true, message: "success" }
    } catch (error) {
        return {status: false, message: "fail"}
    }
}

module.exports = { updatePicCard, createNewCard, updateThemeCard, saveCard, deleteCard };