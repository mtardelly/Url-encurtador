const express = require('express');

const routes = express.Router();

const User = require('./controllers/user.controller');
const Url = require('./controllers/url.controller');


routes.get('/', function (req, res) { res.send('Seja Bem Vindo') })

//ROTAS DE USUARIO

routes.get('/api/users', User.index);
routes.post('/api/users', User.create);
routes.delete('/api/users/:_id', User.delete);
routes.get('/api/users.details/:_id', User.details);
routes.put('/api/users', User.update);
routes.post('/api/users/login', User.login);
routes.get('/api/users/checktoken', User.checkToken);
routes.get('/api/users/destroytoken', User.destroyToken);

//ROTAS DE URL

routes.post('/api/urls', Url.createUrl);
routes.delete('/api/urls/delete/:_id', Url.deleteUrl);


module.exports = routes;