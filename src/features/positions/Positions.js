import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getPositions
} from './positionsSlice';

export default function Positions() {
  const dispatch = useDispatch();
  const positions = useSelector(state => state.positions?.items);

  useEffect(() => {
      dispatch(getPositions());
  }, []);

  return (
    <div>
        Positions {positions?.length}
    </div>
  );
}
