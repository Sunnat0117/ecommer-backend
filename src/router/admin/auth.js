// const { response } = require('express');
const router = require('express').Router();
const { signup, signin, requireSignin }  = require('../../controller/admin/auth')


router.post("/admin/signup", signup)
router.post("/admin/signin", signin);


// router.post('/profile', requireSignin, (req, res)=>{
//     res.status(200).json({

//         user : 'profile'

//     })

// })



module.exports = router;
