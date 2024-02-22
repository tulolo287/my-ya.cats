export type TFontSize = '4xl' | 'xxxl' | 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs'

type DimensionsUnit = '%' | 'px' | 'em' | 'vh' | 'vw' | 'rem'
export type DimensionsProp = `${number}${DimensionsUnit}`

export type ServerError = {
  reason: string
}

export type UserPasswordData = {
  oldPassword: string
  newPassword: string
}

export type UserAvatarData = User & {
  id: number
  display_name: string | null
  avatar: string
}

export type Topic = {
  id: number
  topicName: string
  comments: Comment[]
}

export type Comment = {
  id: number
  username: string
  text: string
}

export type LeaderboardRecord = {
  login: string
  score: number
}

export type AuthLoginData = {
  login: string
  password: string
}

export type AuthSignupData = User & {
  password: string
}

export type User = {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
}

export enum InputTypes {
  text = 'text',
  password = 'password',
  email = 'email',
  tel = 'tel',
  number = 'number',
}


export type Validation = {
  value: RegExp
  message: string
}

export type NewTopic = Pick<Topic, 'topicName'>

