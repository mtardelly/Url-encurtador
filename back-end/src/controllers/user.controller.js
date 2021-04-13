const {json} = require('express');
const jwt = require('jsonwebtoken');


const User = require('../models/user.model');
const secret = 'mysecret';

module.exports = {
    async index (req,res){
        User.find()
        .populate('urls')
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    },

    async create(req,res){
        const {name_user, email_user, password_user} = req.body;
        
        let data = {};

        let user = await User.findOne({email_user});

        if(!user){
            data = {name_user, email_user, password_user};

            user = await User.create(data);

            return res.status(200).json(user);
        }else{ 
            return res.status(500).json(user);
        }
    },
    
    async details(req,res){
        const {_id} = req.params;
        const user = await Usuario.findOne({_id});
        res.json(user);
    },

    async delete(req,res){
        const {_id} = req.params;
        const user = await User.findOneAndDelete({_id});
        res.json(user);
    },

    async update(req,res){
        const {_id,name_user, email_user, password_user} = req.body;
        const data = {name_user,email_user,password_user};
        const user = await User.findOneAndUpdate({_id},data,{new:true});
        res.json(user);
    }

}