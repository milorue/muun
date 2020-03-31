import React, {Component} from 'react';
import './signup.css';
import {Stitch, RemoteMongoClient, UserPasswordCredential, UserPasswordAuthProviderClient} from 'mongodb-stitch-browser-sdk'

import {Button, Grid, Box, Typography, TextField, Link, DialogTitle} from "@material-ui/core";

import logo from '../assets/app_logo.png'
import logo_md from '../assets/logo_med.png'

class Signup extends Component{

    constructor(props) {
        super(props);
        this.state={
            fname: '',
            lname: '',
            username: '',
            email: '',
            password: '',
            cpassword: 's',
            confirmed: false,
            errorText: "Passwords don't match"
        }
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

    componentDidMount() {

    }

    confirmCredentials(){


        if(this.state.cpassword === this.state.password && this.state.username !== '' && this.state.password !== ''){
            this.setState({
                confirmed: true,
                errorText: "Matched"
            })
            console.log('confirmed password')
            if(this.validateEmail(this.state.email)){
                return true
            }
            else{
                console.log('invalid email')
                return false
            }
        }
        else{
            this.setState({
                confirmed: false,
                errorText: "Passwords don't match"
            })
            console.log("invalid password or don't match")
            return false
        }
    }

    validateEmail(address){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(address).toLowerCase());
    }

    handleLoginAccount = () =>{
        this.props.history.push('/muun/')
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
                    console.log('account success for: ' + this.state.email + 'with id: ')
                    this.handleLoginAccount;
                })
                .catch(err =>{
                    console.error('account error: ' + err)
                })
        }
        else{
            console.log('error creating account')
        }

    }

    render(){
        return(
            <Box style={{alignItems: 'stretch', minHeight: 200}} className={'container'}>

                <Grid container spacing={2} style={{flexGrow: 1}} alignContent={'stretch'}>

                    {/*Logo grid config*/}
                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <img src={logo_md} alt={'logo'}/>
                    </Grid>

                    {/*Name grid config*/}

                    <Grid item xs={false} sm={1} md={3} lg={4}/>
                    <Grid item xs={12} sm={5} md={3} lg={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'sign-up-fname-input'} label={"First Name"} variant={'filled'} fullWidth={true} onChange={this.handleFName}/>
                    </Grid>

                    <Grid item xs={12} sm={5} md={3} lg={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'sign-up-lname-input'} label={"Last Name"} variant={'filled'} fullWidth={true} onChange={this.handleLName}/>
                    </Grid>
                    <Grid item xs={false} sm={1} md={3} lg={4}/>


                    {/*Username grid config*/}

                    <Grid item xs={false} sm={1} md={3} lg={4}/>
                    <Grid item xs={12} sm={5} md={3} lg={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'sign-up-username-input'} label={"Username"} variant={'filled'} onChange={this.handleUsername} fullWidth={true}/>
                    </Grid>

                    <Grid item xs={12} sm={5} md={3} lg={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'sign-up-email-input'} label={"Email Address"} variant={'filled'} onChange={this.handleEmail} fullWidth={true}/>
                    </Grid>
                    <Grid item xs={false} sm={1} md={3} lg={4}/>

                    {/*Password grid config*/}
                    <Grid item xs={false} sm={1} md={3} lg={4}/>
                    <Grid item xs={12} sm={5} md={3} lg={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'sign-up-password-input'} label={"Password"} type={'password'} variant={'filled'} onChange={this.handlePassword} fullWidth={true}/>
                    </Grid>

                    <Grid item xs={12} sm={5} md={3} lg={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'sign-up-confirm-password-input'} helperText={this.state.errorText} label={"Confirm Password"} type={'password'} variant={'filled'} onChange={this.handleConfirmPassword} fullWidth={true}/>
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
                        <Button style={{fontSize: 12}}>Recover Lost Account</Button>
                    </Grid>

                    <Grid item xs={5} sm={5} md={3} lg={2} xl={1} style={{textAlign: 'center'}}>
                        <Button style={{fontSize: 12}} onClick={this.handleLoginAccount}>Already have an Account? Sign In</Button>
                    </Grid>
                    <Grid item xs={1} sm={1} md={3} lg={4} xl={5}/>

                    <Grid item xs={12}>
                        {this.showCopyrightInfo()}
                    </Grid>


                </Grid>
            </Box>
        )
    }


}

export default Signup