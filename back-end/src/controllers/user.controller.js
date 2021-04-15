const { json } = require('express');
const jwt = require('jsonwebtoken');


const User = require('../models/user.model');
const secret = 'mysecret';

module.exports = {
    async index(req, res) {
        User.find()
            .populate('urls')
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    },

    async create(req, res) {
        const { name_user, email_user, password_user } = req.body;

        let data = {};

        let user = await User.findOne({ email_user });

        if (!user) {
            data = { name_user, email_user, password_user };

            user = await User.create(data);

            return res.status(200).json(user);
        } else {
            return res.status(500).json(user);
        }
    },

    async details(req, res) {
        const { _id } = req.params;
        const user = await User.findOne({ _id })
            .populate('urls')
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
        res.json(user);
    },

    async delete(req, res) {
        const { _id } = req.params;
        const user = await User.findOneAndDelete({ _id });
        res.json(user);
    },

    async update(req, res) {
        const { _id, name_user, email_user, password_user } = req.body;
        const data = { name_user, email_user, password_user };
        const user = await User.findOneAndUpdate({ _id }, data, { new: true });
        res.json(user);
    },

    async login(req, res) {
        const { email, senha } = req.body;
        User.findOne({ email_user: email }, function (err, user) {
            if (err) {
                console.log(err);
                res.status(200).json({ erro: "Erro no servidor. Por favor, tente novamente" });
            } else if (!user) {
                res.status(200).json({ status: 2, error: 'Usuario ou senha incorreto' });
            } else {
                user.isCorrectPassword(senha, async function (err, same) {
                    if (err) {
                        res.status(200).json({ error: "Erro no servidor. Por favor, tente novamente" });
                    } else if (!same) {
                        res.status(200).json({ status: 2, error: 'Usuario ou senha incorreto'});
                    } else {
                        const payload = { email };
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '24h'
                        })
                        res.cookie('token', token, { httpOnly: true });
                        res.status(200).json({ status: 1, auth: true, token: token, id_client: user._id, user_name: user.name_user, client_email: user.email_user });
                    }
                })

            }
        })
    },
    async checkToken(req, res) {
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
        if (!token) {
            res.json({ status: 401, msg: 'Não autorizado: Token inexistente!' });
        } else {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.json({ status: 401, msg: 'Não autorizado: Token inválido!' });
                } else {
                    res.json({ status: 200 })
                }
            })
        }
    },

    async destroyToken(req, res) {
        const token = req.headers.token;
        if (token) {
            res.cookie('token', null, { httpOnly: true });
        } else {
            res.status(401).send("Logout não autorizado!")
        }
        res.send("Sessão finalizada com sucesso!");
    }

}