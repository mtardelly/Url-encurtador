import React from 'react';

import{ BrowserRouter, Switch, Route} from 'react-router-dom';


import index from './pages/index';
import SingIn from './pages/Login/SingIn';
import SingUp from './pages/Login/SingUp';


export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            {/* Rota Cliente */}
            <Route path="/" exact component={index} />    
            <Route path="/login" exact component={SingIn} />
            <Route path="/register" exact component={SingUp}/>
        </Switch>
        </BrowserRouter>
    )
}