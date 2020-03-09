import React, { useCallback, useContext, useState } from "react"
import { LookerEmbedSDK, LookerEmbedLook } from '@looker/embed-sdk'
import {
  ExtensionContext,
  ExtensionContextData,
} from "@looker/extension-sdk-react"
import { Button, Card } from "@looker/components"

export const EmbeddedLook: React.FC<any> = ( {id, qid}) => {
  const [running, setRunning] = React.useState(true)
  const [look, setLook] = React.useState<LookerEmbedLook>()
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)

  const updateRunButton = (running: boolean) => {
    setRunning(running)
  }

  const setupLook = (look: LookerEmbedLook) => {
    setLook(look)
  }

  const embedCtrRef = useCallback(el => {
    const hostUrl = extensionContext?.extensionSDK?.lookerHostData?.hostUrl
    if (el && hostUrl) {
      LookerEmbedSDK.init(hostUrl)
      LookerEmbedSDK.createLookWithId(id)
        .appendTo(el)
        .withParams({ show_title: 'false' })
        .on('drillmenu:click', (e)=>{console.log(e); return {cancel: false}})
        // .on('look:loaded', updateRunButton.bind(null, false))
        // .on('look:run:start', updateRunButton.bind(null, true))
        // .on('look:run:complete', updateRunButton.bind(null, false))
        .build()
        .connect()
        .then(setupLook)
        .catch((error: Error) => {
          console.error('Connection error', error)
        })
    }
  }, [])

  const runLook = () => {
    if (look) {
      look.run()
    }
  }

  return (
    <>
      <EmbedContainer mt="small" ref={embedCtrRef}/>
    </>
  )
}


import styled from "styled-components"

export const EmbedContainer = styled(Card)`
  width: 100%;
  border-radius: 1em;
  height: 400px;
  & > iframe {
    width: 100%;
    height: 100%;
  }
`