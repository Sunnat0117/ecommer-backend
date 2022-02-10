const User = require('../../model/user')
const jwt = require('jsonwebtoken')
exports.signup = (req, res) =>{
    User.findOne({email : req.body.email})
    .exec((err, user)=>{
        if(user){
            res.status(400).json({
                message : " this user already registred"
            });
        }
        
        const {
            firstName,
            lastName,
            password,
            email, 
            
        } = req.body;
        

        const  _user = new User({
            firstName,
            lastName,
            password,
            email,
            userName : Math.random().toString(),
            role : 'admin'
        });

        _user.save((err, data)=>{
            if(err) return res.status(400).json({
                message : err
            })

            if(data) return res.status(200).json({
            message : "admin is succesfully..!"
            })
           
        })
    })
}
exports.signin = (req, res) =>{
    User.findOne({email : req.body.email})
    .exec((err, user)=>{
        console.log()
        if(err) return  res.status(400).json({ message : err});
        if(user){
            // console.log(`${password} password`);
            if(user.authentification(req.body.password) && user.role=== 'admin'){
                const token = jwt.sign({_id : user._id}, process.env.JWT_SEKSERT, {expiresIn : '1d'})
                const{_id, firstName, lastName,fullName, email, role } = user;

                res.status(200).json({
                    token, 
                    user: {_id, firstName, lastName, fullName, email, role} })
            }

        }else{
            return res.status(400).json({ message : " something went wrong"})
        }
    })
}
    
 exports.requireSignin = (req, res, next)=>{
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, process.env.JWT_SEKSERT)
    req.user = user;   
    next();     
 }