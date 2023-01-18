const express = require('express');
const { getRun, insertRun, updateRun, deleteRun, getOneRun, getDetailCardRun, insertDetailCardRun } = require('./app');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

//getRun
router.get('/get', async (req, res) => {
      try {
        const output = await getRun()
        res.send(output)
      }
      catch(error){
        res.status(500).json({message: error.message})
      };
  })

//getOneRun
router.get('/getOne', async(req, res) => {
    try{
        const output = await getOneRun(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//getDetailCardRun
router.get('/getOne/detailCard', async(req, res) => {
    try{
        const output = await getDetailCardRun(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//insertRun
router.post('/insert', async(req, res) => {
    try{
        const output = await insertRun(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//insertDetailCardRun
router.post('/insert/detailCard', async(req,res) => {
    try{
        const output = await insertDetailCardRun(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//updateRun
router.put('/update', async (req, res) => {
    try{
        const output = await updateRun(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
  })

//deleteRun
router.delete('/delete', async (req, res) => {
    try{
        const output = await deleteRun(req.body)
        res.send(output)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


module.exports = router;
  