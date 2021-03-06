import React, { useEffect } from 'react';
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
import moment from 'moment';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Positions() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const positions = useSelector(state => state.positions?.items);

  useEffect(() => {
    dispatch(getPositions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Expire Date</TableCell>
            <TableCell align="right">Strike Price</TableCell>
            <TableCell align="right">Premium</TableCell>
            <TableCell align="right">Delta</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Dividend Date</TableCell>
            <TableCell align="right">Earnings Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((row) => (
            <TableRow key={row.symbol}>
              <TableCell component="th" scope="row">
                {row.symbol}
              </TableCell>
              <TableCell align="right">{row?.quote?.displayName ?? row?.quote?.shortName}</TableCell>
              <TableCell align="right">{moment(new Date(row?.expireDate)).format('MM/DD/YYYY')}</TableCell>
              <TableCell align="right">{row?.strike}</TableCell>
              <TableCell align="right">{row?.entryPremium}</TableCell>
              <TableCell align="right">{row?.entryDelta}</TableCell>
              <TableCell align="right">{row?.quote?.regularMarketPrice}</TableCell>
              <TableCell align="right">{moment(new Date(row?.quote?.dividendDate * 1000)).format('MM/DD/YYYY')}</TableCell>
              <TableCell align="right">{moment(new Date(row?.quote?.earningsTimestamp * 1000)).format('MM/DD/YYYY')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>  );
}
