'use strict';

import { styled } from '@mui/material';

const CardBreakPointTextSize = styled('span')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: '6vw',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '5vw',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '3vw',
  },
}));

export { CardBreakPointTextSize };
