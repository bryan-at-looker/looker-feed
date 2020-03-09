import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Flex, MenuList, MenuGroup, MenuItem, AvatarUser, Text, Box, ButtonOutline, FlexItem } from '@looker/components';
import styled from 'styled-components'
import { IUser } from '@looker/sdk/dist/sdk/3.1/models';

const TWITTER_BG_COLOR = "rgba(170, 184, 194, 0.1);"
const TWITTER_COLOR = 'rgb(29, 161, 242)'

export function RightColumnFollow( {follows}: any ) {
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk = extensionContext.coreSDK

  useEffect(()=>{
    
  },[])

  if (follows.length) {
    const MenuItems = follows.map((f: IUser)=>{
      const data = {
        avatar_url: f.avatar_url || null,
        first_name: f.first_name || null,
        last_name: f.last_name || null
      }
      return <StyledMenuItem 
          as="div"
          pl="medium" pr="medium"
          pt="small" pb="small"
          key={f.id}>
        <Flex 
          flexWrap="nowrap"
          alignItems="middle"
          p="small" justifyContent="space-between">
          <FlexItem>
            <AvatarUser 
              user={data}
              color={TWITTER_COLOR}
            ></AvatarUser></FlexItem>
          <FlexItem>
          <Box ml="small">
            <Text as="div">{f.display_name}</Text>
            <Text as="div">{f.display_name}</Text>
          </Box>
          </FlexItem>
          <FlexItem>
          <StyledButtonOutline
            >Follow</StyledButtonOutline>
          </FlexItem>
        </Flex>
      </StyledMenuItem>


    })
    return (
      <>
        <StyledMenuList
          customizationProps={{
            bg: "transparent",
            current: {
              bg: "transparent",
            },
            hover: {
              bg: TWITTER_BG_COLOR
            },
          }}
        >
          <MenuGroup label="Who to Follow"  
            // @ts-ignore 
            labelProps={{ bg: "transparent", fontSize:"large", fontWeight:"bold" }}
          >
            {MenuItems}
          </MenuGroup>
        </StyledMenuList>
      </>
    );
  }
  
  return (
    <>
    </>
  );
}

const StyledMenuItem = styled(MenuItem)`
  &:before {
    content: ' ';
    display: block;
    height: 1px;
    border-top:solid 1px rgb(230, 236, 240);
    width: 100%;
}
`

const StyledButtonOutline = styled(ButtonOutline)`
  border-radius: 3em;
  margin: auto;
`

const StyledMenuList = styled(MenuList)`
  & > li {
    padding-top: 4px;
    padding-bottom: 0px;
  }
`