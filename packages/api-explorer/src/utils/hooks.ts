/*

 MIT License

 Copyright (c) 2022 Looker Data Sciences, Inc.

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
import { useHistory } from 'react-router-dom'

/**
 * Hook for navigating to given route with specified query params
 *
 * @param path Pathname to navigate to
 * @param queryParams Hash of query param name/value pairs to include in the destination url
 */

export const useNavigation = () => {
  const history = useHistory()

  const navigate = (
    path: string,
    queryParams?: { s?: string | null; sdk?: string | null } | null
  ) => {
    const urlParams = new URLSearchParams(history.location.search)
    if (queryParams === undefined) {
      // if params passed in is undefined, maintain existing parameters in the URL
      history.push({ pathname: path, search: urlParams.toString() })
    } else if (queryParams === null) {
      // if params passed in is null, remove all parameters from the URL
      history.push({ pathname: path })
    } else {
      // push each key as new param to URL, excluding entries with value null
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key] === null || queryParams[key] === '') {
          urlParams.delete(key)
        } else {
          urlParams.set(key, queryParams[key])
        }
      })
      history.push({ pathname: path, search: urlParams.toString() })
    }
  }

  return navigate
}
