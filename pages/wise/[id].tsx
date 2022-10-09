'use strict';

import type { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'node:querystring';
import React, { FC } from 'react';
import { Box } from '@mui/material';
import BasicLayout from '../../components/BasicLayout';
import { WiseCard } from '../../components/WiseCard';
import { TwitterShareButton } from '../../components/TwitterShareButton';
import { getWise, getOneWise } from '../../lib/wise';
import { createOgp } from '../../server/ogpUtils';

type Props = { id: string; content: string };

interface Params extends ParsedUrlQuery {
  id: string;
}

const OneWise: FC<Props> = ({ id, content }: Props) => {
  const hostName =
    typeof window !== 'undefined' ? window.location.hostname : '';
  return (
    <>
      <Head>
        <meta
          property="og:image"
          key="ogImage"
          content={`${hostName}/ogp/${id}.png`}
        />
        <meta
          name="twitter:card"
          key="twitterCard"
          content="summary_large_image"
        />
        <meta
          name="twitter:image"
          key="twitterImage"
          content={`${hostName}/ogp/${id}.png`}
        />
      </Head>
      <BasicLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <WiseCard text={content} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TwitterShareButton
            text={content.replace(/\\n/g, '\n')}
            hashtags={['名言', '格言']}
            url={`https://${hostName}/wise/${id}`}
          />
        </Box>
      </BasicLayout>
    </>
  );
};

// ビルド時に/wise/[id]形式でパスを決める
// 存在しないページの場合、404表示をする
// ビルド時に1回のみ実行される
const getStaticPaths: GetStaticPaths<Params> = async () => {
  const wises = await getWise();
  const paths = wises.map(({ id, content }) => {
    createOgp(id, content);
    return {
      params: {
        id: id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

// アクセスされたら、実行する
// 1時間ごとにアクセスされたページの最新状態を取得する
const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const result = await getOneWise(params?.id ?? '');
  const content = !result ? '' : result.content;
  return {
    props: {
      id: params?.id ?? '',
      content: content,
    },
    revalidate: 3600,
  };
};

if (process.env.NODE_ENV === 'development') {
  OneWise.displayName = 'OneWise';
}

export default OneWise;
export { getStaticPaths, getStaticProps };
