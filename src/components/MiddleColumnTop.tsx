import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Code, FlexItem, Flex, Text, Icon, Box } from '@looker/components';
import styled from 'styled-components'

const TWITTER_COLOR = 'rgba(29, 161, 242);'

export function MiddleColumnTop() {
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk = extensionContext.coreSDK

  useEffect(()=>{
    
  },[])


  return (
    <Box borderBottom="1px solid lightgrey">
      <Flex 
        p="small" 
        backgroundColor="white"
        justifyContent="space-between"
      >
        <FlexItem>
          <Text fontSize="large" fontWeight="bold">Home</Text>
        </FlexItem>
        <FlexItem>
          <Icon size={32} color={TWITTER_COLOR} name="CircleInfoOutline" />
        </FlexItem>
      </Flex>
    </Box>
  );
}