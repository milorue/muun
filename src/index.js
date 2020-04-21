import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {Route, Link, BrowserRouter, HashRouter,} from 'react-router-dom'

import Login from "./pages/login";
import Signup from "./pages/signup";
import Confirm from "./pages/confirm";
import PasswordReset from "./pages/passreset";
import Reset from "./pages/reset";
import Home from "./pages/home";

import logo from './assets/app_bar_variant.png'

// libraries for backend
import {Stitch} from 'mongodb-stitch-browser-sdk'

// libraries for components & design
import AppBar from "@material-ui/core/AppBar";
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';



Stitch.initializeDefaultAppClient('muun-hizde');

const routes = (
        <HashRouter basename={'/'}>
        <div>


            <Route exact path="/" component={Login} />
            <Route path={'/signup'} component={Signup}/>
            <Route path={'/confirm'} component={Confirm}/>
            <Route path={'/forgot'} component={PasswordReset}/>
            <Route path={'/reset'} component={Reset}/>
            <Route path={'/home'} component={Home}/>

        </div>
    </HashRouter>
)


ReactDOM.render(
    routes,
  document.getElementById('root')
);
