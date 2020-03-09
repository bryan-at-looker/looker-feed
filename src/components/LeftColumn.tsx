import React, { useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { MenuList, MenuItem } from '@looker/components';
import { palette } from '@looker/components'
import styled from 'styled-components'
import { ExtensionHostApi } from '@looker/extension-sdk';

const TWITTER_COLOR = 'rgb(29, 161, 242)'
const TWITTER_BG_COLOR = 'rgba(29, 161, 242, 0.1);'

const MENU_LIST = [
  { icon: 'LogoRings', label: '', current: true},
  { icon: 'Home', label: 'Home', current: true, bg: TWITTER_BG_COLOR },
  { icon: 'Explore', label: 'Explore' },
  { icon: 'RecentActivity', label: 'Recent', url: '/browse/recent' },
  { icon: 'Favorite', label: 'Favorites', url: '/browse/favorites' },
  { icon: 'Clipboard', label: 'Boards' },
  { icon: 'Calendar', label: 'Schedules', url: '/account/schedules' },
  { icon: 'Beaker', label: 'Discover', url: '/browse/top'},
  { icon: 'More', label: 'More', url: '/browse' }
]

export function LeftColumn() {
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const extensionHost = extensionContext.extensionSDK as ExtensionHostApi

  useEffect(()=>{
    
  },[])

  const MenuItems = MENU_LIST.map(m=>{return getMenu(m, extensionHost)})
  return (
  <>
    <MenuList customizationProps={{
    fontSize: 'large',
    iconSize: 32,
    iconColor: 'black',
    marker: {
      color: palette.purple300,
      size: 0,
    },
    hover: {
      bg: TWITTER_BG_COLOR,
      color: TWITTER_COLOR,
      iconColor: TWITTER_COLOR
    },
    current: {
      bg: 'transparent',
      color: TWITTER_COLOR,
      iconColor: TWITTER_COLOR,
    },
  }}>
      {MenuItems}
    </MenuList>
  </>
  );
}

function getMenu(m: any, extensionHost: ExtensionHostApi) {
  if (m.bg) {
    return <StyledMenuItem 
      current={m.current}
      mb="small"
      key={m.label || '_top'}
      icon={m.icon}
      bg={m.bg}
    >{m.label}</StyledMenuItem>
  } else {
    return <StyledMenuItem 
      current={m.current}
      key={m.label || '_top'}
      onClick={()=>{ if (m.url) { extensionHost.openBrowserWindow(m.url)} } }
      icon={m.icon}
      mb="small"
    >{m.label}</StyledMenuItem>
  }

}

const StyledMenuItem = styled(MenuItem)`
  border-radius: 3em;  
  width: fit-content;
  & > button {
    padding: 10px 16px 10px 16px;
    font-weight: bold;
  }
`