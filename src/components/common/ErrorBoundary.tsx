import { Component, type ReactNode, type ErrorInfo } from 'react'
import { Button, Container } from '@/components/ui'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <Container className="py-16">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We&apos;re sorry for the inconvenience. Please try refreshing the page.
            </p>
            <Button
              onClick={() => {
                this.setState({ hasError: false })
                window.location.reload()
              }}
            >
              Refresh Page
            </Button>
          </div>
        </Container>
      )
    }

    return this.props.children
  }
}
