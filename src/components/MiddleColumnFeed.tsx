import React from 'react';
import { Box } from '@looker/components';
import { MiddleColumnFeedNew } from './MiddleColumnFeedNew';
import { MiddleColumnFeedSaved } from './MiddleColumnFeedSaved'

export function MiddleColumnFeed( {me, feed, all_users, explores, saveFeed }: any ) {

  return (
    <Box  mt="57px">
      <MiddleColumnFeedNew explores={explores} me={me} saveFeed={saveFeed}></MiddleColumnFeedNew>
      <MiddleColumnFeedSaved feed={feed} all_users={all_users}></MiddleColumnFeedSaved>
    </Box>
  );
}
