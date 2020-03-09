import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Page} from './components/Page'
import {ExtensionProvider} from '@looker/extension-sdk-react'
import {GlobalStyle, theme, Spinner, Flex} from '@looker/components'
import {ThemeProvider} from 'styled-components'

window.addEventListener('DOMContentLoaded', async (event) => {
  const root = document.createElement('div')
  document.body.appendChild(root)

  const loading = (
    <Flex width='100%' height='90%' alignItems='center' justifyContent='center'>
      <Spinner color='black' />
    </Flex>
  )

  theme.fonts.brand = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', sans-serif"


  theme.colors.semanticColors.primary = {...theme.colors.semanticColors.primary, 
    main: 'rgb(29, 161, 242)',
    text: 'rgb(29, 161, 242)',
    lighter: 'rgba(29, 161, 242, 0.5)',
    light: 'rgba(29, 161, 242, 0.1)',
    dark: 'rgb(29, 161, 242)',
    darker: 'rgb(29, 161, 242)',
    altText: 'rgba(29, 161, 242, 0.5)',
    borderColor: 'rgba(29, 161, 242, 0.5)',
    linkColor: 'rgba(29, 161, 242, 0.5)'
  }

  ReactDOM.render(
    // ExtensionProvider provides subcomponents access to the Looker Extension SDK
    <ExtensionProvider loadingComponent={loading} requiredLookerVersion='>=6.24.0'>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Page></Page>
        </>
      </ThemeProvider>
    </ExtensionProvider>,
    root
  )
})
