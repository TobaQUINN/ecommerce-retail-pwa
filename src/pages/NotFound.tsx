import { Link } from 'react-router-dom'
import { Container, Button } from '@/components/ui'

function NotFound() {
  return (
    <Container className="py-16">
      <div className="text-center">
        <p className="text-6xl font-bold text-gray-200 mb-4">404</p>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Page not found
        </h1>
        <p className="text-gray-600 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </Container>
  )
}

export const Component = NotFound
