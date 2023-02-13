require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

//connect to mongodb
const { MongoClient } = require("mongodb");
const db = process.env.DATABASE_URL;
const client = new MongoClient(db);
const database_env = process.env.DATABASE;
const col_env = process.env.COL;

//updatePicCard function
async function updatePicCard(pic_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        const query = { "card_all.id_card" : pic_req.id_card };
        // const options = { projection: { _id: 0 , card_all: { $elemMatch: { id_card: getOne_req.id_card , solf_delete: false }} } };

        const result = await col.updateOne(query, { $set: { "card_all.$.img_base64": pic_req.img_base64} })

        return {status: true, result: result}
    } catch (error) {
        error.message
        return {status: false, result: result}
    }
}

//createNewCard function
async function createNewCard(card_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        const ref = { id: card_req.id }
        let card_uuid = uuidv4();

        const result = await col.updateOne(ref, { $push: { card_all: {
            id_card: card_uuid,
            type_card: "",
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

        return result
    } catch (error) {
        error.message
    }
}

//saveCard function
async function saveCard(save_req) {
    try {
        const database = client.db(database_env);
        const col = database.collection(col_env);

        return result

    } catch (error) {
        error.message
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

        return { status: true, result: result }
    } catch (error) {
        error.message
    }
}

module.exports = { updatePicCard, createNewCard, deleteCard };