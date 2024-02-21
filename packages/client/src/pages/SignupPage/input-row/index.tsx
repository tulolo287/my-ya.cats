import { Input } from '@components/input'
import { Space } from '@components/space'
import { InputTypes } from '@core/types'
import { FC } from 'react'

type InputProps = {
  type: InputTypes
  label: string
  name: string
  placeholder: string
}

type InputRowProps = {
  row: InputProps[]
}

export const InputRow: FC<InputRowProps> = ({ row }) => {
  return (
    <Space gap="48px" direction="row">
      {row.map((input, index) => (
        <Input
          type={input.type}
          label={input.label}
          name={input.name}
          placeholder={input.placeholder}
          w="300px"
          h="48px"
          key={index}
        />
      ))}
    </Space>
  )
}
