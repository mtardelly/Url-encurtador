const express = require('express');

const routes = express.Router();

const User = require('./controllers/user.controller');
const Url = require('./controllers/url.controller');


routes.get('/',function(req,res){res.send('Seja Bem Vindo a pagina inicial!!')})

routes.get('/api/users',User.index);
routes.post('/api/users', User.create);
routes.delete('/api/users/:_id',User.delete);
routes.get('/api/users.details/:_id',User.details);
routes.put('/api/users',User.update);

routes.post('/api/urls',Url.createUrl);
routes.delete('/api/urls/delete/:_id',Url.deleteUrl);
routes.get('/:urls',Url.shortUrl);

module.exports = routes;