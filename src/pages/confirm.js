import React, {Component} from 'react';
import './confirm.css';

import {Stitch, UserPasswordCredential, UserPasswordAuthProviderClient} from 'mongodb-stitch-browser-sdk'

import {Typography, Button, Grid, Box, Link} from "@material-ui/core";

const url = window.location.search;
const params = new URLSearchParams(url);
const token = params.get('token');
const tokenId = params.get('tokenId');

import logo_md from '../assets/logo_med.png'

class Confirm extends Component{

    constructor(props) {
        super(props);
        this.state={
            accountConfirmed: false,
        }
    }

    componentDidMount() {
        this.confirmUser();
    }

    confirmUser(){
        Stitch.getAppClient('muun-hizde');

        const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);

        return emailPassClient.confirmUser(token, tokenId)
    }

    render() {
        return(
            <Box style={{alignItems: 'stretch'}} className={'app'}>

                <Grid container spacing={3} style={{flexGrow: 1,}} alignContent={'stretch'}>

                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <img src={logo_md} alt={'logo'}/>
                    </Grid>

                    <Grid item md={3}/>

                    <Grid item md={6}>
                        <Typography variant={'body2'} align={'center'}>
                            Your account has been confirmed
                        </Typography>
                    </Grid>

                    <Grid item md={3}/>

                </Grid>

            </Box>
        )
    }
}

export default Confirm