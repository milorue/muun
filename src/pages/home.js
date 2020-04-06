import React, {Component} from 'react';
import './home.css';
import {Stitch, UserPasswordCredential, RemoteMongoClient} from 'mongodb-stitch-browser-sdk'

import {
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Drawer,
    Divider,
    Typography,
    Box,
    Grid,
    Card,
    CardContent, ListItemAvatar, Avatar
} from "@material-ui/core";

import logo from '../assets/app_bar_variant.png'
import home_icon from '../assets/home_icon.png'
import group_icon from '../assets/group_icon.png'
import note_icon from '../assets/notepad_icon.png'
import alert_icon from '../assets/alert_icon.png'
import message_icon from '../assets/message_icon.png'
import setting_icon from '../assets/setting_icon.png'
import logout_icon from '../assets/logout_icon.png'

import banner from '../assets/banner.png'


class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            user: undefined,
            userId: undefined,
            overviewImage: true,
        }
    }

    componentDidMount() {
        console.log(this.props.history)
        this.getUser();
    }

    getUser(){
        const stitchClient = Stitch.defaultAppClient;
        console.log(stitchClient.auth.user.profile.email);
        console.log(stitchClient.auth.user.id);
        this.setState({
            user: stitchClient.auth.user.profile.email,
            userId: stitchClient.auth.user.id,
        })
    }

    logoutUser = () =>{
        const stitchClient = Stitch.defaultAppClient;
        this.setState({user: undefined});
        stitchClient.auth.logout();
        this.props.history.push('/')
    }

    renderSidebar(){
        return(
            <Grid item xs={4} sm={4} md={2} style={{backgroundColor: 'whitesmoke'}}>
                <List>

                    <ListItem button key={'Overview'}>
                        <ListItemIcon><img src={home_icon}/></ListItemIcon>
                        <ListItemText primary={'Overview'}/>
                    </ListItem>

                    <ListItem button key={'Groups'}>
                        <ListItemIcon><img src={group_icon}/></ListItemIcon>
                        <ListItemText primary={'Groups'}/>
                    </ListItem>

                    <ListItem button key={'Notepad'}>
                        <ListItemIcon><img src={note_icon}/></ListItemIcon>
                        <ListItemText primary={'Notepad'}/>
                    </ListItem>

                </List>
                <Divider/>
                <List>

                    <ListItem button key={'Alerts'}>
                        <ListItemIcon><img src={alert_icon}/></ListItemIcon>
                        <ListItemText primary={'Alerts'}/>
                    </ListItem>

                    <ListItem button key={'Chat'}>
                        <ListItemIcon><img src={message_icon}/></ListItemIcon>
                        <ListItemText primary={'Chat'}/>
                    </ListItem>

                </List>
                <Divider/>
                <List>

                    <ListItem button key={'Settings'}>
                        <ListItemIcon><img src={setting_icon}/></ListItemIcon>
                        <ListItemText primary={'Settings'}/>
                    </ListItem>

                    <ListItem button key={'Logout'} onClick={this.logoutUser}>
                        <ListItemIcon><img src={logout_icon}/></ListItemIcon>
                        <ListItemText primary={'Logout'}/>
                    </ListItem>

                    <ListItem style={{height: 700}}>

                    </ListItem>


                </List>
            </Grid>
        )
    }

    renderGM(){
        return(
            <Grid container>
                <Grid item xs={12} md={8}>
                    <Card style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
                        <CardContent>
                            <Typography variant={"h6"} color={"textPrimary"} gutterBottom>
                                Groups
                            </Typography>
                            <Typography variant={"body2"} color={"textPrimary"}>
                                No groups currently
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
                        <CardContent>
                            <Typography variant={"h6"} color={"textPrimary"} gutterBottom>
                                Messages
                            </Typography>
                            <Typography variant={"body2"} color={"textPrimary"}>
                                No new messages
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }

    render(){
        return(
            <Box className={'container'}>
                <Grid container spacing={1}>

                    {this.renderSidebar()}

                    {/*Content for rightmost area*/}

                    <Grid item xs={8} sm={8} md={10} style={{backgroundColor: 'lightgrey', flexGrow: 1}} >

                        <Grid item xs={12}>
                            <Card style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
                                <CardContent style={{flexDirection: 'row'}}>
                                    <Grid container spacing={1}>
                                    <Grid item xs={11} md={3}>
                                        <Typography variant={'body2'} color={"textSecondary"}>
                                            Overview
                                        </Typography>
                                        <Typography variant={'h4'} color={"textPrimary"} gutterBottom>
                                            {"Welcome, " + this.state.user}
                                        </Typography>
                                        <Typography variant={"body2"} color={"textPrimary"}>
                                            Here's an overview of your account
                                        </Typography>
                                        <Button variant={"contained"} style={{marginTop: 10}}>
                                            Get started
                                        </Button>
                                    </Grid>
                                    <Grid item xs={1} md={9} style={{textAlign: 'center'}}>
                                        <img src={banner} style={{margin: 5}}/>
                                    </Grid>
                                    </Grid>

                                </CardContent>

                            </Card>
                        </Grid>

                        {/*groups message content*/}

                        {this.renderGM()}

                        <Grid container>
                            <Grid item xs={12} md={8}>
                                <Card style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
                                    <CardContent>
                                        <Typography variant={"h6"} color={"textPrimary"} gutterBottom>
                                            Alerts
                                        </Typography>
                                        <Typography variant={"body2"} color={"textPrimary"}>
                                            No new alerts
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <Card style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
                                    <CardContent>
                                        <Typography variant={"h6"} color={"textPrimary"} gutterBottom>
                                            Documents
                                        </Typography>
                                        <List>
                                            <ListItem button key={'change'} style={{backgroundColor: 'whitesmoke', marginTop: 5}}>
                                                <ListItemAvatar>
                                                    <Avatar alt={'Milo Rue'} style={{backgroundColor: '#799966'}}>MR</Avatar>
                                                </ListItemAvatar>
                                                <ListItemText secondary={"02-06-2020"} primary={'Directive Bane Effect 2.0'}/>
                                            </ListItem>

                                            <ListItem button key={'changes'} style={{backgroundColor: 'whitesmoke', marginTop: 5}}>
                                                <ListItemAvatar>
                                                    <Avatar alt={'Milo Rue'} style={{backgroundColor: '#799966'}}>MR</Avatar>
                                                </ListItemAvatar>
                                                <ListItemText secondary={"02-06-2020"} primary={'Directive Bane Effect 2.0'}/>
                                            </ListItem>

                                            <ListItem button key={'changez'} style={{backgroundColor: 'whitesmoke', marginTop: 5}}>
                                                <ListItemAvatar>
                                                    <Avatar alt={'Milo Rue'} style={{backgroundColor: '#799966'}}>MR</Avatar>
                                                </ListItemAvatar>
                                                <ListItemText secondary={"02-06-2020"} primary={'Directive Bane Effect 2.0'}/>
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>


                    </Grid>

                </Grid>
            </Box>
        )
    }
}

export default Home