import { ErrorPageType, ErrorContent } from './types'

export const errorContent: Record<ErrorPageType, ErrorContent> = {
  '500': {
    title: '500',
    description: 'INTERNAL SERVER ERROR',
  },
  '404': {
    title: '404',
    description: 'PAGE NOT FOUND',
  },
  errorBoundary: {
    title: 'Something went wrong...',
    description: 'Please reload the page',
  },
}
