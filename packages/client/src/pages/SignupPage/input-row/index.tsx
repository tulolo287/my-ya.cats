import { validation } from '@core/constants'
import { Input } from '@components/input'
import { Space } from '@components/space'
import { AuthSignupData, InputTypes } from '@core/types'
import { FC } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

export type InputProps = {
  type: InputTypes
  label: string
  name: keyof AuthSignupData
  placeholder: string
}

type InputRowProps = {
  row: InputProps[]
  form: {
    register: UseFormRegister<AuthSignupData>
    errors: FieldErrors<AuthSignupData>
  }
}

export const InputRow: FC<InputRowProps> = ({ row, form }) => {
  const { register, errors } = form

  return (
    <Space gap="48px" direction="row">
      {row.map((input, index) => (
        <Input
          type={input.type}
          label={input.label}
          placeholder={input.placeholder}
          w="300px"
          h="48px"
          key={index}
          {...register(input.name, { ...validation[input.name] })}
          errorMessage={errors[input.name]?.message}
        />
      ))}
    </Space>
  )
}
