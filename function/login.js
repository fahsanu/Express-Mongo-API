require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

//connect to mongodb
const { MongoClient } = require("mongodb");
const db = process.env.DATABASE_URL;
const client = new MongoClient(db);
const database_env = process.env.DATABASE;
const col_env = process.env.COL;

//login function
// {
//     "email": "",
// }
async function login(login_req) {
    try {
        if (login_req.email  === "") {
            return { status: false, result: "email not found" }
        }
        const database = client.db(database_env);
        const col = database.collection(col_env);

        const provider_splited = login_req.email.substring(login_req.email.indexOf("@") + 1, login_req.email.lastIndexOf("."));

        const result = await col.findOne({ email: login_req.email }, { projection: {_id: 0 }} );

        if (result !== null) {
            return { status: true, result: result }
        } else {
            if (login_req?.email || "") {
                let main_uuid = uuidv4();
                let card_uuid = uuidv4();
                const docs = {
                    id: main_uuid,
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
                    img_url: "",
                    img_base64: "",
                    email: login_req.email,
                    provider: provider_splited,
                    department: "",
                    division: "",
                    position: "",
                    level: "",
                    employee: "",
                    workPhone: "",
                    friend_list: [],
                    set_active_card: card_uuid,
                    card_all: [
                        {
                            id_card: card_uuid,
                            type_card: "work",
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
                            email: login_req.email,
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
                        }
                    ]
                }
                const options = { ordered: true };
                await col.insertOne(docs, options);
                const result_inserted = await col.findOne({ email: login_req.email },{ projection: {_id: 0 }});

                return { status: true, message: "success", result: result_inserted }
            } 
        }
    } catch (error) {
        error.message
        return { status: false, message: "fail", result: {} }
    }
}

module.exports = { login };