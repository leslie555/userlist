/*eslint-disable*/
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import Chip from '@material-ui/core/Chip';
// import DoneIcon from '@material-ui/icons/Done';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';


  const styles = theme => ({
    form: {
        margin: '0 auto',
        padding: '2rem 0.7rem',
        width: 400,
        maxWidth: '100%',

    },
    close:{
      
      float:'right',
      // marginLeft:345
    },
    line:{
      maxWidth:400,
    }
  })

class CreateUser extends React.Component{
  state = {
    open: false,
  };
  handleClose = () => {
    this.setState({ open: false })
  };

  handleOpen = () => {
    this.setState({ open: true })
  };

  handleChangeValue=(event,newValue)=>{
    const id=event.target.id;
    switch(id){
      case'name':{
        this.setState({
          'name':newValue
        });
        break;
      }

      case 'email':{
        this.setState({
          'email':newValue
        });
        break;
      }

      case 'website':{
        this.setState({
          'website':newValue
        });
        break;
      }
    }
  };

  handleOK=()=>{
    this.props.onOK(this.state);
    // this.props.dispatch({type:'users/create',payload:{}})
    this.setState({open:false});
  }


  render(){
    const {classes}=this.props;
    return (
    <div>
        <Button
          onClick={this.handleOpen}
        >
           {this.props.children}
        </Button>
        <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
          >
            Edit User
            <Fab size='small' className={classes.close}
            onClick={this.handleClose}
            ><CloseIcon /></Fab> 
          </DialogTitle>
          
          <DialogContent className={classes.form}>
              <TextField
                id="name"
                label="Name"
                  // className={classes.line}
                fullWidth
                // defaultValue={name}
                margin="normal"
                onChange={event=>{this.handleChangeValue(event,event.target.value)}}
              />

              <TextField
                id="email"
                label="Email"
                // className={classes.line}
                fullWidth
                // defaultValue="Hello World"
                margin="normal"
                onChange={event=>{this.handleChangeValue(event,event.target.value)}}
              />

              <TextField
                id="website"
                label="Website"
                fullWidth
                  // className={classes.line}
                type="password"
                autoComplete="current-password"
                margin="normal"
                onChange={event=>{this.handleChangeValue(event,event.target.value)}}
              />
            
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    取消
                </Button>
                <Button  color="primary" autoFocus onClick={this.handleOK}>
                    确定
                </Button>
            </DialogActions>
          </Dialog>
    </div>      
    )
  }

}

export default withStyles(styles)(CreateUser);
