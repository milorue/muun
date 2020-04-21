import React, {Component} from 'react';
import './home.css';
import {Stitch, RemoteMongoClient} from 'mongodb-stitch-browser-sdk'

import {Link} from 'react-router-dom'

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
    CardContent,
    ListItemAvatar,
    Avatar,
    TextField,
    Tooltip,
    DialogTitle,
    DialogActions,
    InputAdornment,
    CardActions,
    DialogContent
} from "@material-ui/core";

import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


import logo from '../assets/app_bar_variant.png'
import home_icon from '../assets/home_icon.png'
import group_icon from '../assets/group_icon.png'
import note_icon from '../assets/notepad_icon.png'
import alert_icon from '../assets/alert_icon.png'
import message_icon from '../assets/message_icon.png'
import setting_icon from '../assets/setting_icon.png'
import logout_icon from '../assets/logout_icon.png'
import notepad from '../assets/notepad.png'
import document_icon from '../assets/document_icon.png'
import group_banner from '../assets/groups.png'
import mun from '../assets/munTeam.png'



import banner from '../assets/banner.png'
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";

class Home extends Component{



    constructor(props){
        super(props);
        this.state={
            userData: {},

            user: undefined,
            userId: undefined,
            overviewImage: true,

            overviewSelected: true,
            notepadSelected: false,
            groupSelected: false,

            activeNoteName: 'Untitled Note',
            activeNoteContent: '',

            deleteNoteDialog: false,
            deletingNoteId: null,

            notes: undefined,
            groups: [
                {
                    name: 'IC MUN',
                    ownerName: 'Milo Rue',
                    ownerId: '',
                    ownerEmail: 'milorue@gmail.com',
                    admins: ['milorue@gmail.com', 'rightwaystudios@gmail.com'],
                    members: ['milorue@gmail.com', 'rightwaystudios@gmail.com'],
                    description: 'Ithaca College Model United Nations Club'
                },
                {
                    name: 'HNMUN 2021',
                    ownerName: 'Milo Rue',
                    ownerId: '',
                    ownerEmail: 'milorue@gmail.com',
                    admins: ['milorue@gmail.com', 'rightwaystudios@gmail.com'],
                    members: ['milorue@gmail.com', 'rightwaystudios@gmail.com'],
                    description: 'A group for Harvard Model United Nations Conference in Boston, MA in February of 2021'
                },
                {
                    name: 'CIAC',
                    ownerName: 'Milo Rue',
                    ownerId: '',
                    ownerEmail: 'milorue@gmail.com',
                    admins: ['milorue@gmail.com', 'rightwaystudios@gmail.com'],
                    members: ['milorue@gmail.com', 'rightwaystudios@gmail.com'],
                    description: 'A group for this years upcoming CIAC XI International Affairs Conference in October of 2021'
                }
            ],

            groupCreateDialog: false,
            creatingGroupName: 'Default Group',
            creatingGroupDesc: 'Default Description',
            creatingGroupMembers: [],
            memberIds: [],
            memberToBeAdded: '',


            drawerState: true,

            width: 800,
            height: 182,

            contentMargin: 200,

        }
    }

    updateDimensions(){
            let update_width  = window.innerWidth;
            let update_height = window.innerHeight
            this.setState({ width: update_width, height: update_height });
            if (update_width <= 600){
                this.setState({drawerState: false, contentMargin: 60})

            }else {
                this.setState({drawerState: true, contentMargin: 200})
            }
        }

    componentDidMount() {
        this.updateDimensions()
        window.addEventListener("resize", this.updateDimensions.bind(this));

        this.getUser();
        this.getData();
        this.loadNotes();
        this.loadGroups()
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }


    handleDrawerOpen = () =>{
        this.setState({ drawerState: true})
    }

    handleDrawerClose = () =>{
        this.setState({drawerState: false
        })
    }

    handleGroupClick = () =>{
        this.setState({overviewSelected: false, notepadSelected: false, groupSelected: true })
    }

    handleOverviewClick = () =>{
        this.setState({overviewSelected: true, notepadSelected: false, groupSelected: false}) // add more as buttons get added
        this.handleSaveNotes()
    };

    handleNotepadClick = () =>{
        this.setState({overviewSelected: false, notepadSelected: true, groupSelected: false})
    };

    handleNoteName = (event) =>{
        this.setState({
            activeNoteName: event.target.value
        })
    };

    handleMappedNotesContent = (event, index) => {

        this.setState(state =>{
            const list = state.notes.map((item, ind) =>{
                if(ind === index){
                    return item.noteContent = event.target.value
                }else{
                    return item.noteContent
                }
            })
            return {
                list
            }
        })
    };

    handleMappedNotesName = (event, index) =>{
        this.setState(state =>{
            const list = state.notes.map((item, ind) =>{
                if(ind === index){
                    return item.noteName = event.target.value
                }else{
                    return item.noteName
                }
            })
            return{
                list
            }
        })
    };

    handleSaveNotes = () =>{
        const client = Stitch.defaultAppClient;
        const mongoClient = client.getServiceClient(RemoteMongoClient.factory, 'muun-service');

        const db = mongoClient.db('muun')
        const notes = db.collection('notes')

        this.state.notes.map((item) =>{

            notes.findOneAndReplace({_id: item._id}, {userId: item.userId, noteName: item.noteName, noteContent: item.noteContent, date: item.date}).then(() =>{
                console.log('saved success')
                this.loadNotes()
            }).catch(err =>{
                console.warn(err)
            })


        })
    };

    handleDeleteNote = (noteId) => {
        const client = Stitch.defaultAppClient;
        const mongoClient = client.getServiceClient(RemoteMongoClient.factory, 'muun-service');

        const db = mongoClient.db('muun')
        const notes = db.collection('notes')

        notes.deleteOne({_id: noteId}).then(() =>{
            console.log('Deleted: '+ noteId)
            this.setState({deleteNoteDialog: false, deletingNoteId: null})
            this.loadNotes()
        }).catch(err =>{
            console.warn(err)
        })
    }

    handleStartDeleteNote = (noteId) =>{
        this.setState({deletingNoteId: noteId, deleteNoteDialog: true})
    }

    handleNewNote = () => {
        const client = Stitch.defaultAppClient;
        const mongoClient = client.getServiceClient(RemoteMongoClient.factory, 'muun-service');

        const db = mongoClient.db('muun')
        const notes = db.collection('notes')

        notes.insertOne({
            userId: client.auth.user.id,
            noteName: 'Untitled Note',
            noteContent: '',
            date: new Date(),
        }).then(() =>{
            this.loadNotes()
        })


    };

    handleNewGroupMember = (event) =>{
        this.setState({memberToBeAdded: event.target.value})
    }

    handleAddNewGroupMember = () => {
        if(this.state.memberToBeAdded !== ''){
            this.setState({creatingGroupMembers: [ ...this.state.creatingGroupMembers, this.state.memberToBeAdded]})


            const client = Stitch.defaultAppClient;
            const mongoClient =client.getServiceClient(RemoteMongoClient.factory, 'muun-service');
            const db = mongoClient.db('muun');
            const parity = db.collection('emailToId')

            parity.findOne({email: this.state.memberToBeAdded})
                .then(docs =>{
                    this.setState({memberIds: [...this.state.memberIds, docs.userId]})
                })



            this.setState({memberToBeAdded: ''});
        }

    }

    handleCreateGroupName = (event) =>{
        this.setState({ creatingGroupName: event.target.value})
    }

    handleCreateGroupDescription = (event) =>{
        this.setState({creatingGroupDesc: event.target.value})
    }


    handleNewGroup(groupName, groupDesc, members){

        const client = Stitch.defaultAppClient;

        const mongoClient =client.getServiceClient(RemoteMongoClient.factory, 'muun-service');

        const db = mongoClient.db('muun');
        const groups = db.collection('groups')

        const user = client.auth.user





        groups.insertOne(
            {
            owner: client.auth.user.id,
            ownerEmail: client.auth.user.profile.email,
            feed: [],
            members: members,
            moderators: [],
            alerts: [],
            name: groupName,
            description: groupDesc,
            avatar: null,
        }).then(() => {
            this.loadGroups()
            this.setState({groupCreateDialog: false, creatingGroupName: 'Default Group',
                creatingGroupDesc: 'Default Description', creatingGroupMembers: [user.profile.email], memberToBeAdded: '', memberIds: []})
        })
    };

    getUser(){
        const stitchClient = Stitch.defaultAppClient;

        if(stitchClient.auth.user.profile !== undefined){
            this.setState({
                user: stitchClient.auth.user.profile.email,
                userId: stitchClient.auth.user.id,
            })
        }

        else{
            console.log('')
            this.props.history.push('/')
        }


    };

    loadNotes(){
        const client = Stitch.defaultAppClient;
        const mongoClient = client.getServiceClient(RemoteMongoClient.factory,
            'muun-service')

        const db = mongoClient.db('muun')
        const notes = db.collection('notes')

        notes.find({userId: client.auth.user.id}, {sort: {date: -1}})
            .asArray()
            .then(docs => {
                this.setState({notes: docs})
                console.log('Loaded Notes')
            })
            .catch(err =>{
                console.warn(err)
            })
    };

    loadGroups(){
        const client = Stitch.defaultAppClient;
        const mongoClient = client.getServiceClient(RemoteMongoClient.factory,
            'muun-service')

        const db = mongoClient.db('muun')
        const groups = db.collection('groups')

        const email = client.auth.user.profile.email
        console.log(email)

        groups.find({members:  client.auth.user.id})
            .asArray()
            .then( docs =>{
                this.setState({
                    groups: docs
                })
                console.log(docs)
            })
            .catch( err =>{
                console.log('None found')
            })
    }

    loadOwnedGroups(){
        const client = Stitch.defaultAppClient

    }

    logoutUser = () =>{
        const stitchClient = Stitch.defaultAppClient;
        this.handleSaveNotes()
        this.setState({user: undefined});
        stitchClient.auth.logout();
        this.props.history.push('/')
    };

    getData(){
        const client = Stitch.defaultAppClient
        const mongoClient = client.getServiceClient(RemoteMongoClient.factory, 'muun-service')

        const email = client.auth.user.profile.email
        const user = client.auth.user

        const db = mongoClient.db('muun')
        const users = db.collection('userdata')
        users.findOne({email: email})
            .then(docs =>{
                this.setState({userData: docs})
                this.setState({creatingGroupMembers: [user.profile.email], memberIds: [user.id]})
            })
            .catch(err =>{
                console.warn(err)
            })

        const parity = db.collection('emailToId')
        parity.findOne({email: user.profile.email})
            .then(docs =>{
                if(docs === null){
                    parity.insertOne({
                        userId: user.id,
                        email: user.profile.email,
                    }).then(() =>{
                        console.log('added pairing')
                    })
                }
                else{
                    console.log('no pair needed')
                }
            })

    }

    showNoteDeleteDialog(){
        const handleClose = () =>{
            this.setState({deleteNoteDialog: false})
        }

        return(
            <Dialog open={this.state.deleteNoteDialog} onClose={handleClose} aria-labelledby={'delete-note-dialog'} className={'note-dialog'}>
                <DialogTitle id={'delete-note-title'}>Delete Note</DialogTitle>
                <Typography variant={'body2'} align={'center'} style={{padding: 10}}>
                    Are you sure you want to delete this note?
                </Typography>
                <DialogActions>
                    <Button variant={'contained'} color={'primary'} style={{backgroundColor: '#667999', margin: 20}} fullWidth={true} onClick={handleClose}>
                        Cancel</Button>
                    <Button variant={'contained'} color={'primary'} style={{backgroundColor: '#C84237', margin: 20}} fullWidth={true} onClick={() => this.handleDeleteNote(this.state.deletingNoteId)}>
                        Yes</Button>
                </DialogActions>



            </Dialog>
        )
    }

    showGroupCreateDialog(){
        const handleClose = () =>{
            this.setState({groupCreateDialog: false})
        }

        return(
            <Dialog open={this.state.groupCreateDialog} onClose={handleClose}>
                <AppBar style={{backgroundColor: '#667999'}}>
                    <Toolbar>
                        <Grid item container xs={6} direction={"row"} alignItems={"center"}>

                            <img src={logo} style={{marginRight: 10}}/>

                            <Typography variant={"h6"}>
                                Creating Group
                            </Typography>
                        </Grid>

                        <Grid item container xs={6} justify={"flex-end"}>
                            <Button variant={"contained"} color={"primary"} style={{backgroundColor: '#505151', marginRight: 10}} onClick={handleClose}>Cancel</Button>
                            <Button variant={"contained"} color={"primary"} style={{backgroundColor: '#609F8F'}} onClick={() => this.handleNewGroup(this.state.creatingGroupName, this.state.creatingGroupDesc, this.state.creatingGroupMembers)}>Confirm</Button>
                        </Grid>

                    </Toolbar>
                </AppBar>

                <DialogContent style={{height: this.state.height/2}}>
                    <Typography variant={"body2"} color={"textSecondary"} style={{marginBottom: 10}}>
                        Group Details
                    </Typography>
                    <TextField label={'Name'} variant={"filled"} fullWidth={true} style={{marginBottom: 20,}} onChange={this.handleCreateGroupName}/>
                    <TextField label={'Description'} variant={"filled"} fullWidth={true} multiline={true} rowsMax={5} rows={4} style={{marginBottom: 20,}}
                    onChange={this.handleCreateGroupDescription}/>

                    <Typography variant={"body2"} color={"textSecondary"} style={{marginBottom: 10}}>Members</Typography>

                    <List style={{backgroundColor: 'whitesmoke', borderRadius: 5, padding: 5, marginBottom: 20}}>
                        <Grid container item xs={12} justify={"flex-end"} alignItems={"center"} style={{marginBottom: 10}}>


                            <TextField id={'member-search-field'} variant={"outlined"} margin={"dense"}
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position={"start"}>
                                                   <PersonAddIcon style={{color: 'grey'}}/>
                                               </InputAdornment>
                                           )
                                       }} onChange={this.handleNewGroupMember}/>

                            <Tooltip title={'Add Member'}>
                                <Button variant={"contained"} style={{backgroundColor: '#799966', marginLeft: 10, height: 37}} color={"secondary"} onClick={this.handleAddNewGroupMember}><AddIcon/></Button>
                            </Tooltip>
                        </Grid>

                        <Divider/>
                        {this.renderCreateGroupMembers()}

                        <Divider style={{marginBottom: 10}}/>

                    </List>

                    <Button variant={"contained"} color={"primary"} style={{backgroundColor: '#609F8F'}}
                            onClick={() => this.handleNewGroup(this.state.creatingGroupName, this.state.creatingGroupDesc, this.state.memberIds)}>Confirm</Button>
                </DialogContent>


            </Dialog>
        )

    }

    renderCreateGroupMembers(){
        if(this.state.creatingGroupMembers !== [] || this.state.creatingGroupMembers !== undefined){
            return(this.state.creatingGroupMembers.map((member) =>{
                return(
                    <ListItem key={member}>
                        <ListItemIcon><PersonIcon/></ListItemIcon>
                        <ListItemText>{member}</ListItemText>
                    </ListItem>
                )
            }))
        }
    }

    renderSidebar(){

        if(this.state.drawerState) {
            return (
                <Grid item style={{backgroundColor: 'whitesmoke', position: "fixed", width: 200}} className={'column'}>
                    <Drawer>
                        <List>
                            <ListItem button key={'Overview'} selected={this.state.overviewSelected}
                                      onClick={this.handleOverviewClick}>
                                <ListItemIcon><img src={home_icon}/></ListItemIcon>
                                <ListItemText primary={'Overview'}/>
                            </ListItem>
                        </List>
                    </Drawer>
                    <List>

                        <ListItem button key={'Overview'} selected={this.state.overviewSelected}
                                  onClick={this.handleOverviewClick}>
                            <ListItemIcon><img src={home_icon}/></ListItemIcon>
                            <ListItemText primary={'Overview'}/>
                        </ListItem>

                        <ListItem button key={'Groups'} selected={this.state.groupSelected}
                        onClick={this.handleGroupClick}>
                            <ListItemIcon><img src={group_icon}/></ListItemIcon>
                            <ListItemText primary={'Groups'}/>
                        </ListItem>

                        <ListItem button key={'Notepad'} selected={this.state.notepadSelected}
                                  onClick={this.handleNotepadClick}>
                            <ListItemIcon><img src={note_icon}/></ListItemIcon>
                            <ListItemText primary={'Notepad'}/>
                        </ListItem>

                    </List>
                    <Divider/>
                    <List>

                        <ListItem button key={'Documents'}>
                            <ListItemIcon><img src={document_icon}/></ListItemIcon>
                            <ListItemText primary={'Documents'}/>
                        </ListItem>

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
        } else
            {
                return (
                    <Grid item xs={2} sm={4} md={2} style={{backgroundColor: 'whitesmoke', position: 'fixed', width: 60}} className={'column'}>
                        <Drawer>
                            <List>
                                <ListItem button key={'Overview'} selected={this.state.overviewSelected}
                                          onClick={this.handleOverviewClick}>
                                    <ListItemIcon><img src={home_icon}/></ListItemIcon>
                                </ListItem>
                            </List>
                        </Drawer>
                        <List>

                            <ListItem button key={'Overview'} selected={this.state.overviewSelected}
                                      onClick={this.handleOverviewClick}>
                                <ListItemIcon><img src={home_icon}/></ListItemIcon>
                            </ListItem>

                            <ListItem button key={'Groups'} selected={this.state.groupSelected}
                            onClick={this.handleGroupClick}>
                                <ListItemIcon><img src={group_icon}/></ListItemIcon>
                            </ListItem>

                            <ListItem button key={'Notepad'} selected={this.state.notepadSelected}
                                      onClick={this.handleNotepadClick}>
                                <ListItemIcon><img src={note_icon}/></ListItemIcon>
                            </ListItem>

                        </List>
                        <Divider/>
                        <List>

                            <ListItem button key={'Documents'}>
                                <ListItemIcon><img src={document_icon}/></ListItemIcon>
                            </ListItem>

                            <ListItem button key={'Alerts'}>
                                <ListItemIcon><img src={alert_icon}/></ListItemIcon>
                            </ListItem>

                            <ListItem button key={'Chat'}>
                                <ListItemIcon><img src={message_icon}/></ListItemIcon>
                            </ListItem>

                        </List>
                        <Divider/>
                        <List>

                            <ListItem button key={'Settings'}>
                                <ListItemIcon><img src={setting_icon}/></ListItemIcon>
                            </ListItem>

                            <ListItem button key={'Logout'} onClick={this.logoutUser}>
                                <ListItemIcon><img src={logout_icon}/></ListItemIcon>
                            </ListItem>

                            <ListItem style={{height: 700}}>

                            </ListItem>


                        </List>
                    </Grid>
                )
            }


    }

    renderOverviewContent(){
        return(
            <Grid container>

            <Grid item xs={12}>
                <Card style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
                    <CardContent style={{flexDirection: 'row'}}>
                        <Grid container spacing={1}>
                            <Grid item xs={11} md={3}>
                                <Typography variant={'body2'} color={"textSecondary"}>
                                    Overview
                                </Typography>
                                <Typography variant={'h4'} color={"textPrimary"} gutterBottom>
                                    {"Welcome, " + this.state.userData.fname}
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
                <Grid item xs={12} md={8}>

                    <Grid item xs={12}>
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

                    <Grid item xs={12}>
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

                    <Grid item xs={12}>
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
                <Grid item xs={12} md={4}>
                    <Card style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
                        <CardContent>
                            <Typography variant={"h6"} color={"textPrimary"} gutterBottom>
                                Messages
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
        )
    }

    renderGroupTab(){
        return(
            <Grid container>
                <Grid item xs={12}>
                    <Card style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
                        <CardContent>
                            <Grid container spacing={1}>

                                <Typography variant={"body2"} color={"textSecondary"}>Groups</Typography>

                                <Grid container item xs={12}>

                                    <Grid item xs={12} md={4} style={{marginBottom: 10}}>
                                        <Typography variant={"h5"} style={{marginTop: 5}}>
                                            {this.state.userData.fname + "'s Groups"}
                                        </Typography>
                                    </Grid>

                                    <Grid container item xs={12} md={8} justify={"flex-end"} style={{height: 40}}>
                                        <Button variant={"contained"} style={{backgroundColor: '#609F8F', marginRight: 10}} onClick={() => this.setState({groupCreateDialog: true})}>Create Group</Button>
                                        <Button variant={"contained"} style={{backgroundColor: '#575857', color: 'white'}}>Manage Groups</Button>
                                    </Grid>

                                </Grid>

                                <Grid container item xs={12} md={4} justify={'flex-start'}>
                                    <TextField fullWidth={true} id={'note-search-field'} variant={"filled"} label={'Search'} margin={"dense"}
                                               InputProps={{
                                                   startAdornment: (
                                                       <InputAdornment position={"start"}>
                                                           <SearchIcon style={{color: 'grey'}}/>
                                                       </InputAdornment>
                                                   )
                                               }}/>
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>

                    <Card style={{marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 5, backgroundColor: '#667999'}}>
                        <CardContent>
                            <Typography variant={"body"} style={{color: 'white', fontWeight: 'bold'}}>My Groups</Typography>
                        </CardContent>
                    </Card>

                    <Grid container>
                        {this.renderGroups()}
                    </Grid>

                </Grid>



            </Grid>
        )
    }

    renderGroups(){
        if(this.state.groups !== undefined){
            return(this.state.groups.map((groupInfo) =>{
                return(
                    <Grid item xs={12} md={6} lg={4} key={groupInfo._id}>
                        <Card style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
                            <CardContent>
                                <Typography variant={"body"} style={{marginBottom: 20}}>{groupInfo.name}</Typography>
                                <Divider style={{marginTop: 10, marginBottom: 10}}/>
                                <Typography variant={"body2"} color={"textSecondary"} style={{height: 50}}>{groupInfo.description}</Typography>
                            </CardContent>
                            {/*<div style={{textAlign: 'center'}}>*/}
                            {/*    <img src={group_banner} style={{alignContent: 'center', alignText: 'center', borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}/>*/}
                            {/*</div>*/}

                                <Divider/>
                                <CardActions>
                                    <Button variant={"contained"} style={{backgroundColor: '#609F8F'}}>View</Button>
                                    <Button variant={"contained"} style={{backgroundColor: '#575857', color: 'white'}}>Manage</Button>
                                    <Button variant={"contained"} style={{backgroundColor: '#AF5054'}}>Leave</Button>

                                </CardActions>
                        </Card>
                    </Grid>
                )

            }))
        }
    }

    renderNotepad(){
        return(
            <Grid container>



                <Grid item xs={12}>
                    <Card style={{marginLeft: 20, marginRight: 20, marginTop: 20,}}>
                        <CardContent>
                            <Typography variant={"body2"} color={"textSecondary"}>Notepad</Typography>
                            <Grid container alignItems={"center"} >
                                <Grid container item xs={12} lg={8}>
                                    <Typography variant={"h5"} style={{marginTop: 5}}>
                                        {this.state.userData.fname + "'s Notepad"}
                                    </Typography>
                                </Grid>
                                <Grid container item lg={4} xs={12} justify={"flex-end"} >

                                    <Tooltip title={'New Note'}>
                                        <Button variant={"contained"} style={{backgroundColor: '#799966', marginLeft: 10, marginTop: 10, height: 40}} color={"secondary"} onClick={this.handleNewNote}>New Note</Button>
                                    </Tooltip>
                                </Grid>

                                <Grid container item xs={12} md={4} justify={'flex-start'}>
                                <TextField fullWidth={true} id={'note-search-field'} variant={"filled"} label={'Search'} margin={"dense"} style={{marginTop: 20}}
                                           InputProps={{
                                               startAdornment: (
                                                   <InputAdornment position={"start"}>
                                                       <SearchIcon style={{color: 'grey'}}/>
                                                   </InputAdornment>
                                               )
                                           }}/>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {this.renderNotes()}

            </Grid>
        )
    }

    toInt(num){
        let out = num + 1
        return out
    }

    renderNotes(){
        if(this.state.notes !== undefined){
            return(this.state.notes.map((noteInfo, index) => {
                return(
                    <Grid item xs={12} key={noteInfo._id}>
                        <Card style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <Typography variant={'body2'} color={"textSecondary"}>
                                            {"Note: " + this.toInt(index)}
                                        </Typography>
                                    </Grid>

                                    <Grid container item xs={8} justify={"flex-end"}>
                                        <Tooltip title={'Delete Note'}>
                                            <Button variant={"contained"} style={{backgroundColor: '#AF5054', marginLeft: 5}} color={"secondary"} onClick={() => this.handleStartDeleteNote(noteInfo._id)}><DeleteOutlineIcon/></Button>
                                        </Tooltip>
                                        <Tooltip title={'Save Note'}>
                                            <Button variant={"contained"} style={{backgroundColor: '#667999', marginLeft: 5}} color={"secondary"} onClick={this.handleSaveNotes}><SaveAltIcon/></Button>
                                        </Tooltip>

                                    </Grid>
                                </Grid>

                                <TextField id={'active-note-name'} label={'Name'} variant={"standard"} defaultValue={noteInfo.noteName} style={{marginTop: 10, marginBottom: 10}} onChange={() => this.handleMappedNotesName(event, index)}/>
                                <Grid item xs={12}>
                                    <Grid item xs={12} style={{backgroundColor: 'whitesmoke', height: "inherit", padding: 10,}}>
                                        <TextField multiline fullWidth={true} variant={'filled'} className={'editor'} defaultValue={noteInfo.noteContent} rows={27} onChange={() => this.handleMappedNotesContent(event, index)}/>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>
                )
            }))
        }
    }

    render(){

        return(
            <div className={'container'} style={{flex: 'stretch'}}>
            <AppBar position={"fixed"} style={{backgroundColor: '#667999'}}>
                <Toolbar>

                    <Typography variant="h6">
                        <Link style={{color: 'white', textDecoration: 'none', marginRight: 8}} to="/home"><img src={logo} style={{marginTop: 10}}/></Link>
                    </Typography>

                    <Typography variant="h6">
                        <Link style={{color: 'white', textDecoration: 'none',}} to="/home">Muun</Link>
                    </Typography>
                </Toolbar>
            </AppBar>

                <Grid container spacing={1} className={'container'} style={{backgroundColor: 'whitesmoke', marginTop: 55}}>

                    {this.renderSidebar()}

                    {/*Content for rightmost area*/}

                    <Grid item xs={12} sm={12} md={12} style={{backgroundColor: 'lightgrey', marginLeft: this.state.contentMargin}} className={'column'}>



                        {/*Page Content*/}

                        {this.state.overviewSelected ? this.renderOverviewContent() :
                        null}


                        {this.state.notepadSelected ? this.renderNotepad() :
                        null}

                        {this.state.groupSelected ? this.renderGroupTab() : null}


                    </Grid>

                </Grid>

                {this.showNoteDeleteDialog()}
                {this.showGroupCreateDialog()}
            </div>
        )
    }
}

export default Home;