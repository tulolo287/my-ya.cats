import { useEffect } from 'react'
import { PageInitArgs, PageInitContext } from '../routes'
import { useAppDispatch, useAppSelector, useAppStore } from '@store/hooks'
import {
  selectPageHasBeenInitializedOnServer,
  setPageHasBeenInitializedOnServer,
} from '@store/ssr/ssr-slice'

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>
}
const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        // eslint-disable-next-line
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

const createContext = (): PageInitContext => ({
  authCookie: getCookie('authCookie'),
})

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useAppDispatch()
  const pageHasBeenInitializedOnServer = useAppSelector(
    selectPageHasBeenInitializedOnServer
  )
  const store = useAppStore()

  useEffect(() => {
    if (pageHasBeenInitializedOnServer) {
      dispatch(setPageHasBeenInitializedOnServer(false))
      return
    }
    initPage({ dispatch, state: store.getState(), ctx: createContext() })
  }, [])
}
