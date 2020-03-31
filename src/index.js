import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, Link, BrowserRouter} from 'react-router-dom'
import Login from "./pages/login";
import {Dog, Cat} from './pages/components'
import Signup from "./pages/signup";

import logo from './assets/app_logo.png'

// libraries for backend
import {Stitch} from 'mongodb-stitch-browser-sdk'

// libraries for components & design
import AppBar from "@material-ui/core/AppBar";
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';


Stitch.initializeDefaultAppClient('muun-hizde');

const routes = (
    <BrowserRouter>
       <div>
           <AppBar position={'relative'} style={{marginBottom: 30, backgroundColor: '#667999'}}>
               <Toolbar>

                   <Typography variant="h6">
                       <Link style={{color: 'white', textDecoration: 'none', marginRight: window.innerWidth/50}} to="/muun/"><img src={logo} style={{marginRight: 20}}/></Link>
                   </Typography>
               </Toolbar>
           </AppBar>

           <Route exact path="/muun/" component={Login} />
           <Route path={'/muun/signup'} component={Signup}/>
           <Route path={'/muun/dog'} component={Dog}/>
       </div>
    </BrowserRouter>
)


ReactDOM.render(
    routes,
  document.getElementById('root')
);
