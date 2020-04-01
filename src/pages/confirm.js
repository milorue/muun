import React, {Component} from 'react';
import './confirm.css';

import {Stitch, UserPasswordCredential, UserPasswordAuthProviderClient} from 'mongodb-stitch-browser-sdk'

import {Typography, Button, Grid, Box, Link} from "@material-ui/core";



import logo_md from '../assets/logo_med.png'

class Confirm extends Component{

    constructor(props) {
        super(props);
        this.state={
            accountConfirmed: false,
        }
    }

    componentDidMount() {
        const url = this.props.location.search;
        const params = new URLSearchParams(url);
        const token = params.get('token');
        const tokenId = params.get('tokenId');
        this.confirmUser(token, tokenId).then(()=>{
            this.setState({accountConfirmed: true})
        }).catch(err =>{
            this.setState({accountConfirmed: false})
            console.error(err)
        })
    }

    confirmUser(token, tokenId){
        Stitch.getAppClient('muun-hizde');

        const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);

        console.log(token);
        console.log(tokenId);

        return emailPassClient.confirmUser(token, tokenId)
    }

    handleLogin = () =>{
        this.props.history.push('/')
    };

    accountText(){
        if(this.state.accountConfirmed){
            return(
                <Typography variant={'body2'} align={'center'} style={{backgroundColor: 'lightgrey', borderRadius: 5, padding: 20}}>
                    Your account has been confirmed
                </Typography>
            )
        }
        else{
            return(
                <Typography variant={'body2'} align={'center'} style={{backgroundColor: 'lightgrey', borderRadius: 5, padding: 20}}>
                    There was an error in confirming your account
                </Typography>
            )
        }
    }

    render() {
        return(
            <Box style={{alignItems: 'stretch'}} className={'app'}>

                <Grid container spacing={3} style={{flexGrow: 1,}} alignContent={'stretch'}>

                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <img src={logo_md} alt={'logo'}/>
                    </Grid>

                    <Grid item xs={1} md={4}/>

                    <Grid item xs={10} md={4}>
                        {this.accountText()}
                    </Grid>

                    <Grid item xs={1} md={4}/>

                    <Grid item xs={3} md={5}/>
                    <Grid item xs={6} md={2}>
                        <Button style={{backgroundColor: '#667999'}} color={'primary'} onClick={this.handleLogin} variant={'contained'} fullWidth={true}>Return to Login</Button>
                    </Grid>
                    <Grid item xs={3} md={5}/>

                </Grid>

            </Box>
        )
    }
}

export default Confirm