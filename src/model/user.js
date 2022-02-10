const  mongoose= require('mongoose')
const bcrypt = require('bcrypt')

const userSchema  =  new mongoose.Schema({
    firstName :{
        type : String,
        required :  true,
        trim : true,
        minlength : 3,
        maxlength : 25
    },
   lastName :{
        type : String,
        required :  true,
        trim : true,
        minlength : 3,
        maxlength : 25
    },
    userName :{
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true
    },

    email : {
        type : String,
        required : true,
        unique : true,
        lowercase :  true
        
    },
     hash_password :{
         type : String,
         required : true,

     },
     role : {
         type : String,
         enum : ["user","admin"],
         default : "user"

     },
     contactNumber :{type : String},
     profilePicture :{ type : String}
},
{timestamps : true});


userSchema.virtual('password')
.set(function(password){
    
    // let newPass = password.toString();
  this.hash_password = bcrypt.hashSync(password, 10)
});
userSchema.virtual('fullName')
.get( function(){
    return `${this.firstName} ${this.lastName} `
})



userSchema.methods = {
    authentification :  async  function(password){
         return  await bcrypt.compareSync(password, this.hash_password);
        }    
    }

    const User = mongoose.model("User", userSchema);
    

    module.exports = User;
    //after 10minutes  maybe need to me. it is connect method

