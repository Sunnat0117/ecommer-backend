// const { response } = require('express');
const router = require('express').Router();
const { signup, signin, requireSignin }  = require('../controller/auth')


router.post("/signup", signup)
router.post("/signin", signin);

router.post('/profile', requireSignin, (req, res)=>{
    res.status(200).json({
        user : 'profile'
    })   

})



module.exports = router;
