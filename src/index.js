import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {Route, Link, BrowserRouter, HashRouter, Switch} from 'react-router-dom'

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
console.log('Hit initialize')

const routes = (
        <HashRouter basename={'/'}>
        <div>
            <AppBar position={'relative'} style={{backgroundColor: '#667999'}}>
                <Toolbar>

                    <Typography variant="h6">
                        <Link style={{color: 'white', textDecoration: 'none', marginRight: 8}} to="/"><img src={logo} style={{marginTop: 10}}/></Link>
                    </Typography>

                    <Typography variant="h6">
                        <Link style={{color: 'white', textDecoration: 'none',}} to="/">Muun</Link>
                    </Typography>
                </Toolbar>
            </AppBar>

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
