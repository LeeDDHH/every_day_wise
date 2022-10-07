'use strict';

import type { NextPage } from 'next';
import React, { memo } from 'react';
import { Box } from '@mui/material';

import BasicLayout from '../components/BasicLayout';
import { AboutApp } from '../components/AboutApp';

import { allElementCenterStyle } from '../lib/muiStyle';

const About: NextPage = () => {
  return (
    <BasicLayout>
      <Box sx={allElementCenterStyle}>
        <AboutApp />
      </Box>
    </BasicLayout>
  );
};

if (process.env.NODE_ENV === 'development') {
  About.displayName = 'About';
}

export default memo(About);
