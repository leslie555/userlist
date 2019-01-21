/*eslint-disable*/

import React from 'react';
import {connect} from 'dva';
import {PAGE_SIZE} from '../constants';
// import UserModal from './UserModal';
import { routerRedux } from 'dva/router';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import CreateOrEdit from './CreateOrEdit';
import green from '@material-ui/core/colors/green';

class TablePaginationActions extends React.Component{

handleNextPage=(event)=>{

  this.props.onChangePage(event,this.props.page+1);
};
handleBeforePage=event=>{
  this.props.onChangePage(event,this,props.page-1);
};

render (){
  const {page,count,classes,rowsPerPage}=this.props;
  return(
    <div style={{ color: green[500]}}>
      <IconButton 
        onClick={this.handleBeforePage}
        disabled={page===0}
        aria-label="First Page"
        >
        <KeyboardArrowLeft/>
      </IconButton>
      <IconButton 
        onClick={this.handleNextPage}
        disabled={page>=Math.ceil(count/rowsPerPage)}
        aria-label="Last Page"
        >
        <KeyboardArrowRight/>
      </IconButton>
    </div>
    )
}

}


let rowId=0;
class UsersComponent extends React.Component{

    state={open:false};
// function UsersComponent({list:dataSource,total,page:current}){
    handleDelete=(id)=>{
        this.props.dispatch({
          type: 'users/remove',
          payload: id,
        });
        this.setState({ open: false });
        };
    handleOpen = () => {
        this.setState({ open: true });
      };

    handleClose = () => {
        this.setState({ open: false });
      };
    pageChange=(page)=>{
        this.props.dispatch(routerRedux.push({
            pathname: '/users',
            query: { page },
        }))
      };
    handleCreate=()=>{
      const {name,email,website}=this.props;
      const values={
        name,email,website,
      };
      this.props.dispatch({
        type:'users/create',
        payload:values
      })
    };
    handleEdit = (props) => {
    const { name, email, website, id } = props;
    const values = {
      name: name,
      email: email,
      website: website,
    };
    this.props.dispatch({
      type: 'users/patch',
      payload: {
        id,
        values,
      }
    })
  };

  handleEditOpen=row=>{
    const{name,email,website,id}=row;
    this.setState({
      name,email,website,id
    })
  }


render(){
   const {list:dataSource,total,loading,page:current,rowsPerPage}=this.props;

   const emptyRows=rowsPerPage-Math.min(rowsPerPage,dataSource.length-current*rowsPerPage);
    return(
      <React.Fragment>
        <CreateOrEdit onOK={this.handleCreate}>
          Create User
        </CreateOrEdit>
        {loading && <CircularProgress size={68} style={{ color: green[500],
              position: 'absolute',
              top: '30%',
              left: '50%',
              zIndex: 1, }} 
      />}
      <Paper>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Website</TableCell>
                    <TableCell colSpan={2}>Operation</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {dataSource.map(row=>{
                    return (
                        <TableRow key={rowId++}>
                            <TableCell numeric>{row.name}</TableCell>
                            <TableCell numeric>{row.email}</TableCell>
                            <TableCell numeric>{row.website}</TableCell>
                            <TableCell numeric>
                              <CreateOrEdit onOk={this.handleEdit}  onClick={this.handleEditOpen(row)}>
                                  Edit
                              </CreateOrEdit>
                                
                              <Button onClick={this.handleOpen}>Delete</Button>
                                <Dialog
                                  open={this.state.open}
                                  onClose={this.handleClose}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                >
                                  <DialogTitle id="alert-dialog-title">"Confirm to delete?"</DialogTitle>
                                  <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                      cancel
                                    </Button>
                                    <Button onClick={this.handleDelete(row.id)} color="primary" autoFocus>
                                      ok
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                        )
                })}

                {emptyRows>0&&(
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={5} />
                  </TableRow>
                  )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                    colSpan={4}
                    ActionsComponent={TablePaginationActions}
                    count={total||0}
                    rowsPerPage={PAGE_SIZE}
                    page={current||0}
                    labelRowsPerPage={null}
                    rowsPerPageOptions={[]}
                    onChangePage={this.pageChange}
                />
              </TableRow>
            </TableFooter>
        </Table>
      </Paper>
     

    </React.Fragment>
        )
    }
}




 function mapStateToProps(store){
        const {list,total,page}=store.users;
        console.log('store',store.users);
        console.log('total',total);
        return {list,total,page,
             loading: store.loading.models.users,
        };
    }

export default connect(mapStateToProps)(UsersComponent);