import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Box, Flex, FlexItem, AvatarUser, InputText, Icon, Button } from '@looker/components';
import styled from 'styled-components'
import { MiddleColumnFeedNewLook } from './MiddleColumnFeedNewLook';

const TWITTER_COLOR = 'rgb(29, 161, 242)'
const EXPLORES = ['thelook-snowflake::order_items','thelook-snowflake::events','thelook-snowflake::sessions']

export function MiddleColumnFeedNew( {me, explores, saveFeed}: any ) {
  const [input_value, setInputValue] = useState('');
  const [explore_modal_open, setExploreModalOpen] = useState(false);
  const [selected_explore, setSelectedExplore] = useState(undefined)
  const [qid, setQid] = useState('');
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk = extensionContext.coreSDK

  const closeExploreModal = () => {
    setExploreModalOpen(false)
    setSelectedExplore(undefined)
    setQid('')
  }

  const saveExploreModal = () => {
    console.log(qid)
    setExploreModalOpen(false)
  }

  const saveLook = () => {
    saveFeed('look' ,input_value ,qid)
    closeExploreModal();
    setInputValue('');
  }

  const avatar_data = {
    avatar_url: me?.avatar_url || null,
    first_name: me?.first_name || '',
    last_name: me?.last_name || ''
  }

  const available_explores: any = []
  if (explores?.length) {
    explores.forEach((e: any)=>{
      if (EXPLORES.indexOf(e.id) > -1) {
        available_explores.push(e)
      }
    })
  }
  return (
    <>
      <Box p="small" borderBottom="10px solid rgb(230, 236, 240)">
        <Flex flexWrap="wrap" alignContent="stretch">
          <FlexItem width="10%">           
            <AvatarUser 
              user={avatar_data}
              color={TWITTER_COLOR}
            ></AvatarUser>
          </FlexItem>
          <FlexItem width="90%">
            <StyledInputText
              as="textarea"
              value={input_value}
              onChange={(e: any)=>{const t = e.target!; setInputValue(t.value); t.style.height = ""; t.style.height = t.scrollHeight + "px"}}
              fontSize="large"
              fontWeight="semiBold"
              placeholder="What's happening?"
            ></StyledInputText>
          </FlexItem>
          <FlexItem mt="small" width="10%"></FlexItem>
          <FlexItem mt="small" width="60%">
            <NewIcon name="ChartSingleValue" />
            <NewIcon qid={qid} onClick={()=>{setExploreModalOpen(true) } } name="ChartColumn" />
            <NewIcon name="Dashboard" />
          </FlexItem>
          <FlexItem textAlign="right" pr="small" width="30%">
            <StyledButton disabled={(input_value?.length == 0)} onClick={saveLook} size="medium">Look</StyledButton>
          </FlexItem>
        </Flex>
      </Box>
      {available_explores && explore_modal_open && <>
        <MiddleColumnFeedNewLook
          explores={available_explores}
          selected_explore={selected_explore}
          qid={qid}
          setQid={setQid}
          setSelectedExplore={setSelectedExplore}
          saveExploreModal={saveExploreModal}
          closeExploreModal={closeExploreModal}
        ></MiddleColumnFeedNewLook>
      </>}
    </>
  );
}

const StyledInputText = styled(InputText)`
resize: none;
overflow: hidden;
-ms-overflow-style: none;
width: 100%;
border-color: transparent;
&::-webkit-scrollbar {
  display: none;
}
&:hover {
  border-color: transparent;
}
&:focus {
  border-color: transparent;
  box-shadow: 0 0 0 0px;
}
&:focus-within {
  border-color: transparent;
`

const StyledButton = styled(Button)`
  border-radius: 3em;
  color: white;
  margin: auto;
`

const NewIcon = ({name, qid, ...props}: any) => {
  return <Icon {...props} size={24} name={name} color={(!qid || qid=='') ? TWITTER_COLOR : 'black'} mr="small" />
}