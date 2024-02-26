import { Background } from '@components/background'
import { Button } from '@components/button'
import { Center } from '@components/center'
import { Paper } from '@components/paper'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import { routerPaths } from '@core/constants'
import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './styles.module.css'
import { InputProps, InputRow } from './input-row'
import { AuthSignupData, InputTypes } from '@core/types'
import AuthController from '@controllers/auth-controller'
import { SubmitHandler, useForm } from 'react-hook-form'

const Inputs: Array<InputProps[]> = [
  [
    {
      type: InputTypes.text,
      label: 'Name',
      name: 'first_name',
      placeholder: 'Name',
    },
    {
      type: InputTypes.tel,
      label: 'Phone',
      name: 'phone',
      placeholder: '+0(000)00-00-00',
    },
  ],
  [
    {
      type: InputTypes.text,
      label: 'Second Name',
      name: 'second_name',
      placeholder: 'Second Name',
    },
    {
      type: InputTypes.text,
      label: 'Login',
      name: 'login',
      placeholder: 'Login',
    },
  ],
  [
    {
      type: InputTypes.email,
      label: 'Email',
      name: 'email',
      placeholder: 'Email',
    },
    {
      type: InputTypes.password,
      label: 'Password',
      name: 'password',
      placeholder: 'Password',
    },
  ],
]

const SignupPage: FC = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSignupData>()

  const onSubmit: SubmitHandler<AuthSignupData> = async data => {
    try {
      await AuthController.signup(data)
      setError('')
      navigate(routerPaths.login)
    } catch (error) {
      setError(error as string)
    }
  }

  return (
    <Background>
      <Center>
        <Paper>
          <Space gap="62px" align="center">
            <Typography
              align="center"
              tag="h2"
              fontSize="xxxl"
              color="grey-with-shadow">
              SIGNUP
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Space gap="62px" align="center">
                <Space gap="20px">
                  {Inputs.map((inputRow, index) => (
                    <InputRow
                      row={inputRow}
                      form={{ register, errors }}
                      key={index}
                    />
                  ))}
                </Space>
                <Space>
                  {error && <Typography align="center">{error}</Typography>}
                  <Button color="orange" w="300px">
                    SIGN UP
                  </Button>
                </Space>
              </Space>
            </form>
            <Typography align="center" color="grey" fontSize="m">
              <Link to={routerPaths.login} className={styles.link}>
                Log in
              </Link>
            </Typography>
          </Space>
        </Paper>
      </Center>
    </Background>
  )
}

export default SignupPage
