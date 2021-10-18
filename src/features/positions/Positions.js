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
import numeral from 'numeral'

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
            <TableCell align="right">Shares Owned</TableCell>
            <TableCell align="right">Cost Basis</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Gain %</TableCell>
            <TableCell align="right">Expire Date</TableCell>
            <TableCell align="right">Strike Price</TableCell>
            <TableCell align="right">Premium</TableCell>
            <TableCell align="right">Delta</TableCell>
            <TableCell align="right">Ex Div Date</TableCell>
            <TableCell align="right">Earnings Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            positions.map((row) => {
              const p = new Position(row);
              return (
                <TableRow key={p.symbol}>
                  <TableCell component="th" scope="row">
                    {p.symbol}
                  </TableCell>
                  <TableCell align="right">{p.quote?.displayName ?? p.quote?.shortName}</TableCell>
                  <TableCell align="right">{p?.sharesOwned}</TableCell>
                  <TableCell align="right">{formatPrice(p?.costBasis)}</TableCell>
                  <TableCell align="right">{formatPrice(p?.currentPrice)}</TableCell>
                  <TableCell align="right">{formatPct(p?.gainPct)}</TableCell>
                  <TableCell align="right">{formatDate(p?.expireDate)}</TableCell>
                  <TableCell align="right">{formatPrice(p?.strike)}</TableCell>
                  <TableCell align="right">{p?.entryPremium}</TableCell>
                  <TableCell align="right">{p?.entryDelta}</TableCell>
                  <TableCell align="right">{formatDate(p?.exDivDate)}{p?.isEstimatedExDivDate ? ' *' : ''}</TableCell>
                  <TableCell align="right">{formatDate(p?.ticker?.earningsDate)}</TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </TableContainer>  );
}

class Position {
  constructor(position) {
    this.position = position;
  }

  get quote() {
    return this.position?.quote;
  }

  get ticker() {
    return this.position?.ticker;
  }

  get symbol() {
    return this.position?.symbol;
  }

  get currentPrice() {
    return this.position?.quote?.regularMarketPrice;
  }

  get sharesOwned() {
    return this.position?.sharesOwned;
  }

  get costBasis() {
    return this.position?.costBasis;
  }

  get gainPct() {
    return (this.position?.quote?.regularMarketPrice - this.position?.costBasis) / this.position?.costBasis;
  }

  get exDivDate() {
    const exDate = this.position?.ticker?.exDividendDate;
    if (this.isEstimatedExDivDate) {
      // return "estimated";
      return moment(exDate).add(90, 'days').toDate();
    }
    return exDate;
  }

  get isEstimatedExDivDate() {
    return moment().isAfter(this.position?.ticker?.exDividendDate);
  }
}

function formatPrice(val) {
  return numeral(val).format('0,0.00');
}

function formatDate(val) {
  return moment(val).format('MM/DD/YYYY');
}

function formatPct(val) {
  return numeral(val).format('0,0.0%');
}