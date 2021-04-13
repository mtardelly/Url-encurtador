const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var urls = require('./url.model')

const DataSchema = new mongoose.Schema({
    name_user:{
        type:String,
        required:true
    },
    email_user:{
        type:String,
        required:true,
        unique:true
    },
    password_user:{
        type:String,
        required:true
    },
    urls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Urls' }],
},{
    timestamps:true
});

DataSchema.pre('remove', function(next){
    urls.remove({
        "_id":{
            $in:this.urls
        }
    });
    next();
});

DataSchema.pre('save',function(next){
    if(!this.isModified('password_user')){
        return next();
    }
    this.password_user = bcrypt.hashSync(this.password_user,8);
    next();
});

DataSchema.pre('findOneAndUpdate',function(next){
    var password = this.getUpdate().password_user+'';
    if(password.length<55){
        this.getUpdate().password_user = bcrypt.hashSync(password,8)
    }
    next();
});

DataSchema.methods.isCorrectPassword = function (password, callback){
    bcrypt.compare(password,this.password_user,function(err,same){
        if(err){
            callback(err);
        }else{
            callback(err, same);
        }
    })
}

const users = mongoose.model('Users',DataSchema);
module.exports = users;