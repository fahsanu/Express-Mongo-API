require('dotenv').config();

//connect to mongodb
const { MongoClient } = require("mongodb");
const db = process.env.DATABASE_URL;
const client = new MongoClient(db);
const database_env = process.env.DATABASE;
const col_env = process.env.COL;

// async function updatePicProfile {
//     return await 
// }

//saveProfile function
async function saveProfile(input_req) {
    try {
        var dict = {}

        if (typeof input_req.name_full !== "undefined") {
            dict["name_full"] = input_req.name_full
        } if (typeof input_req.name_first !== "undefined") {
            dict["name_first"] = input_req.name_first
        } if (typeof input_req.name_mid !== "undefined") {
            dict["name_mid"] = input_req.name_mid
        } if (typeof input_req.name_last !== "undefined") {
            dict["name_last"] = input_req.name_last
        } if (typeof input_req.img_base64 !== "undefined") {
            dict["img_base64"] = input_req.img_base64
        } if (typeof input_req.title !== "undefined") {
            dict["title"] = input_req.title
        } if (typeof input_req.department !== "undefined") {
            dict["department"] = input_req.department
        } if (typeof input_req.phonenumber !== "undefined") {
            dict["phonenumber"] = input_req.phonenumber
        } if (typeof input_req.bio !== "undefined") {
            dict["bio"] = input_req.bio
        } if (typeof input_req.company !== "undefined") {
            dict["company"] = input_req.company
        }

        const database = client.db("vibecards");
        const col = database.collection("vibecards_dev");

        const filter = { email: input_req.email };
        const options = { upsert: true };
        const updateDoc = { $set: dict };
        const result = await col.updateOne(filter, updateDoc, options);

        return result
    } catch (error) {
        error.message
    }
}
module.exports = { saveProfile };