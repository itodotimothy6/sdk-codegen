/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import type { FC, ReactNode } from 'react'
import React from 'react'
import { getExtensionSDK } from '@looker/extension-sdk'
import { Markdown } from '@looker/code-editor'

interface ExtMarkdownProps {
  source: string
  pattern?: string
  transformLinkUri?: (url: string) => string
  linkClickHandler?: (pathname: string, href: string) => void
  paragraphOverride?: ({ children }: { children: ReactNode }) => ReactNode
}

/**
 * Simple wrapper on the standard Markdown component to handle link clicks in an extension
 * @param source markdown to render
 * @param pattern search pattern
 * @param transformLinkUri link pattern transformer override
 * @param linkClickHandler defaults to ExtensionSDK.openBrowserWindow()
 * @param paragraphOverride override paragraph display handling
 */
export const ExtMarkdown: FC<ExtMarkdownProps> = ({
  source,
  pattern = '',
  transformLinkUri,
  linkClickHandler,
  paragraphOverride,
}) => {
  const openBrowserWindow = (_pathname: string, href: string) => {
    const ext = getExtensionSDK()
    ext.openBrowserWindow(href)
  }

  return (
    <Markdown
      source={source}
      pattern={pattern}
      transformLinkUri={transformLinkUri}
      linkClickHandler={linkClickHandler || openBrowserWindow}
      paragraphOverride={paragraphOverride}
    />
  )
}
