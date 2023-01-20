require('dotenv').config();

//connect to mongodb
const { MongoClient } = require("mongodb");
const db = process.env.DATABASE_URL;
const client = new MongoClient(db);

//getRun function
async function getRun() {
    try {
        const database = client.db("Test_Collection_Fah");
        const col = database.collection("Fah_DB");

        const query = {};
        const options = { projection: { _id: 0 }, sort: { id: 1}};
        const result = await col.find(query, options).toArray()
        
        return result
    } finally {
      await client.close();
    }
  }

//getOneRun function
async function getOneRun(getOne_req) {
    try {
        const database = client.db("Test_Collection_Fah");
        const col = database.collection("Fah_DB");

        const query = { email: getOne_req.email };
        const options = { projection: { _id: 0} };
         
        const result = await col.findOne(query, options);

        return result
    } finally {
      await client.close();
    }
  }

//getDetailCard function
async function getDetailCardRun(get_id) {
    try {
        const database = client.db("Test_Collection_Fah");
        const col = database.collection("Fah_DB");
        
        const query = { email: get_id.email };
        const options = { projection: { _id: 0, detail_card: 1}, sort: {id_card: 1} };
         
        const result = await col.findOne(query, options);

        return result
    } finally {
      await client.close();
    }
  }

//getStyleCard function
async function getStyleCardRun(get_req) {
    try {
        const database = client.db("Test_Collection_Fah");
        const col = database.collection("Fah_DB");

        const query = { email: get_req.email}
        const options = { projection: { _id: 0, style_card: 1} }

        const result = await col.findOne(query, options);

        return result
    } finally {
        await client.close();
    }
}

//insert function
async function insertRun(insert_req) {
    try {
      const database = client.db("Test_Collection_Fah");
      const col = database.collection("Fah_DB");

      const docs =  {
        id: insert_req.id,
        email: insert_req.email,
        name_full: insert_req.name_full,
        name_first: insert_req.name_first,
        name_mid: insert_req.name_mid,
        name_last: insert_req.name_last,
        img_url: insert_req.img_url,
        img_base64: insert_req.img_base64,
        title: insert_req.title,
        detail_card: [],
        style_card: insert_req.style_card

    } 
      const options = { ordered: true };

      const result = await col.insertOne(docs, options);
      
      return result
    } finally {
        await client.close();
    }
  } 

//insertDetailCard function
async function insertDetailCardRun(insert_DC) {
    try {
      const database = client.db("Test_Collection_Fah");
      const col = database.collection("Fah_DB");

      const ref = { email: insert_DC.email }

      const result = await col.updateMany(ref, { $set: { detail_card: insert_DC.detail_card }});
      
      return result
    } finally {
        await client.close();
    }
  } 

//insertStyleCard function
async function insertStyleCardRun(insert_SC) {
    try {
        const database = client.db("Test_Collection_Fah");
        const col = database.collection("Fah_DB");

        const ref = { email: insert_SC.email}

        const result = await col.updateOne(ref, { $set: { style_card: insert_SC.style_card }});

        return result
    } finally {
        await client.close();
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
        } if (typeof input_req.img_url !== "undefined"){
            dict["img_url"] = input_req.img_url
        } if (typeof input_req.img_base64 !== "undefined"){
            dict["img_base64"] = input_req.img_base64
        } if (typeof input_req.title !== "undefined"){
            dict["title"] = input_req.title
        }

        const database = client.db("Test_Collection_Fah");
        const col = database.collection("Fah_DB");

        const filter = { email: input_req.email};
        const options = { upsert: true };
        const updateDoc = { $set: dict};
        const result = await col.updateOne(filter, updateDoc, options);

        return result
        } finally {
          await client.close();
    }
  } 


//delete function
async function deleteRun(delete_req) {
    try {
        const database = client.db("Test_Collection_Fah");
        const col = database.collection("Fah_DB");

        const query = { email: delete_req.email};

        const result = await col.deleteOne(query);
        
        return result
    } finally {
        await client.close();
    }
} 

module.exports = { getRun, getOneRun, insertRun, updateRun, deleteRun, getDetailCardRun, insertDetailCardRun, getStyleCardRun, insertStyleCardRun }


//dataset
const datatest = [
    {
        id: 1,
        email: 'boo1@gmail.com',
        name_full: '',
        name_first: '',
        name_mid: '',
        name_last: '',
        img_url   : '',
        img_base64   : '',
        title: '',
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
    {
        id: 2,
        email: 'boo2@gmail.com',
        name_full: '',
        name_first: '',
        name_mid: '',
        name_last: '',
        img_url: '',
        img_base64   : '',
        title: '',
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