import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getPositions
} from './positionsSlice';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Positions() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const positions = useSelector(state => state.positions?.items);

  useEffect(() => {
      dispatch(getPositions());
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((row) => (
            <TableRow key={row.symbol}>
              <TableCell component="th" scope="row">
                {row.symbol}
              </TableCell>
              <TableCell align="right">{row.displayName}</TableCell>
              <TableCell align="right">{row.regularMarketPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>  );
}
