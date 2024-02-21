import ErrorPage from '@pages/ErrorPage'
import { Component, ErrorInfo, ReactNode } from 'react'

type ErrorProps = {
  children?: ReactNode
}

type ErrorState = {
  hasError: boolean
  errorMessage?: string
}

class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorState {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    this.setState(prev => {
      return {
        ...prev,
        errorMessage: error.message,
      }
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          type="errorBoundary"
          errorMessage={this.state?.errorMessage}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
