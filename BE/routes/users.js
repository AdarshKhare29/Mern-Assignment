const express = require('express');

const router = express.Router({ caseSensitive: false });
const UserModel = require("../model/User")

router.get('/', (req, res) => {
    UserModel.find().exec((err, result) => {
        if (err) {
            return res.status(400).json({
                message: 'No users found'
            })
        }
        return res.status(200).json(result)
    })
})

router.post('/', async (req, res, next) => {
    let data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile
    }
    console.log(data)
    try {
        const savedUser = await UserModel.create(data)
        res.json({
          message: 'User Created successful',
          user: savedUser
        });
    
      } catch (err) {
        next(err)
      }
});

router.get('/search',async(req,res)=>{
    let q = req.query.q
	console.log(q)
    // res.send('hello'+ req)
    await UserModel.find({ 'firstName':q})
    .exec((err,result)=>{
        if(err) throw err;
        return res.status(200).json(result)
    })
})

router.post('/:id', (req,res)=>{
    let q=req.params.id
    console.log(q)
    let updateData=req.body
    console.log(req)
    UserModel.findOneAndUpdate({_id:req.params.id},{
        $set:{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobile: req.body.mobile
        }   
    })
    .then((result)=>{
        res.status(200).json({
            updated_result:result
        })
    })
    .catch(err=>{
        console.log(err)
    })
});


router.delete('/delete/:id',(req,res)=>{
    console.log("hello")
    const {id}=req.params
    console.log(req.body)
    UserModel.deleteOne({_id:req.params.id})
    .then((result)=>{
        res.status(200).json({
            ...result
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router;