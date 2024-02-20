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
    console.log('getDerivedStateFromError')
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('componentDidCatch')
    this.setState(prev => {
      return {
        ...prev,
        errorMessage: error.message,
      }
    })
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <p>{this.state.errorMessage}</p>
    }

    return this.props.children
  }
}

export default ErrorBoundary
