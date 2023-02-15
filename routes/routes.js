const express = require('express');
const {  login } = require('../function/login');
const { getAll, getAllCard, getPerCard } = require("../function/getCard")
const { updatePicCard, createNewCard, saveCard, deleteCard, changeUuid } = require("../function/editCard")
const { updatePicProfile, saveProfile } = require("../function/editProfile")
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

//check API connected
router.get('/check', async (req, res) => {
    try{
        res.send('API outed')
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//getAll
router.get('/api/v1/getall', async (req, res) => {
      try{
        const output = await getAll()
        res.send(output)
      }
      catch(error){
        res.status(500).json({message: error.message})
      };
  })

//getAllCard -> all active card from one profile
router.post('/api/v1/getallcard', async(req, res) => {
    try{
        const output = await getAllCard(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//getPerCard -> only req id card
router.post('/api/v1/getpercard', async(req, res) => {
    try{
        const  output = await getPerCard(req.body)
        console.log(output)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//login
router.post('/api/v1/login', async(req,res) => {
    try{
        const output = await login(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({mesaage: error.message})
    }
})

//updatePicCard
router.put('/api/v1/updatepiccard', async (req, res) => {
    try{
        const output = await updatePicCard(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
  })

//createNewCard
router.post('/api/v1/createnewcard', async(req,res) => {
    try{
        const output = await createNewCard(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//saveCard
router.post('/api/v1/savecard', async(req,res) => {
    try{
        const output = await saveCard(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//deleteCard
router.put('/api/vi/deletecard', async (req, res) => {
    try{
        const output = await deleteCard(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//changeUuidCard
router.put('/api/v1/change_uuid', async (req, res) => {
    try{
        const output = await changeUuid(req.body)
        res.send(output)
    }catch(error){
        res.status(500).json({mesaage: error.message})
    }
})

//updatePicProfile
router.put('/api/v1/updatepicprofile', async (req, res) => {
    try{
        const output = await updatePicProfile(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
  })

//saveProfile
router.post('/api/v1/save_profile', async(req, res) => {
    try{
        const output = await saveProfile(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


module.exports = router;
  