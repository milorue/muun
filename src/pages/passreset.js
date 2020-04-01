import React, {Component} from 'react';

import {Stitch, AnonymousCredentials, RemoteMongoClient, UserPasswordCredential, UserPasswordAuthProviderClient} from 'mongodb-stitch-browser-sdk'

import {Button, Grid, Box, Typography, TextField, Link, DialogTitle} from "@material-ui/core";

import logo from '../assets/app_logo.png'
import logo_md from '../assets/logo_med.png'
import {Dialog} from "@material-ui/core";

class PasswordReset extends Component{

    constructor(props) {
        super(props);
        this.state ={
            email: '',
            finished: false,
            dialog: false
        }
    }

    componentDidMount() {

    }

    showSentDialog(){
        const handleClose = () =>{
            this.setState({dialog: false})
            this.props.history.push('/')
        }

        return(
            <Dialog open={this.state.dialog} onClose={handleClose} aria-labelledby={'reset-dialog'} className={'reset-dialog'}>
                <DialogTitle id={'login-dialog-title'}>Password reset</DialogTitle>
                <Typography variant={'body2'} align={'center'} style={{padding: 10}}>
                    {'Password reset sent to ' + this.state.email}
                </Typography>
                <Button variant={'contained'} color={'primary'} style={{backgroundColor: '#667999', margin: 20}} onClick={handleClose}>
                    Ok</Button>
            </Dialog>
        )
    }

    validateEmail(address){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(address).toLowerCase());
    }

    handleReset = () =>{
        const client = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);

        if(this.state.email !== '' && this.validateEmail(this.state.email)){

            this.setState({
                dialog: true,
            });

            client.sendResetPasswordEmail(this.state.email).then(() => {
                this.setState({
                    dialog: true,
                    finished: true
                }).catch(err =>{
                    console.error(err)
                })
            })
        }

    };

    handleEmail = (event) =>{
        this.setState({
            email: event.target.value
        })
    }

    render(){
        return(
            <Box style={{alignItems: 'stretch'}} className={'app'}>
                <Grid container spacing={3} style={{flexGrow: 1,}} alignContent={'stretch'}>

                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <img src={logo_md} alt={'logo'}/>
                    </Grid>

                    <Grid item xs={1} sm={3} md={4} lg={4} xl={5}/>
                    <Grid item xs={10} sm={6} md={4} lg={4} xl={2} style={{textAlign: 'center'}}>
                        <TextField
                            id={'email-recover-input'} label={"Email address"} variant={'filled'} fullWidth={true} onChange={this.handleEmail}/>
                    </Grid>
                    <Grid item xs={1} sm={3} md={4} lg={4} xl={5}/>

                    <Grid item xs={1} sm={3} md={4} lg={4} xl={5}/>
                    <Grid item xs={10} sm={6} md={4} lg={4} xl={2} style={{textAlign: 'center'}}>
                        <Button variant={'contained'} color={'primary'} style={{backgroundColor: '#6D6699'}} fullWidth={true} onClick={this.handleReset}>Send Password Reset</Button>
                    </Grid>
                    <Grid item xs={1} sm={3} md={4} lg={4} xl={5}/>

                </Grid>

                {this.showSentDialog()}
            </Box>
        )
    }
}

export default PasswordReset