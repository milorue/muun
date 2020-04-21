import React, {Component} from 'react';
import './signup.css';
import {Stitch, RemoteMongoClient, UserPasswordCredential, UserPasswordAuthProviderClient} from 'mongodb-stitch-browser-sdk'

import {Button, Grid, Box, Typography, TextField, DialogTitle, Toolbar} from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";

import {Link} from 'react-router-dom'

import {Link as HyperLink} from '@material-ui/core'

import logoSmall from '../assets/app_bar_variant.png'
import logo from '../assets/app_logo.png'
import logo_md from '../assets/logo_med.png'
import AppBar from "@material-ui/core/AppBar";

class Signup extends Component{

    constructor(props) {
        super(props);
        this.state={
            fname: '',
            lname: '',
            username: '',
            email: '',
            password: '',
            cpassword: '',
            confirmed: false,

            confirmDialog: false,
            errorDialog: false,

            passwordError: "",
            usernameError: "",
            emailError: "",
            fNameError: '',
            lNameError: '',
        }
    }

    showConfirmDialog(){

        const handleClose = () =>{
            this.setState({confirmDialog: false})
        }

        return(
            <Dialog open={this.state.confirmDialog} onClose={handleClose} aria-labelledby={'confirm-account-dialog'} className={'account-dialog'}>
                <DialogTitle id={'account-dialog-title'}>Confirmation Email</DialogTitle>
                <Typography variant={'body2'} align={'center'} style={{padding: 10}}>
                    {'A confirmation email has been sent to ' + this.state.email}
                </Typography>
                <Button variant={'contained'} color={'primary'} style={{backgroundColor: '#667999', margin: 20}} onClick={handleClose}>
                    Ok</Button>
            </Dialog>
        )
    };

    showErrorDialog(){
        const handleClose = () =>{
            this.setState({errorDialog: false})
        }

        return(
            <Dialog open={this.state.errorDialog} onClose={handleClose} aria-labelledby={'error-account-dialog'} className={'error-dialog'}>
                <DialogTitle id={'account-error-title'}>Error</DialogTitle>
                <Typography variant={'body2'} align={'center'} style={{padding: 10}}>
                    There was an error when creating your account, please double check your information.
                </Typography>
                <Button variant={'contained'} color={'primary'} style={{backgroundColor: '#C84237', margin: 20}} onClick={handleClose}>
                    Close</Button>
            </Dialog>
        )
    }

    showCopyrightInfo(){
        return(
            <Typography variant={"body2"} color={'textSecondary'} align={'center'}>
                {'Copyright © '}
                <HyperLink color={"inherit"} href={'https://milo-rue.com'}>
                    Milo Rue
                </HyperLink> {' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    componentDidMount() {
        const client = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);

    };


    confirmCredentials() {

        this.validateUsername(this.state.username)
        this.validatePassword(this.state.password, this.state.cpassword)
        this.validateFName(this.state.fname)
        this.validateLName(this.state.lname)
        this.validateEmail(this.state.email)

        if (this.validateEmail(this.state.email) &&
            this.validatePassword(this.state.password, this.state.cpassword) &&
            this.validateUsername(this.state.username) && this.validateLName(this.state.lname) &&
            this.validateFName(this.state.fname)) {



            this.setState({
                confirmed: true,
            });
            return true
        }
        else{


            this.setState({
                confirmed: false,
            });
            this.setState({errorDialog: true})
            return false
        }
    }



    validateUsername(username){

        console.log(username.length)
        if(username.length < 4){
            this.setState({
                usernameError: "Username must be at least 4 characters long"
            })
            return false
        }
        else{
            this.setState({
                usernameError: ""
            })
            return true
        }
    }

    validatePassword(pass, cpass){
        if(pass !== cpass){
            this.setState({
                passwordError: "Passwords don't match",
            });

            return false
        }

        else if (pass.length <= 6 || cpass.length <= 6){
            this.setState({
                passwordError: "Passwords must be 6 characters or more"
            })
            return false
        }

        else{
            this.setState({
                passwordError: ""
            })
            return true
        }
    }

    validateEmail(address){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(address).toLowerCase())){
            this.setState({
                emailError: 'Invalid email address'
            })
            return true
        }
        else{
            this.setState({
                emailError: ''
            })
            return false
        }
    }

    validateFName(fName){
        if(fName === ''){
            this.setState({
                fNameError: 'Required'
            })
            return false
        }
        else{
            this.setState({
                fNameError: ''
            })
            return true
        }
    }

    validateLName(lName){
        if(lName === ''){
            this.setState({
                lNameError: 'Required'
            })
            return false
        }
        else{
            this.setState({
                lNameError: ''
            })
            return true
        }
    }

    handleLoginAccount = () =>{
        this.props.history.push('/')
    }

    handleUsername = (event) =>{
        this.setState({
            username: event.target.value
        })
    };

    handlePassword = (event) =>{
        this.setState({
            password: event.target.value
        })
    }

    handleConfirmPassword = (event) =>{
        this.setState({
            cpassword: event.target.value
        })
        this.componentDidMount();
    };

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    };

    handleLName = (event) =>{
        this.setState({
            lname: event.target.value
        })
    };

    handleFName = (event) =>{
        this.setState({
            fname: event.target.value
        })
    };

    handleCreateAccount = () =>{
        const client = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);

        if(this.confirmCredentials()){
            console.log('creating account')
            client.registerWithEmail(this.state.email, this.state.password)
                .then(() =>{
                    console.log('account success for: ' + this.state.email)
                    this.handleUserData()
                    this.setState({confirmDialog: true}) // sets confirmation dialog visible
                })
                .catch(err =>{
                    console.error('account error: ' + err)
                    this.setState({errorDialog: true})
                })
        }
        else{
            console.log('error creating account')
        }

    };

    handleUserData(){

        const app = Stitch.defaultAppClient
        app.auth.loginWithCredential(new UserPasswordCredential('signin', 'muunservicesignup')) // needs to be hidden in production
            .then(() =>{
                const client = Stitch.defaultAppClient
                const mongoClient = client.getServiceClient(RemoteMongoClient.factory,
                    'muun-service')

                const db = mongoClient.db('muun')
                const users = db.collection('userdata')
                users.insertOne({
                    email: this.state.email,
                    fname: this.state.fname,
                    lname: this.state.lname,
                    username: this.state.username,
                    accountCreated: new Date(),
                })
                    .then(()=>{
                        app.auth.logout();
                    })
                    .catch(err =>{
                        console.error(err)
                    })
            })



    }

    handleForgotten = () =>{
        this.props.history.push('/forgot')
    }

    showDialog = () =>{
        this.setState({
            confirmDialog: true,
        })
    }

    render(){
        return(
            <div>

                <AppBar position={"sticky"} style={{backgroundColor: '#667999'}}>
                    <Toolbar>

                        <Typography variant="h6">
                            <Link style={{color: 'white', textDecoration: 'none', marginRight: 8}} to="/"><img src={logoSmall} style={{marginTop: 10}}/></Link>
                        </Typography>

                        <Typography variant="h6">
                            <Link style={{color: 'white', textDecoration: 'none',}} to="/">Muun</Link>
                        </Typography>
                    </Toolbar>
                </AppBar>

            <Box style={{alignItems: 'stretch'}} className={'container'}>

                <Grid container spacing={2} style={{flexGrow: 1}} alignContent={'stretch'}>

                    {/*Logo grid config*/}
                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <img src={logo_md} alt={'logo'}/>
                    </Grid>

                    {/*Name grid config*/}

                    <Grid item xs={false} sm={1} md={3} lg={4}/>
                    <Grid item xs={12} sm={5} md={3} lg={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'sign-up-fname-input'} helperText={this.state.fNameError} label={"First Name"} variant={'filled'} fullWidth={true} onChange={this.handleFName}/>
                    </Grid>

                    <Grid item xs={12} sm={5} md={3} lg={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'sign-up-lname-input'} helperText={this.state.lNameError} label={"Last Name"} variant={'filled'} fullWidth={true} onChange={this.handleLName}/>
                    </Grid>
                    <Grid item xs={false} sm={1} md={3} lg={4}/>


                    {/*Username grid config*/}

                    <Grid item xs={false} sm={1} md={3} lg={4}/>
                    <Grid item xs={12} sm={5} md={3} lg={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'sign-up-username-input'} helperText={this.state.usernameError} label={"Username"} variant={'filled'} onChange={this.handleUsername} fullWidth={true}/>
                    </Grid>

                    <Grid item xs={12} sm={5} md={3} lg={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'sign-up-email-input'} helperText={this.state.emailError} label={"Email Address"} variant={'filled'} onChange={this.handleEmail} fullWidth={true}/>
                    </Grid>
                    <Grid item xs={false} sm={1} md={3} lg={4}/>

                    {/*Password grid config*/}
                    <Grid item xs={false} sm={1} md={3} lg={4}/>
                    <Grid item xs={12} sm={5} md={3} lg={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'sign-up-password-input'} helperText={this.state.passwordError} label={"Password"} type={'password'} variant={'filled'} onChange={this.handlePassword} fullWidth={true}/>
                    </Grid>

                    <Grid item xs={12} sm={5} md={3} lg={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'sign-up-confirm-password-input'} helperText={this.state.passwordError} label={"Confirm Password"} type={'password'} variant={'filled'} onChange={this.handleConfirmPassword} fullWidth={true}/>
                    </Grid>
                    <Grid item xs={false} sm={1} md={3} lg={4}/>


                    {/*Login button grid config*/}
                    <Grid item xs={1} sm={3} md={4} lg={4} xl={5}/>
                    <Grid item xs={10} sm={6} md={4} lg={4} xl={2} style={{textAlign: 'center'}}>
                        <Button variant={'contained'} color={'primary'} style={{backgroundColor: '#667999'}} onClick={this.handleCreateAccount} fullWidth={true}>Create Account</Button>
                    </Grid>
                    <Grid item xs={1} sm={3} md={4} lg={4} xl={5}/>

                    {/*Utility grid config*/}
                    <Grid item xs={1} sm={1} md={3} lg={4} xl={5}/>
                    <Grid item xs={5} sm={5} md={3} lg={2} xl={1} style={{textAlign: 'center'}}>
                        <Button style={{fontSize: 12}} onClick={this.handleForgotten}>Forgot Password?</Button>
                    </Grid>

                    <Grid item xs={5} sm={5} md={3} lg={2} xl={1} style={{textAlign: 'center'}}>
                        <Button style={{fontSize: 12}} onClick={this.handleLoginAccount}>Already have an Account? Sign In</Button>
                    </Grid>
                    <Grid item xs={1} sm={1} md={3} lg={4} xl={5}/>

                    <Grid item xs={12}>
                        {this.showCopyrightInfo()}
                    </Grid>

                </Grid>

                {this.showConfirmDialog()}
                {this.showErrorDialog()}
            </Box>
            </div>
        )
    }


}

export default Signup