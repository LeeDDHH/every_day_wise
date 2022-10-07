'use strict';

import { Link as MUILink } from '@mui/material';
import { CardProps } from '@mui/material';
import React, { forwardRef } from 'react';
import { WiseCard } from '../components/WiseCard';
import {
  noneUnderLineATagStyle,
  childCardElementHoverStyle,
} from '../lib/muiStyle';

type LinkMenuItemProps = Omit<
  CardProps<'a', { text: string }>,
  'component' | 'div'
>;

const LinkWithWiseCard = forwardRef<HTMLDivElement, LinkMenuItemProps>(
  (props) => {
    const { text, href } = props;

    return (
      <MUILink
        href={href}
        sx={[noneUnderLineATagStyle, childCardElementHoverStyle]}>
        <WiseCard text={text} />
      </MUILink>
    );
  }
);

LinkWithWiseCard.displayName = 'LinkWithWiseCard';

export { LinkWithWiseCard };
