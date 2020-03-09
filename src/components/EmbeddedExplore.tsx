import React, { useCallback, useContext, useState } from "react"
import { LookerEmbedSDK, LookerEmbedExplore } from '@looker/embed-sdk'

import {
  ExtensionContext,
  ExtensionContextData,
} from "@looker/extension-sdk-react"
import { Button } from "@looker/components"
import styled from 'styled-components'

export const EmbeddedExplore: React.FC<any> = ( {qid, selected_explore, setQid}: any ) => {
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)

  const setupExplore = (explore: LookerEmbedExplore) => {
    // setExplore(explore)
  }

  const stateChanged = (e: any) => {
    // console.log(e)
    const new_url = new URL(e.explore.absoluteUrl)
    const new_qid = new_url.searchParams.get('qid')
    if (new_qid) {
      setQid(new_qid)
    }
  }

  const embedCtrRef = useCallback(el => {
    const hostUrl = extensionContext?.extensionSDK?.lookerHostData?.hostUrl
    if (el && hostUrl) {
      LookerEmbedSDK.init(hostUrl)
      LookerEmbedSDK.createExploreWithId(selected_explore.id.replace('::','/'))
        .appendTo(el)
        .withParams({qid: (qid) ? qid : ''})
        .on('explore:state:changed', stateChanged)
        // .on('explore:run:start', updateRunButton.bind(null, true))
        // .on('explore:run:complete', updateRunButton.bind(null, false))
        .build()
        .connect()
        .then(setupExplore)
        .catch((error: Error) => {
          console.error('Connection error', error)
        })
    }
  }, [])

  return (
    <>
      <EmbedContainer ref={embedCtrRef}/>
    </>
  )
}

export const EmbedContainer = styled.div`
  height: 98vh;
  width: 98vw;
  & > iframe {
    width: 100%;
    height: 100%;
    margin: auto;
  }
`