export type TFontSize = 'xxxl' | 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs'

type DimensionsUnit = '%' | 'px' | 'em' | 'vh' | 'vw' | 'rem'
export type DimensionsProp = `${number}${DimensionsUnit}`

export type ServerError = {
  reason: string
}

export type UserPasswordData = {
  oldPassword: string
  newPassword: string
}

export type UserAvatarData = {
  id: number
  login: string
  first_name: string
  second_name: string
  email: string
  phone: string
  display_name: string | null
  avatar: string
}
