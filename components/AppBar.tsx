'use strict';

import { useContext, memo } from 'react';
import React, { Box } from '@mui/material';

import { ColorModeContext } from '../lib/hooks/context/ColorModeContext';

import { theme } from '../src/theme';

import { IconWithMenu } from './IconWithMenu';
import { DarkLightMode } from './DarkLightMode';

import { allElementCenterStyle } from '../lib/muiStyle';

const AppBar = memo(() => {
  // NOTE:ColorModeContextで管理するmodeの変化によってbackgroundColorが変わるので呼び出す
  useContext(ColorModeContext);

  return (
    <Box
      sx={{
        ...allElementCenterStyle,
        height: '5vh',
        marginBottom: '5vh',
        backgroundColor: theme.palette.background.paper,
        top: 0,
        position: 'sticky',
      }}>
      <IconWithMenu />
      <DarkLightMode />
    </Box>
  );
});

if (process.env.NODE_ENV === 'development') {
  AppBar.displayName = 'AppBar';
}

export { AppBar };
