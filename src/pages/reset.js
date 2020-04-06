import React, {Component} from 'react';

import {Stitch, UserPasswordCredential, UserPasswordAuthProviderClient} from 'mongodb-stitch-browser-sdk'

import {Typography, Button, Grid, Box, Link, TextField} from "@material-ui/core";



import logo_md from '../assets/logo_med.png'

class Reset extends Component{

    constructor(props) {
        super(props);
        this.state={
            accountReset: false,
            password: '',
            cpassword: '',

        }
    };

    componentDidMount() {


    };

    resetUser(){
        const url = this.props.location.search;
        const params = new URLSearchParams(url);
        const token = params.get('token');
        const tokenId = params.get('tokenId');
        Stitch.getAppClient('muun-hizde');

        const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);

        console.log(token);
        console.log(tokenId);

        if(this.state.password.length >= 6 && this.state.password === this.state.cpassword){  // checks for password need to be passed to dialog at some point
            return emailPassClient.resetPassword(token, tokenId, this.state.password).then(() => {
                console.log("Successfully reset password!");
                this.props.history.push('/')
            }).catch(err => {
                console.log("Error resetting password:", err);
            });
        }

        else{
            console.log('Password invalid length')
        }


    };

    handlePassword = (event) =>{
        this.setState({
            password: event.target.value
        })
    };

    handleCPassword = (event) =>{
        this.setState({
            cpassword: event.target.value
        })
    }

    handleLogin = () =>{
        this.resetUser();
        this.props.history.push('/')
    };


    render() {
        return(
            <Box style={{alignItems: 'stretch'}} className={'app'}>

                <Grid container spacing={3} style={{flexGrow: 1,}} alignContent={'stretch'}>

                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <img src={logo_md} alt={'logo'}/>
                    </Grid>

                    <Grid item xs={1} sm={3} md={4} lg={4} xl={5}/>
                    <Grid item xs={10} sm={6} md={4} lg={4} xl={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'password-reset-input'} label={"New password"} type={'password'} variant={'filled'} fullWidth={true} onChange={this.handlePassword}/>
                    </Grid>
                    <Grid item xs={1} sm={3} md={4} lg={4} xl={5}/>

                    <Grid item xs={1} sm={3} md={4} lg={4} xl={5}/>
                    <Grid item xs={10} sm={6} md={4} lg={4} xl={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'password-confirm-reset-input'} label={"Confirm new password"} type={'password'} variant={'filled'} fullWidth={true} onChange={this.handleCPassword}/>
                    </Grid>
                    <Grid item xs={1} sm={3} md={4} lg={4} xl={5}/>

                    <Grid item xs={3} md={5}/>
                    <Grid item xs={6} md={2}>
                        <Button style={{backgroundColor: '#667999'}} color={'primary'} onClick={this.handleLogin} variant={'contained'} fullWidth={true}>Reset Password</Button>
                    </Grid>
                    <Grid item xs={3} md={5}/>

                </Grid>

            </Box>
        )
    }
}

export default Reset