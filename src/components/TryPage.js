/*eslint-disable*/
import React from 'react';
import {connect} from 'dva';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


function TryPage(){

  return(
    <Table>
      <TableHead>
          <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Website</TableCell>
              <TableCell colSpan={2}>Operation</TableCell>
          </TableRow>
      </TableHead>
    </Table>

    )
}

export default TryPage;


