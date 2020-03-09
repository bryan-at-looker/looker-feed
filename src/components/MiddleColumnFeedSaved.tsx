import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Code, Flex, FlexItem, AvatarUser, Text, Box } from '@looker/components';
import styled from 'styled-components'
import { find } from 'lodash'
import { EmbeddedLook } from './EmbeddedLook'

const TWITTER_COLOR = 'rgb(29, 161, 242)'

export function MiddleColumnFeedSaved( { feed, all_users }: any) {
  const [me, setMe] = useState({});
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk = extensionContext.coreSDK

  useEffect(()=>{
    
  },[])


  if (feed?.length && all_users?.length) {
    const MenuItems = feed.map((l: any)=>{
      let description, parsed
      try {
        description = JSON.parse(l.description)
        parsed = true;
      } catch(e) {
        parsed = false;
        description = l.description
      }
      const found_user = find(all_users, {id:  l.last_updater_id}) || { first_name: '', last_name: ''}
      return <Flex 
          flexWrap="wrap"
          key={l.id}
          p="small">
        <FlexItem width="10%">
        <AvatarUser 
          user={found_user}
          color={TWITTER_COLOR}
        ></AvatarUser>
        </FlexItem>
        <FlexItem
          width="90%"
      ><Box>
        <Box>
          <Text fontWeight="bold" fontSize="small">{`${found_user.first_name} ${found_user.last_name}`}</Text>
          <Text fontWeight="light"  fontSize="xsmall">{` · ${timeDifference(new Date(), new Date(l.updated_at))}`}</Text>
        </Box>
        <Text>{getDetails(description, parsed)}</Text>
      </Box></FlexItem>
        {parsed && description.type === 'look' && <>
        <FlexItem width="10%"></FlexItem>
        <FlexItem
          width="90%"
          >
            <EmbeddedLook id={l.id}></EmbeddedLook>
          </FlexItem>
        </>}
        </Flex>
    })
    return (
      <Flex flexDirection="column">
        {MenuItems}
      </Flex>
    );
  } else {
    return (<></>)
  }


}

function getDetails (d: any, p: any) {
  return (p) ? d.details : d
}

function timeDifference(current: any, previous: any) {

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
       return Math.round(elapsed/1000) + 's';   
  }

  else if (elapsed < msPerHour) {
       return Math.round(elapsed/msPerMinute) + 'm';   
  }

  else if (elapsed < msPerDay ) {
       return Math.round(elapsed/msPerHour ) + 'h';   
  }

  else if (elapsed < msPerMonth) {
      return '~' + Math.round(elapsed/msPerDay) + 'd';   
  }

  else if (elapsed < msPerYear) {
      return '~' + Math.round(elapsed/msPerMonth) + 'm';   
  }

  else {
      return '~' + Math.round(elapsed/msPerYear ) + 'y';   
  }
} 
