import React from 'react';

import{ BrowserRouter, Switch, Route} from 'react-router-dom';

import index from './pages/index';
import login from './pages/Login/SingIn';
import SingUp from './pages/Login/SingUp';

import PrivateRoute from './services/wAuth';

export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            {/* Rotas */}
            <PrivateRoute path="/" exact component={index} />    
            
            <Route path="/login" exact component={login} />
            
            <Route path="/register" exact component={SingUp}/>
        
        </Switch>
        </BrowserRouter>
    )
}