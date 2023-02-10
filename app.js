require('dotenv').config();

//connect to mongodb
const { MongoClient } = require("mongodb");
const db = process.env.DATABASE_URL;
const client = new MongoClient(db);
const database = client.db("vibecards");
const col = database.collection("vibecards_dev");

//getRun function
async function getRun() {
    try {
        const query = {};
        const options = { projection: { _id: 0 }, sort: { id: 1}};
        const result = await col.find(query, options).toArray()
        
        return result
    } catch(error) {
        error.message
    }
  }

//getOneRun function
async function getOneRun(getOne_req) {
    try {
        const query = { email: getOne_req.email };
        const options = { projection: { _id: 0} };
        
        const result = await col.findOne(query, options);

        return result
    } catch(error) {
        error.message
    }
  }

//getDetailCard function
async function getDetailCardRun(get_id) {
    try {
        const query = { email: get_id.email };
        const options = { projection: { _id: 0, detail_card: 1}, sort: {id_card: 1} };
         
        const result = await col.findOne(query, options);

        return result
    } catch(error) {
        error.message
    }
  }

//getStyleCard function
async function getStyleCardRun(get_req) {
    try {
        const query = { email: get_req.email}
        const options = { projection: { _id: 0, style_card: 1} }

        const result = await col.findOne(query, options);
        console.log(result)

        return result
    } catch(error) {
        error.message
    }
}

//insert function
async function insertRun(insert_req) {
    try {
      const database = client.db("mBizcard");
      const col = database.collection("poc_mbizcard");

      const docs =  {
        id: insert_req.id,
        email: insert_req.email,
        name_full: insert_req.name_full,
        name_first: insert_req.name_first,
        name_mid: insert_req.name_mid,
        name_last: insert_req.name_last,
        img_base64: [],
        title: insert_req.title,
        department: insert_req.department,
        phonenumber: insert_req.phonenumber,
        bio: insert_req.bio,
        company: insert_req.company,
        detail_card: [],
        style_card: insert_req.style_card

    } 
      const options = { ordered: true };

      const result = await col.insertOne(docs, options);
      
      return result
    } catch(error) {
        error.message
    }
  } 


//login function
async function login(check_id) {
    try {
        const database = client.db("mBizcard");
        const col = database.collection("poc_mbizcard");
        const result = await col.findOne({ email: check_id.email});

        if (result !== null) {
            console.log("Founded")
            return result
        } else {
            console.log("Not Founded")
            if (check_id?.email || "") {
            const docs =  {
                id: "",
                email: check_id?.email || "",
                name_full: "",
                name_first: "",
                name_mid: "",
                name_last: "",
                img_base64: [],
                title: "",
                department: "",
                phonenumber: "",
                bio: "",
                company: "",
                detail_card: [],
                style_card: ""
            } 
              const options = { ordered: true };
              const result = await col.insertOne(docs, options);
              return result 
            } else { }}
    } catch(error) {
        error.message
    }
}

//insertDetailCard function
async function insertDetailCardRun(insert_DC) {
    try {
      const database = client.db("mBizcard");
      const col = database.collection("poc_mbizcard");

      const ref = { email: insert_DC.email }

      const result = await col.updateMany(ref, { $set: { detail_card: insert_DC.detail_card }});
      
      return result
    } catch(error) {
        error.message
    }
  } 

//insertStyleCard function
async function insertStyleCardRun(insert_SC) {
    try {
        const database = client.db("mBizcard");
        const col = database.collection("poc_mbizcard");

        const ref = { email: insert_SC.email}

        const result = await col.updateOne(ref, { $set: { style_card: insert_SC.style_card }});

        return result
    } catch(error) {
        error.message
    }
}


//update function
async function updateRun(input_req) {
    try {
        var dict = {}

        if (typeof input_req.name_full !== "undefined"){
            dict["name_full"] = input_req.name_full
        } if (typeof input_req.name_first !== "undefined"){
            dict["name_first"] = input_req.name_first
        } if (typeof input_req.name_mid !== "undefined"){
            dict["name_mid"] = input_req.name_mid
        } if (typeof input_req.name_last !== "undefined"){
            dict["name_last"] = input_req.name_last
        } if (typeof input_req.img_base64 !== "undefined"){
            dict["img_base64"] = input_req.img_base64
        } if (typeof input_req.title !== "undefined"){
            dict["title"] = input_req.title
        } if (typeof input_req.department !== "undefined"){
            dict["department"] = input_req.department
        }if (typeof input_req.phonenumber !== "undefined"){
            dict["phonenumber"] = input_req.phonenumber
        } if (typeof input_req.bio !== "undefined"){
            dict["bio"] = input_req.bio
        } if (typeof input_req.company !== "undefined"){
            dict["company"] = input_req.company
        }

        const database = client.db("mBizcard");
        const col = database.collection("Fah_DB");

        const filter = { email: input_req.email};
        const options = { upsert: true };
        const updateDoc = { $set: dict};
        const result = await col.updateOne(filter, updateDoc, options);

        return result
        } catch(error) {
            error.message
        }
  } 


//delete function
async function deleteRun(delete_req) {
    try {
        const database = client.db("mBizcard");
        const col = database.collection("poc_mbizcard");

        const query = { email: delete_req.email };

        const result = await col.deleteOne(query);
        
        return result
    } catch(error) {
        error.message
    }
} 

module.exports = { getRun, getOneRun, insertRun, updateRun, deleteRun, getDetailCardRun, insertDetailCardRun, getStyleCardRun, insertStyleCardRun, login }


//dataset
//change img setting to array
const datatest = [
    {
        id: '', //string gmail123456
        email: 'boo1@gmail.com',
        name_full: '',
        name_first: '',
        name_mid: '',
        name_last: '',
        img_base64   : [],
        title: '',
        department: '',
        phonenumber: '',
        bio: '',
        company: '',
        detail_card: [
            {
                id_card:'',
                type_card: 'url',
                title_card: '',
                url_card: '',
                status_active: ""
            },
            {
                id_card:'',
                type_card: 'url',
                title_card: '',
                url_card: '',
                status_active: ""
            },
        ],
        style_card: {
            color_card: '',
            color_bg: '',
            color_text: '',
            fort_text: '',
        }
    },
]