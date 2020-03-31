import React, { Component } from 'react';
import './login.css';
import {Stitch, AnonymousCredential, RemoteMongoClient, UserPasswordCredential} from 'mongodb-stitch-browser-sdk'

import {Button, Grid, Box, Typography, TextField, Link, DialogTitle} from '@material-ui/core'

import logo from '../assets/app_logo.png'
import logo_big from '../assets/logo_big.png'
import logo_md from '../assets/logo_med.png'
import {Dialog} from "@material-ui/core";

class Login extends Component{

    constructor(props){
        super(props);
        this.state ={
            user: undefined,
            username: '',
            password: '',
            dialog: false
        };
    }

    showLoginDialog(){

        const handleClose = () =>{
            this.setState({dialog: false})
        }

        return(
            <Dialog open={this.state.dialog} onClose={handleClose} aria-labelledby={'login-dialog'} className={'login-dialog'}>
                    <DialogTitle id={'login-dialog-title'}>Login error</DialogTitle>
                    <Typography variant={'body2'} align={'center'} style={{padding: 10}}>
                        Incorrect username or password
                    </Typography>
                    <Button variant={'contained'} color={'primary'} style={{backgroundColor: '#667999', margin: 20}} onClick={handleClose}>
                        Ok</Button>
            </Dialog>
        )



    }

    showCopyrightInfo(){
        return(
            <Typography variant={"body2"} color={'textSecondary'} align={'center'}>
                {'Copyright © '}
                <Link color={"inherit"} href={'https://milo-rue.com'}>
                    Milo Rue
                </Link> {' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    componentDidMount(){

        const client = Stitch.getAppClient('muun-hizde');
        const mongodb = client.getServiceClient(
            RemoteMongoClient.factory,
            'muun-service'
        )

        console.log('Hit CDM')
    }


    handleUsername = (event) =>{

        this.setState({
            username: event.target.value
        });
    };

    handlePassword = (event) =>{

        this.setState({
            password: event.target.value
        })
    };

    handleLogin = () =>{
        const client = Stitch.getAppClient('muun-hizde')
        client.auth.loginWithCredential(new UserPasswordCredential(this.state.username, this.state.password))
            .then((user)=>{
            console.log('Login success for: ' + user.profile.email)
                this.props.history.push('/dog') // going to change to home
        })
            .catch(err =>{
                console.log('Login failure at ' + err)
                this.setState({dialog: true})
            })
    };

    handleCreateAccount = () =>{
        this.props.history.push('/signup')
    }

    render() {
        return (
            <Box style={{alignItems: 'stretch'}} className={'app'}>

                <Grid container spacing={3} style={{flexGrow: 1,}} alignContent={'stretch'}>

                    {/*Logo grid config*/}
                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <img src={logo_md} alt={'logo'}/>
                    </Grid>


                    {/*Username grid config*/}

                    <Grid item xs={1} sm={3} md={4} lg={4} xl={5}/>
                    <Grid item xs={10} sm={6} md={4} lg={4} xl={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'username-input'} label={"Username"} variant={'filled'} fullWidth={true} onChange={this.handleUsername}/>
                    </Grid>
                    <Grid item xs={1} sm={3} md={4} lg={4} xl={5}/>

                    {/*Password grid config*/}
                    <Grid item xs={1} sm={3} md={4} lg={4} xl={5}/>
                    <Grid item xs={10} sm={6} md={4} lg={4} xl={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'password-input'} label={"Password"} type={'password'} variant={'filled'} fullWidth={true} onChange={this.handlePassword}/>
                    </Grid>
                    <Grid item xs={1} sm={3} md={4} lg={4} xl={5}/>


                    {/*Login button grid config*/}
                    <Grid item xs={1} sm={3} md={4} lg={4} xl={5}/>
                    <Grid item xs={10} sm={6} md={4} lg={4} xl={2} style={{textAlign: 'center'}}>
                        <Button variant={'contained'} color={'primary'} style={{backgroundColor: '#667999'}} fullWidth={true} onClick={this.handleLogin}>Login</Button>
                    </Grid>
                    <Grid item xs={1} sm={3} md={4} lg={4} xl={5}/>

                    {/*Utility grid config*/}
                    <Grid item xs={1} sm={1} md={3} lg={4} xl={5}/>
                    <Grid item xs={5} sm={5} md={3} lg={2} xl={1} style={{textAlign: 'center'}}>
                        <Button style={{fontSize: 12}}>Forgot Password?</Button>
                    </Grid>

                    <Grid item xs={5} sm={5} md={3} lg={2} xl={1} style={{textAlign: 'center'}}>
                        <Button style={{fontSize: 12}} onClick={this.handleCreateAccount}>Don't have an Account?</Button>
                    </Grid>
                    <Grid item xs={1} sm={1} md={3} lg={4} xl={5}/>

                    <Grid item xs={12}>
                        {this.showCopyrightInfo()}
                    </Grid>


                </Grid>

                {this.showLoginDialog()}
            </Box>
        );
    }
}

export default Login;
