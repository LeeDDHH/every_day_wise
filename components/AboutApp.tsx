'use strict';

import Link from 'next/link';
import { Link as MUILink } from '@mui/material';
import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { allElementCenterStyle, noneUnderLineATagStyle } from '../lib/muiStyle';

const AboutApp = memo(() => {
  return (
    <Box sx={allElementCenterStyle}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h2" gutterBottom>
          アプリについて
        </Typography>
        <Typography variant="h5">毎日名言・格言を1つ表示します</Typography>
        <Typography gutterBottom>
          ※日付が変わったら、他の名言・格言を表示します
        </Typography>
        <Typography variant="h5" gutterBottom>
          全体の名言・格言が見たい場合は
          <Link href="/wiseList">
            <a>こちら</a>
          </Link>
          から見れます
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: '5vh' }}>
          アプリに関するお問い合わせは
          <MUILink
            sx={noneUnderLineATagStyle}
            href="https://twitter.com/camomile_cafe">
            Twitter
          </MUILink>
          もしくは、
          <MUILink
            sx={noneUnderLineATagStyle}
            href="mailto:niche3600@gmail.com">
            メール
          </MUILink>
          で お願いします
        </Typography>
        <Typography variant="h2" gutterBottom>
          作った人について
        </Typography>
        <Typography variant="h5" gutterBottom>
          都内でエンジニアをしています
        </Typography>
        <MUILink sx={noneUnderLineATagStyle} href="https://github.com/LeeDDHH">
          Github
        </MUILink>
        <MUILink
          sx={noneUnderLineATagStyle}
          href="https://twitter.com/camomile_cafe">
          Twitter
        </MUILink>
      </Box>
    </Box>
  );
});

if (process.env.NODE_ENV === 'development') {
  AboutApp.displayName = 'AboutApp';
}

export { AboutApp };
