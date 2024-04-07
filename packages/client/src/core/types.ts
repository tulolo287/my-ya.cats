export type TFontSize = '4xl' | 'xxxl' | 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs'

type DimensionsUnit = '%' | 'px' | 'em' | 'vh' | 'vw' | 'rem'
export type DimensionsProp = `${number}${DimensionsUnit}` | 'auto'

export type ServerError = {
  reason: string
}

export type UserPasswordData = {
  oldPassword: string
  newPassword: string
}

export type UserProfileData = User & {
  display_name: string | null
}

export type UserData = UserProfileData & {
  id: number
  avatar: string | null
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
  data: {
    login: string
    yacatsScore: number
  }
}

export type LeaderboardRequestAll = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export type LeaderboardRequestGet = LeaderboardRecord & {
  ratingFieldName: string
  teamName?: string
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

export enum LoadStatus {
  INITIAL = 'initial',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type OAuthLoginRequest = {
  code: string
  redirect_uri: string
}

export type OAuthServiceIdRequest = {
  redirect_uri?: string
}

export type OAuthServiceIdResponse = {
  service_id: string
}

export type ReactionList = {
  emojiId: string
  count: number
  currentUser: boolean
}[]

export type Reaction = {
  commentId: number
  emojiId: string
}
