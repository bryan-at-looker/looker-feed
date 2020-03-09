/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Looker Data Sciences, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

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
