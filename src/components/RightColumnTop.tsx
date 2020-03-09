import React from 'react';
import { InputSearch, Box } from '@looker/components';
import styled from 'styled-components'

const TWITTER_COLOR = 'rgba(29, 161, 242);'
const bg_color = "rgb(245, 248, 250);"

export function RightColumnTop() {

  return (
    <Box pt="small">
    <StyledInputSearch 
    placeholder="Search Looker" 
  />
  </Box>
  );
}

const StyledInputSearch = styled(InputSearch)`
  width:100%;
  border-radius: 50px;
  background-color: ${bg_color};
  &:focus-within {
    border-color: ${TWITTER_COLOR};
  } 
`