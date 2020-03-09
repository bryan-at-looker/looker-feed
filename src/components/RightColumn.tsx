import React from 'react';
import { Box } from '@looker/components';
import {RightColumnTrends} from './RightColumnTrends'
import styled from 'styled-components'
import { RightColumnFollow } from './RightColumnFollow';
import { RightColumnTop } from './RightColumnTop';

const bg_color = "rgb(245, 248, 250);"

export function RightColumn( {trends, follows}: any ) {

  return (
    <Box pl="small">
      <RightColumnTop></RightColumnTop>
      <StyledBox mt="large">
        <RightColumnTrends trends={trends}></RightColumnTrends>
      </StyledBox>
      <StyledBox mt="large">
        <RightColumnFollow follows={follows}></RightColumnFollow>
      </StyledBox>
    </Box>
  );
}

const StyledBox = styled(Box)`
  border-radius: 14px;
  height: 100%;
  background-color: ${bg_color}
`