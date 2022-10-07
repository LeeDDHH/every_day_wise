'use strict';

import type { NextPage } from 'next';
import React from 'react';
import { Box } from '@mui/material';

import { AppBar } from './AppBar';

type Props = { children: React.ReactNode };

const BasicLayout: NextPage<Props> = ({ children }) => {
  return (
    <Box>
      <AppBar />
      {children}
    </Box>
  );
};

export default BasicLayout;
