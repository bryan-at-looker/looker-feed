import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Code, Dialog, ModalContent, Paragraph, Button, MenuList, MenuItem, Heading, ModalHeader, ModalFooter, Box, ButtonOutline } from '@looker/components';
import styled from 'styled-components'
import { EmbeddedExplore } from './EmbeddedExplore';

export function MiddleColumnFeedNewLook( {explores, selected_explore, qid, setQid, setSelectedExplore, closeExploreModal, saveExploreModal}: any) {

  useEffect(()=>{
    
  },[])

  if (selected_explore) {

  }

  const ExploreList = explores.map((e:any) => {
    return <MenuItem
      key={e.id}
      onClick={()=>{setSelectedExplore(e)}}
    >{e.e.label}</MenuItem>
  })

  return (
    <>
      <Dialog 
        isOpen={true} 
        maxWidth={(selected_explore) ? "98vw": '400px'}
        onClose={() => closeExploreModal()}>
          {selected_explore && <>
                <EmbeddedExplore qid={qid} selected_explore={selected_explore} setQid={setQid}></EmbeddedExplore>
            <ModalFooter>
              <StyledButton onClick={saveExploreModal}>Save</StyledButton>
              <StyledButtonOutline onClick={closeExploreModal} >Cancel</StyledButtonOutline>
            </ModalFooter>
          </>}
          {!selected_explore && <>
            <ModalHeader>Choose an Explore:</ModalHeader>
            <ModalContent>
              <MenuList>{ExploreList}</MenuList>
            </ModalContent>            
          </>}
      </Dialog>
    </>
  );
}

const StyledButton = styled(Button)`
  border-radius: 3em;
  color: white;
  margin: auto;
`

const StyledButtonOutline = styled(ButtonOutline)`
  border-radius: 3em;
  margin: auto;
`