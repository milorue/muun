import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, Link, BrowserRouter, HashRouter} from 'react-router-dom'
import Login from "./pages/login";
import {Dog} from './pages/components'
import Signup from "./pages/signup";
import Confirm from "./pages/confirm";
import PasswordReset from "./pages/passreset";
import Reset from "./pages/reset";

import logo from './assets/app_logo.png'

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
           <AppBar position={'relative'} style={{marginBottom: 30, backgroundColor: '#667999'}}>
               <Toolbar>

                   <Typography variant="h6">
                       <Link style={{color: 'white', textDecoration: 'none', marginRight: window.innerWidth/50}} to="/"><img src={logo} style={{marginRight: 20}}/></Link>
                   </Typography>
               </Toolbar>
           </AppBar>

           <Route exact path="/" component={Login} />
           <Route path={'/signup'} component={Signup}/>
           <Route path={'/dog'} component={Dog}/>
           <Route path={'/confirm'} component={Confirm}/>
           <Route path={'/forgot'} component={PasswordReset}/>
           <Route path={'/reset'} component={Reset}/>
       </div>
    </HashRouter>
)


ReactDOM.render(
    routes,
  document.getElementById('root')
);
