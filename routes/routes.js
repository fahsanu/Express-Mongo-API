const express = require('express');
const { login } = require('../function/login');
const { getAll, getAllCard, getPerCardPublic, getPerCardPrivate } = require("../function/getCard");
const { updatePicCard, createNewCard, saveCard, updateThemeCard, deleteCard, changeUuid } = require("../function/editCard");
const { updatePicProfile, saveProfile, changeUuidProfile } = require("../function/editProfile");
const { setActiveCard } = require("../function/setActive");
const { getFriendList, addFriend, deleteFriend } = require("../function/friendList");
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
router.post('/api/v1/get_all_card', async(req, res) => {
    try{
        const output = await getAllCard(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//getPerCard -> only req id card
router.post('/api/v1/get_per_card_public', async(req, res) => {
    try{
        const  output = await getPerCardPublic(req.body)
        console.log(output)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//getPerCard -> only req id card
router.post('/api/v1/get_per_card_private', async(req, res) => {
    try{
        const  output = await getPerCardPrivate(req.body)
        console.log(output)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//updatePicCard
router.put('/api/v1/update_pic_card', async (req, res) => {
    try{
        const output = await updatePicCard(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
  })

//createNewCard
router.post('/api/v1/create_new_card', async(req,res) => {
    try{
        const output = await createNewCard(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//createNewCard
router.post('/api/v1/update_theme_card', async(req,res) => {
    try{
        const output = await updateThemeCard(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//saveCard
router.post('/api/v1/save_card', async(req,res) => {
    try{
        const output = await saveCard(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//deleteCard
router.put('/api/v1/delete_card', async (req, res) => {
    try{
        const output = await deleteCard(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//updatePicProfile
router.post('/api/v1/update_pic_profile', async (req, res) => {
    try{
        const output = await updatePicProfile(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
  })

//saveProfile
router.put('/api/v1/save_profile', async(req, res) => {
    try{
        const output = await saveProfile(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//changeUuidProfile
router.post('/api/v1/change_uuid_profile', async(req, res) => {
    try{
        const output = await changeUuidProfile(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.mesaage})
    }
})

//setActiveCard
router.put('/api/v1/set_active_card', async(req, res) => {
    try{
        const output = await setActiveCard(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//getFriendList
router.post('/api/v1/get_friend_forgateway', async(req, res) => {
    try{
        const output = await getFriendList(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//addFriend
router.post('/api/v1/add_friend', async(req, res) => {
    try{
        const output = await addFriend(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//deleteFriend
router.delete('/api/v1/delete_friend', async(req, res) => {
    try{
        const output = await deleteFriend(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router;
  