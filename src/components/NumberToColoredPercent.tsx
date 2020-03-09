import React from 'react';
import { Text, Flex, FlexItem } from '@looker/components';

export function NumberToColoredPercent( {val, positive_good, abs_val}: any) {
  const colors = {
    up: (positive_good) ? 'green' : 'red',
    down: (positive_good) ? 'red' : 'green'
  }
  const color = (val<0) ? colors.down : (val>0) ? colors.up : 'black'
  const val_formatted = Math.abs(val).toLocaleString("en", { style: "percent", minimumFractionDigits: 2 })
  const icon = (val<0) ? '▼' : (val>0) ? '▲' : '—'
  return (<Flex >
    <FlexItem mr="small">
      <Text fontSize="small">
        {abs_val}
      </Text>
    </FlexItem>
    <FlexItem>
      <Text 
        color={color}
        fontSize="small"
      >
        {`${icon} ${val_formatted}`}
      </Text>
      </FlexItem>
  </Flex>
  )
}