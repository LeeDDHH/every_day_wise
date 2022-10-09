'use strict';

import React, { memo, useState, useMemo } from 'react';
import type { NextPage } from 'next';
import { Box } from '@mui/material';

import BasicLayout from '../components/BasicLayout';
import { getWise, updateLocalWiseJSON } from '../lib/wise';
import { useOneTimeMountEffect } from '../lib/hooks/useOneTimeMountEffect';
import { WiseCard } from '../components/WiseCard';
import { TwitterShareButton } from '../components/TwitterShareButton';

type Props = { allWiseData: WiseDataArray };

const Home: NextPage<Props> = ({ allWiseData }) => {
  const [displayWiseIndex, setDisplayWiseIndex] = useState<number>(-1);

  useOneTimeMountEffect(() =>
    updateLocalWiseJSON({ allWiseData, setDisplayWiseIndex })
  );

  const view = useMemo(() => {
    if (displayWiseIndex < 0) {
      return <Box>Can not display wise.</Box>;
    }
    return <WiseCard text={allWiseData[displayWiseIndex]?.content ?? ''} />;
  }, [allWiseData, displayWiseIndex]);

  const hostName = process.env['NEXT_PUBLIC_SITE_URL'];

  return (
    <BasicLayout>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>{view}</Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TwitterShareButton
          text={
            displayWiseIndex < 0
              ? ''
              : allWiseData[displayWiseIndex]?.content.replace(/\\n/g, '\n')
          }
          hashtags={['名言', '格言']}
          url={hostName}
        />
      </Box>
    </BasicLayout>
  );
};

const getStaticProps = async () => {
  const allWiseData = await getWise();

  return {
    props: { allWiseData },
    revalidate: 3600,
  };
};

if (process.env.NODE_ENV === 'development') {
  Home.displayName = 'Home';
}

export default memo(Home);
export { getStaticProps };
