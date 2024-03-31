import { AuthSignupData, Validation } from './types'

export const routerPaths = {
  login: '/login',
  signup: '/signup',
  profile: '/profile',
  game: '/game',
  main: '/',
  leaderBoard: '/leaderboard',
  forum: '/forum',
  forumTopic: '/forum/:topicId',
}

export const defaultError = 'Something went wrong...Please try again'

export const validation: Record<
  keyof AuthSignupData,
  { pattern: Validation; required: string | boolean }
> = {
  first_name: {
    pattern: {
      value: /^[A-ZЁА-Я][A-Za-zЁА-яё-]+$/,
      message: 'Incorrect first name',
    },
    required: 'First name is required',
  },
  second_name: {
    pattern: {
      value: /^[A-ZЁА-Я][A-Za-zЁА-яё-]+$/,
      message: 'Incorrect second name',
    },
    required: 'Second name is required',
  },
  login: {
    pattern: {
      value: /^(?=.*[A-Za-z])([\w-]){3,20}$/,
      message: 'Incorrect login',
    },
    required: 'Login is required',
  },
  email: {
    pattern: {
      value: /.+@[^@]+[a-z]+\.[^@]{2,}$/,
      message: 'Incorect email',
    },
    required: 'Email is required',
  },
  password: {
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d)[\dA-Za-z]{8,40}$/,
      message: 'Incorrect password',
    },
    required: 'Password is required',
  },
  phone: {
    pattern: {
      value: /^[+-d]?\d{10,15}$/,
      message: 'Incorrect phone',
    },
    required: 'Phone is required',
  },
}

export const redirectUri =
  process.env.OAUTH_REDIRECT_URI || 'http://localhost:3000'
export const oAuthYandexUrl = process.env.OAUTH_YANDEX_URL
