import { Provider } from 'react-redux'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import { routes } from '../../routes'
import { routerPaths } from '@core/constants'
import store from '@store/index'

describe('Login Page', () => {
  let loginInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let submitButton: HTMLButtonElement

  const router = createMemoryRouter(routes, {
    initialEntries: [routerPaths.login],
  })

  const wrapper = (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )

  test('Должен верно отрисоваться', () => {
    const { container } = render(wrapper)

    expect(container).toMatchSnapshot()
  })

  describe('Проверка функциональности', () => {
    beforeEach(() => {
      render(wrapper)

      loginInput = screen.getByLabelText('Login')
      passwordInput = screen.getByLabelText('Password')
      submitButton = screen.getByText('LOG IN')
    })

    test('Должны быть показаны ошибки при пустых полях', async () => {
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Login is required')).toBeDefined()
        expect(screen.getByText('Password is required')).toBeDefined()
      })
    })

    test('Должны быть показаны ошибки при неправильно заполненных полях', async () => {
      fireEvent.change(loginInput, { target: { value: 'aa' } })
      fireEvent.change(passwordInput, { target: { value: 'qwerty12' } })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Incorrect login')).toBeDefined()
        expect(screen.getByText('Incorrect password')).toBeDefined()
      })
    })
  })
})
