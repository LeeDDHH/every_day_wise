'use strict';

const wiseSourceUrl = process.env['WISE_SOURCE_URL'] || '';
const displayedWiseIdExpiredTimeKey = 'displayedWiseIdExpiredTime';
const displayedWiseIdKey = 'displayedWiseId';
const uiModeKey = 'uiMode';
const headerLinkNameList = [
  {
    name: 'Today',
    path: '/',
  },
  {
    name: 'List',
    path: '/wiseList',
  },
  {
    name: 'About',
    path: '/about',
  },
];

export {
  wiseSourceUrl,
  displayedWiseIdExpiredTimeKey,
  displayedWiseIdKey,
  uiModeKey,
  headerLinkNameList,
};
