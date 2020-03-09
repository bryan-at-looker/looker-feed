import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Code, InputSearch, Box, MenuList, MenuGroup, MenuItem, Text, PopoverContent, Popover, Button, Flex, FlexItem, Icon, IconButton } from '@looker/components';
import styled from 'styled-components'
import { NumberToColoredPercent } from './NumberToColoredPercent';
import { ExtensionHostApi } from '@looker/extension-sdk';

const bg_color = "rgb(245, 248, 250);"
const bg_color_hover = "rgba(170, 184, 194, 0.1);"

export function RightColumnTrends( {trends}: any) {
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const extensionHost = extensionContext.extensionSDK as ExtensionHostApi
  useEffect(()=>{

  },[])

  if ( trends?.length ) {
    const MenuItems = trends.map((t: any)=>{
      return ThisPeriod(t, extensionHost)
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
              bg: bg_color_hover
            },
          }}
        >
          <MenuGroup label="Trending KPIs" 
            // @ts-ignore 
            labelProps={{ bg: "transparent", 
            fontSize:"large", 
            fontWeight:"bold" }}>
            {MenuItems}
          </MenuGroup>
        </StyledMenuList>
      </>
    );
  } else {
    return <></>
  }
 
}

const StyledMenuList = styled(MenuList)`
  & > li {
    padding-top: 4px;
    padding-bottom: 0px;
  }
`

const StyledMenuItem = styled(MenuItem)`
  &:before {
    content: ' ';
    display: block;
    height: 1px;
    border-top:solid 1px rgb(230, 236, 240);
    width: 100%;
}
  & > button {
    display: block ;
  }
`

function ThisPeriod (t: any, extensionHost: ExtensionHostApi) {
  return <StyledMenuItem
  pl="medium" pr="medium"
  key={t.id}
>
  <Flex>
    <FlexItem width="90%">
      <Text 
      as="div" 
      fontSize="small"
      fontWeight="light"  
    >{t.look?.description}</Text>
    <Text 
      as="div"
      fontWeight="bold"  
    >{t.look?.title}</Text>
    <NumberToColoredPercent 
      abs_val={t.data[0]['this_period']['rendered']}
      val={t.data[0]['trend']['value']} 
      positive_good={t.data[0]['positive_good']['value']=='Yes'}
    ></NumberToColoredPercent>
    </FlexItem>
    <FlexItem width="10%">
      {ThisPeriodPop(t, extensionHost)}
    </FlexItem>
  </Flex>


</StyledMenuItem>
}

function ThisPeriodPop (t: any, extensionHost: ExtensionHostApi) {
  if ( t?.data[0]?.this_period?.links.length ) {
    const LinkMenu = t.data[0].this_period.links.map((l: any, i:number)=>{
      return <MenuItem 
        icon="LogoRings" 
        onClick={()=>{extensionHost.openBrowserWindow(l.url.replace('/embed/','/'), "_link")}}
        href={l.url.replace('/embed/','/')}
        key={i}
      >{l.label}</MenuItem>  
    })
    return <Popover
    key={t.id}
    placement="auto"
    content={
      <PopoverContent width="300px">
        <Text fontSize="small">
          <MenuList>
            {LinkMenu}
          </MenuList>
        </Text>
      </PopoverContent>
    }
  >
  {(onClick, ref, className) => (
              <Icon
                name="CaretDown"
                size={24}
                aria-haspopup="true"
                // @ts-ignore
                onClick={onClick}
                ref={ref}
                className={className}
              />
            )}
  </Popover>
  } else {
    return <></>
  }
}